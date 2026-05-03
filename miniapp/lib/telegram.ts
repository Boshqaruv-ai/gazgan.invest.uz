'use client';

import { useEffect, useState } from 'react';
import type { TelegramUser } from '@/lib/telegram-types';

interface TelegramWebApp {
  initData?: string;
  initDataUnsafe?: {
    user?: TelegramUser;
  };
  viewportHeight?: number;
  viewportStableHeight?: number;
  onEvent?: (eventType: string, eventHandler: () => void) => void;
  offEvent?: (eventType: string, eventHandler: () => void) => void;
  BackButton?: {
    show: () => void;
    hide: () => void;
    onClick: (callback: () => void) => void;
    offClick: (callback: () => void) => void;
  };
  HapticFeedback?: {
    impactOccurred: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => void;
  };
  ready?: () => void;
  expand?: () => void;
  close?: () => void;
  disableVerticalSwipes?: () => void;
  requestFullscreen?: () => void;
  setHeaderColor?: (color: string) => void;
  setBackgroundColor?: (color: string) => void;
  setBottomBarColor?: (color: string) => void;
  isVersionAtLeast?: (version: string) => boolean;
}

declare global {
  interface Window {
    Telegram?: {
      WebApp?: TelegramWebApp;
    };
  }
}

const fallbackUser: TelegramUser = {
  id: 10001,
  first_name: 'Investor',
  username: 'local_preview',
  language_code: 'uz',
};

export function getTelegramWebApp() {
  if (typeof window === 'undefined') return undefined;
  return window.Telegram?.WebApp;
}

export function getTelegramUser(): TelegramUser {
  return getTelegramWebApp()?.initDataUnsafe?.user ?? fallbackUser;
}

export function getTelegramInitData() {
  return getTelegramWebApp()?.initData ?? '';
}

export function syncTelegramViewport(webApp = getTelegramWebApp()) {
  if (typeof document === 'undefined') return;

  const viewportHeight = webApp?.viewportHeight && webApp.viewportHeight > 0
    ? `${webApp.viewportHeight}px`
    : '100dvh';
  const stableHeight = webApp?.viewportStableHeight && webApp.viewportStableHeight > 0
    ? `${webApp.viewportStableHeight}px`
    : viewportHeight;

  document.documentElement.style.setProperty('--tg-viewport-height', viewportHeight);
  document.documentElement.style.setProperty('--tg-stable-height', stableHeight);
  document.documentElement.style.setProperty('--tg-safe-top', 'max(env(safe-area-inset-top), 16px)');
}

export function initializeTelegramApp() {
  const webApp = getTelegramWebApp();
  syncTelegramViewport(webApp);

  document.documentElement.style.overscrollBehavior = 'none';
  document.body.style.overscrollBehavior = 'none';
  document.documentElement.style.overflow = 'hidden';
  document.body.style.overflow = 'hidden';
  document.body.style.backgroundColor = '#0B0F1A';
  document.documentElement.style.backgroundColor = '#0B0F1A';

  if (!webApp) return false;

  webApp.ready?.();
  webApp.expand?.();
  webApp.disableVerticalSwipes?.();
  syncTelegramViewport(webApp);

  const supportsColorControls = !webApp.isVersionAtLeast || webApp.isVersionAtLeast('6.1');
  if (supportsColorControls) {
    webApp.setHeaderColor?.('#0B0F1A');
    webApp.setBackgroundColor?.('#0B0F1A');
    webApp.setBottomBarColor?.('#0B0F1A');
  }

  const canRequestFullscreen = typeof webApp.requestFullscreen === 'function'
    && (!webApp.isVersionAtLeast || webApp.isVersionAtLeast('8.0'));

  if (canRequestFullscreen) {
    try {
      webApp.requestFullscreen?.();
    } catch {
      webApp.expand?.();
    }
  }

  return true;
}

export function closeTelegramApp() {
  getTelegramWebApp()?.close?.();
}

export function triggerTelegramHaptic(style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft' = 'light') {
  try {
    getTelegramWebApp()?.HapticFeedback?.impactOccurred(style);
  } catch {
    // Haptics are optional and unavailable in regular browser previews.
  }
}

export function useTelegramUser() {
  const [user, setUser] = useState<TelegramUser>(fallbackUser);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setUser(getTelegramUser());
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  return user;
}
