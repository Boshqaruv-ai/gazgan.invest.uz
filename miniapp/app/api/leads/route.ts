import { NextResponse } from 'next/server';
import { GENERAL_PROJECT_ID } from '@/lib/projects';
import { getSupabaseAdmin } from '@/lib/supabase/server';
import { resolveTelegramIdentity, TelegramIdentityError, upsertTelegramUser } from '@/lib/server/telegram-identity';
import { projectExistsInDb } from '@/lib/server/projects';

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 });
  }

  const payload = body && typeof body === 'object' ? body as Record<string, unknown> : {};
  const projectId = clean(payload.project_id, 120);
  const requestedTelegramId = clean(payload.telegram_id, 80);
  const message = clean(payload.message, 700);

  if (!projectId) {
    return NextResponse.json({ error: 'Unknown project_id.' }, { status: 422 });
  }

  try {
    if (projectId !== GENERAL_PROJECT_ID && !await projectExistsInDb(projectId)) {
      return NextResponse.json({ error: 'Unknown project_id.' }, { status: 422 });
    }

    const identity = await resolveTelegramIdentity({
      initData: payload.initData,
      user: payload.user,
    });

    if (requestedTelegramId && requestedTelegramId !== identity.telegram_id) {
      return NextResponse.json({ error: 'Telegram identity mismatch.' }, { status: 403 });
    }

    await upsertTelegramUser(identity);

    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from('leads')
      .insert({
        telegram_id: identity.telegram_id,
        project_id: projectId,
        message: message || null,
      })
      .select('id, telegram_id, project_id, created_at')
      .single();

    if (error) {
      throw new Error(error.message);
    }

    await triggerMockTelegramBotWebhook(data);

    return NextResponse.json({ lead: data });
  } catch (error) {
    if (error instanceof TelegramIdentityError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    const messageText = error instanceof Error ? error.message : 'Lead could not be saved.';
    return NextResponse.json({ error: messageText }, { status: 500 });
  }
}

function clean(value: unknown, maxLength: number) {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, maxLength);
}

async function triggerMockTelegramBotWebhook(lead: {
  id: string;
  telegram_id: string;
  project_id: string;
  created_at: string;
}) {
  console.info('Mock Telegram bot webhook', lead);
}
