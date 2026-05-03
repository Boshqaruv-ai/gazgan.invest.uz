import { NextResponse } from 'next/server';
import { getProfileSummary } from '@/lib/server/profile';
import { resolveTelegramIdentity, TelegramIdentityError, upsertTelegramUser } from '@/lib/server/telegram-identity';

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 });
  }

  try {
    const payload = body && typeof body === 'object' ? body as Record<string, unknown> : {};
    const identity = await resolveTelegramIdentity({
      initData: payload.initData,
      user: payload.user,
    });

    const user = await upsertTelegramUser(identity);
    const summary = await getProfileSummary(identity.telegram_id);

    return NextResponse.json({ user, summary });
  } catch (error) {
    if (error instanceof TelegramIdentityError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    const message = error instanceof Error ? error.message : 'Profile summary could not be loaded.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
