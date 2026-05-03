import 'server-only';

import { getSupabaseAdmin } from '@/lib/supabase/server';

export interface ProfileSummary {
  savedProjects: number;
  chatHistory: number;
  downloadedDocuments: number;
  notifications: number;
  unreadNotifications: number;
  recentNotifications: Array<{
    id: string;
    title: string;
    body: string | null;
    isRead: boolean;
    createdAt: string;
  }>;
}

export async function getProfileSummary(telegramId: string): Promise<ProfileSummary> {
  const supabase = getSupabaseAdmin();

  const [
    savedProjects,
    chatHistory,
    downloadedDocuments,
    notifications,
    unreadNotifications,
    recentNotifications,
  ] = await Promise.all([
    countRows('saved_projects', telegramId),
    countRows('chat_messages', telegramId),
    countRows('document_downloads', telegramId),
    countRows('notifications', telegramId),
    countUnreadNotifications(telegramId),
    supabase
      .from('notifications')
      .select('id, title, body, is_read, created_at')
      .eq('telegram_id', telegramId)
      .order('created_at', { ascending: false })
      .limit(5),
  ]);

  if (recentNotifications.error) {
    throw new Error(recentNotifications.error.message);
  }

  return {
    savedProjects,
    chatHistory,
    downloadedDocuments,
    notifications,
    unreadNotifications,
    recentNotifications: (recentNotifications.data ?? []).map((item) => ({
      id: item.id,
      title: item.title,
      body: item.body,
      isRead: item.is_read,
      createdAt: item.created_at,
    })),
  };
}

async function countRows(
  table: 'saved_projects' | 'chat_messages' | 'document_downloads' | 'notifications',
  telegramId: string
) {
  const supabase = getSupabaseAdmin();
  const query = supabase
    .from(table)
    .select('*', { count: 'exact', head: true })
    .eq('telegram_id', telegramId);

  const { count, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return count ?? 0;
}

async function countUnreadNotifications(telegramId: string) {
  const supabase = getSupabaseAdmin();
  const { count, error } = await supabase
    .from('notifications')
    .select('*', { count: 'exact', head: true })
    .eq('telegram_id', telegramId)
    .eq('is_read', false);

  if (error) {
    throw new Error(error.message);
  }

  return count ?? 0;
}
