'use client';

import { useEffect } from 'react';
import { initializeTelegramApp } from '@/lib/telegram';

export function TelegramInitializer() {
  useEffect(() => {
    initializeTelegramApp();
    const retry = window.setTimeout(() => initializeTelegramApp(), 350);

    const handleTouchMove = (e: TouchEvent) => {
      const scrollContainer = document.querySelector('.telegram-scroll-container') as HTMLElement | null;
      if (!scrollContainer) return;

      const atTop = scrollContainer.scrollTop === 0;
      const scrollingDown = e.touches[0].clientY > 0;

      if (atTop && scrollingDown) {
        e.preventDefault();
      }
    };

    document.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.clearTimeout(retry);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return null;
}