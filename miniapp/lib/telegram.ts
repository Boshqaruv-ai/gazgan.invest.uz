'use client';

import { useEffect, useState } from 'react';
import type { TelegramUser } from '@/lib/telegram-types';

interface TelegramWebApp {
  initData?: string;
  initDataUnsafe?: {
    user?: TelegramUser;
  };
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

export function initializeTelegramApp() {
  const webApp = getTelegramWebApp();
  if (!webApp) return false;

  webApp.ready?.();
  webApp.expand?.();
  webApp.disableVerticalSwipes?.();

  document.documentElement.style.overscrollBehavior = 'none';
  document.body.style.overscrollBehavior = 'none';
  document.body.style.backgroundColor = '#0B0F1A';
  document.documentElement.style.backgroundColor = '#0B0F1A';

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
