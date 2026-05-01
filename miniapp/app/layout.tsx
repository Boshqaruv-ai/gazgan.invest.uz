import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { BottomNav } from '@/components/layout/BottomNav';
import { TelegramInitializer } from '@/components/layout/TelegramInitializer';
import { TelegramUserProvider } from '@/components/layout/TelegramUserProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'Gazgan Invest Mini App',
  description: 'Gazgan marmar va granit investitsiya loyihalari uchun Telegram Mini App.',
  applicationName: 'Gazgan Invest',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
  themeColor: '#0B0F1A',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz">
      <body>
        <Script src="https://telegram.org/js/telegram-web-app.js" strategy="afterInteractive" />
        <TelegramInitializer />
        <TelegramUserProvider>
          <div className="min-h-screen bg-[#05070D]">
            <div className="min-h-screen w-full max-w-[390px] overflow-hidden bg-ink text-copy shadow-premium sm:mx-auto">
              <div className="min-h-screen pb-[calc(96px+var(--safe-bottom))]">{children}</div>
            </div>
            <BottomNav />
          </div>
        </TelegramUserProvider>
      </body>
    </html>
  );
}
