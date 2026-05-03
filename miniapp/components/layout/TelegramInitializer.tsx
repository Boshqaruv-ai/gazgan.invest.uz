'use client';

import { useEffect } from 'react';
import { getTelegramWebApp, initializeTelegramApp, syncTelegramViewport } from '@/lib/telegram';

export function TelegramInitializer() {
  useEffect(() => {
    let webApp = getTelegramWebApp();
    const syncViewport = () => syncTelegramViewport();

    function bindViewportEvents() {
      const nextWebApp = getTelegramWebApp();
      if (!nextWebApp || nextWebApp === webApp) return;

      webApp?.offEvent?.('viewportChanged', syncViewport);
      webApp = nextWebApp;
      webApp.onEvent?.('viewportChanged', syncViewport);
    }

    initializeTelegramApp();
    webApp?.onEvent?.('viewportChanged', syncViewport);

    const retry = window.setTimeout(() => {
      initializeTelegramApp();
      bindViewportEvents();
      syncViewport();
    }, 350);

    window.addEventListener('resize', syncViewport);
    window.addEventListener('orientationchange', syncViewport);

    return () => {
      window.clearTimeout(retry);
      webApp?.offEvent?.('viewportChanged', syncViewport);
      window.removeEventListener('resize', syncViewport);
      window.removeEventListener('orientationchange', syncViewport);
    };
  }, []);

  return null;
}
