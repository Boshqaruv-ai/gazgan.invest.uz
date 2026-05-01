import 'server-only';

import type { TelegramUser } from '@/lib/telegram-types';
import { getSupabaseAdmin } from '@/lib/supabase/server';
import {
  type NormalizedTelegramUser,
  normalizeTelegramUser,
  userFromInitData,
  verifyTelegramInitData,
} from '@/lib/telegram-auth';

interface ResolveIdentityInput {
  initData?: unknown;
  user?: unknown;
}

export class TelegramIdentityError extends Error {
  constructor(
    message: string,
    public readonly status = 401
  ) {
    super(message);
  }
}

export async function resolveTelegramIdentity(input: ResolveIdentityInput) {
  const initData = typeof input.initData === 'string' ? input.initData : '';
  const botToken = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const isProduction = process.env.NODE_ENV === 'production';

  if (botToken && initData) {
    if (!verifyTelegramInitData(initData, botToken)) {
      throw new TelegramIdentityError('Telegram initData verification failed.');
    }

    const verifiedUser = userFromInitData(initData);
    const normalized = verifiedUser ? normalizeTelegramUser(verifiedUser) : null;
    if (!normalized) {
      throw new TelegramIdentityError('Telegram user is missing from verified initData.');
    }

    return normalized;
  }

  if (isProduction) {
    throw new TelegramIdentityError('Valid Telegram initData is required in production.', 401);
  }

  const devUser = coerceTelegramUser(input.user);
  const normalized = devUser ? normalizeTelegramUser(devUser) : null;
  if (!normalized) {
    throw new TelegramIdentityError('Telegram user is required.', 422);
  }

  return normalized;
}

export async function upsertTelegramUser(user: NormalizedTelegramUser) {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from('users')
    .upsert(
      {
        telegram_id: user.telegram_id,
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        language_code: user.language_code,
        photo_url: user.photo_url,
        last_seen_at: new Date().toISOString(),
      },
      { onConflict: 'telegram_id' }
    )
    .select('telegram_id, first_name, username')
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

function coerceTelegramUser(value: unknown): TelegramUser | null {
  if (!value || typeof value !== 'object') return null;
  const source = value as Record<string, unknown>;
  const id = typeof source.id === 'number' || typeof source.id === 'string' ? Number(source.id) : undefined;
  if (!id || Number.isNaN(id)) return null;

  return {
    id,
    first_name: stringValue(source.first_name),
    last_name: stringValue(source.last_name),
    username: stringValue(source.username),
    language_code: stringValue(source.language_code),
    photo_url: stringValue(source.photo_url),
  };
}

function stringValue(value: unknown) {
  return typeof value === 'string' ? value : undefined;
}
