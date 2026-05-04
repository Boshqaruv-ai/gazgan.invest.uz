import { NextResponse } from 'next/server';
import { getAIResponse } from '@/lib/ai-chat';
import { getProjectsFromDb } from '@/lib/server/projects';
import { resolveTelegramIdentity, TelegramIdentityError, upsertTelegramUser } from '@/lib/server/telegram-identity';
import { getSupabaseAdmin } from '@/lib/supabase/server';

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 });
  }

  const payload = body && typeof body === 'object' ? body as Record<string, unknown> : {};
  const message = typeof payload.message === 'string' ? payload.message.trim().slice(0, 700) : '';

  if (!message) {
    return NextResponse.json({ error: 'Message is required.' }, { status: 422 });
  }

  try {
    const identity = await resolveTelegramIdentity({
      initData: payload.initData,
      user: payload.user,
    });

    await upsertTelegramUser(identity);

    const supabase = getSupabaseAdmin();

    const { data: historyData } = await supabase
      .from('chat_messages')
      .select('role, message')
      .eq('telegram_id', identity.telegram_id)
      .order('created_at', { ascending: true })
      .limit(20);

    const history = (historyData || [])
      .filter((m) => m.role === 'user' || m.role === 'assistant')
      .map((m) => ({
        role: m.role as 'user' | 'assistant',
        content: m.message,
      }));

    const projects = await getProjectsFromDb();
    const answer = await getAIResponse(message, projects, history);

    const { error } = await supabase
      .from('chat_messages')
      .insert([
        {
          telegram_id: identity.telegram_id,
          role: 'user',
          message,
        },
        {
          telegram_id: identity.telegram_id,
          role: 'assistant',
          message: answer,
        },
      ]);

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({
      message: {
        role: 'assistant',
        text: answer,
      },
    });
  } catch (error) {
    if (error instanceof TelegramIdentityError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    const messageText = error instanceof Error ? error.message : 'Chat message could not be saved.';
    return NextResponse.json({ error: messageText }, { status: 500 });
  }
}