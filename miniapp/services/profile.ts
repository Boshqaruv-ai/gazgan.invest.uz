import type { AppTelegramUser } from '@/components/layout/TelegramUserProvider';
import { getTelegramInitData, getTelegramUser } from '@/lib/telegram';

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

export async function fetchProfileSummary(): Promise<{ user: AppTelegramUser; summary: ProfileSummary }> {
  const response = await fetch('/api/profile/summary', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      initData: getTelegramInitData(),
      user: getTelegramUser(),
    }),
  });
  const payload = await response.json() as { user?: AppTelegramUser; summary?: ProfileSummary; error?: string };

  if (!response.ok || !payload.user || !payload.summary) {
    throw new Error(payload.error || 'Profil maʼlumotlari yuklanmadi.');
  }

  return {
    user: payload.user,
    summary: payload.summary,
  };
}

export async function toggleSavedProject(projectId: string) {
  const response = await fetch('/api/saved-projects', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      initData: getTelegramInitData(),
      user: getTelegramUser(),
      projectId,
      action: 'toggle',
    }),
  });
  const payload = await response.json() as { savedProjectIds?: string[]; error?: string };

  if (!response.ok || !payload.savedProjectIds) {
    throw new Error(payload.error || 'Saqlangan loyiha yangilanmadi.');
  }

  return payload.savedProjectIds;
}
