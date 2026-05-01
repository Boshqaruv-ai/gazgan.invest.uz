import 'server-only';

import { createHmac, timingSafeEqual } from 'crypto';
import type { TelegramUser } from '@/lib/telegram-types';

export interface NormalizedTelegramUser {
  telegram_id: string;
  first_name: string | null;
  last_name: string | null;
  username: string | null;
  language_code: string | null;
  photo_url: string | null;
}

export function normalizeTelegramUser(user: TelegramUser): NormalizedTelegramUser | null {
  if (!user.id) return null;

  return {
    telegram_id: String(user.id),
    first_name: cleanText(user.first_name, 120),
    last_name: cleanText(user.last_name, 120),
    username: cleanUsername(user.username),
    language_code: cleanText(user.language_code, 16),
    photo_url: cleanText(user.photo_url, 500),
  };
}

export function verifyTelegramInitData(initData: string, botToken: string) {
  const params = new URLSearchParams(initData);
  const hash = params.get('hash');

  if (!hash) return false;

  params.delete('hash');
  const dataCheckString = Array.from(params.entries())
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');

  const secretKey = createHmac('sha256', 'WebAppData').update(botToken).digest();
  const calculatedHash = createHmac('sha256', secretKey).update(dataCheckString).digest('hex');

  try {
    return timingSafeEqual(Buffer.from(calculatedHash, 'hex'), Buffer.from(hash, 'hex'));
  } catch {
    return false;
  }
}

export function userFromInitData(initData: string): TelegramUser | null {
  const rawUser = new URLSearchParams(initData).get('user');
  if (!rawUser) return null;

  try {
    const parsed = JSON.parse(rawUser) as TelegramUser;
    return parsed && typeof parsed === 'object' ? parsed : null;
  } catch {
    return null;
  }
}

function cleanText(value: string | undefined, maxLength: number) {
  if (!value) return null;
  const trimmed = value.trim().slice(0, maxLength);
  return trimmed || null;
}

function cleanUsername(value: string | undefined) {
  if (!value) return null;
  const trimmed = value.replace(/^@/, '').trim().slice(0, 80);
  return trimmed || null;
}
