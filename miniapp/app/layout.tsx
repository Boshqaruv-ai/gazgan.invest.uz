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
          <div className="telegram-app">
            <div className="telegram-scroll-container">
              {children}
            </div>
            <BottomNav />
          </div>
        </TelegramUserProvider>
      </body>
    </html>
  );
}