import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import './globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: 'Gozgon Marble & Granite Investment Projects Uzbekistan',
  description: 'Premium investment platform for Gozgon marble, granite quarries, production capacity, products, ROI scenarios and investor lead generation.',
  openGraph: {
    title: 'Gozgon Marble & Granite Investment Projects Uzbekistan',
    description: 'Explore quarry assets, production capacity, marble and granite products, and investor-ready ROI scenarios in Uzbekistan.',
    type: 'website',
    locale: 'uz_UZ',
    siteName: 'Gozgon Invest Platform',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gozgon Marble & Granite Investment Projects Uzbekistan',
    description: 'Investor-ready marble and granite platform for Uzbekistan.',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#F5C044',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz">
      <body className={inter.className}>
        <div className="min-h-screen bg-dark">
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
