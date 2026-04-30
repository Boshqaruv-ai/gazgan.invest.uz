import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "G'ozg'on Investitsion Portali",
  description: "O'zbekistonning marmar va granit konlariga investitsiya qilish imkoniyati",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#c9a84c" />
      </head>
      <body className={`${inter.className}`}>
        <div className="bg-[#0f0f1a]">
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}