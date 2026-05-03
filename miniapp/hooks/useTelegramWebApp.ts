'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { getTelegramWebApp, initializeTelegramApp, triggerTelegramHaptic } from '@/lib/telegram';

export function useTelegramWebApp() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    initializeTelegramApp();

    const webApp = getTelegramWebApp();
    const backButton = webApp?.BackButton;

    if (!backButton) return;

    function goBack() {
      triggerTelegramHaptic('light');
      router.back();
    }

    if (pathname === '/') {
      backButton.hide();
    } else {
      backButton.show();
      backButton.onClick(goBack);
    }

    return () => {
      backButton.offClick(goBack);
    };
  }, [pathname, router]);
}
