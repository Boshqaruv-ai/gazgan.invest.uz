'use client';

import { useEffect } from 'react';
import { initializeTelegramApp } from '@/lib/telegram';

export function TelegramInitializer() {
  useEffect(() => {
    initializeTelegramApp();
    const retry = window.setTimeout(() => initializeTelegramApp(), 350);

    return () => {
      window.clearTimeout(retry);
    };
  }, []);

  return null;
}