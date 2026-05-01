'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { getTelegramInitData, getTelegramUser } from '@/lib/telegram';

export interface AppTelegramUser {
  telegram_id: string;
  first_name: string | null;
  username: string | null;
}

interface TelegramUserContextValue {
  user: AppTelegramUser | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

const TelegramUserContext = createContext<TelegramUserContextValue | null>(null);

export function TelegramUserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AppTelegramUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const syncTelegramUser = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/telegram/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          initData: getTelegramInitData(),
          user: getTelegramUser(),
        }),
      });
      const payload = await response.json() as { user?: AppTelegramUser; error?: string };

      if (!response.ok || !payload.user) {
        throw new Error(payload.error || 'Telegram user sync failed.');
      }

      setUser(payload.user);
    } catch (syncError) {
      setError(syncError instanceof Error ? syncError.message : 'Telegram user sync failed.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void syncTelegramUser();
    }, 450);

    return () => window.clearTimeout(timer);
  }, [syncTelegramUser]);

  const value = useMemo<TelegramUserContextValue>(() => ({
    user,
    loading,
    error,
    refresh: syncTelegramUser,
  }), [user, loading, error, syncTelegramUser]);

  return (
    <TelegramUserContext.Provider value={value}>
      {children}
    </TelegramUserContext.Provider>
  );
}

export function useAppTelegramUser() {
  const context = useContext(TelegramUserContext);
  if (!context) {
    throw new Error('useAppTelegramUser must be used inside TelegramUserProvider.');
  }

  return context;
}
