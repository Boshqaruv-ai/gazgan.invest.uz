import { NextResponse } from 'next/server';
import { getProjectsFromDb, projectExistsInDb } from '@/lib/server/projects';
import { resolveTelegramIdentity, TelegramIdentityError, upsertTelegramUser } from '@/lib/server/telegram-identity';
import { getSupabaseAdmin } from '@/lib/supabase/server';

type SavedAction = 'save' | 'remove' | 'toggle';

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 });
  }

  const payload = body && typeof body === 'object' ? body as Record<string, unknown> : {};
  const projectId = typeof payload.projectId === 'string' ? payload.projectId.trim() : '';
  const action = toAction(payload.action);

  try {
    const identity = await resolveTelegramIdentity({
      initData: payload.initData,
      user: payload.user,
    });

    await upsertTelegramUser(identity);

    if (projectId) {
      if (!await projectExistsInDb(projectId)) {
        return NextResponse.json({ error: 'Unknown projectId.' }, { status: 422 });
      }

      await mutateSavedProject(identity.telegram_id, projectId, action);
    }

    const savedProjectIds = await getSavedProjectIds(identity.telegram_id);
    const projects = await getProjectsFromDb();

    return NextResponse.json({
      savedProjectIds,
      projects: projects.filter((project) => savedProjectIds.includes(project.id)),
    });
  } catch (error) {
    if (error instanceof TelegramIdentityError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    const message = error instanceof Error ? error.message : 'Saved projects could not be updated.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

function toAction(value: unknown): SavedAction {
  if (value === 'save' || value === 'remove' || value === 'toggle') return value;
  return 'toggle';
}

async function mutateSavedProject(telegramId: string, projectId: string, action: SavedAction) {
  const supabase = getSupabaseAdmin();

  if (action === 'toggle') {
    const { data, error } = await supabase
      .from('saved_projects')
      .select('project_id')
      .eq('telegram_id', telegramId)
      .eq('project_id', projectId)
      .maybeSingle();

    if (error) {
      throw new Error(error.message);
    }

    action = data ? 'remove' : 'save';
  }

  if (action === 'remove') {
    const { error } = await supabase
      .from('saved_projects')
      .delete()
      .eq('telegram_id', telegramId)
      .eq('project_id', projectId);

    if (error) {
      throw new Error(error.message);
    }

    return;
  }

  const { error } = await supabase
    .from('saved_projects')
    .upsert({ telegram_id: telegramId, project_id: projectId }, { onConflict: 'telegram_id,project_id' });

  if (error) {
    throw new Error(error.message);
  }
}

async function getSavedProjectIds(telegramId: string) {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from('saved_projects')
    .select('project_id')
    .eq('telegram_id', telegramId);

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map((item) => item.project_id);
}
