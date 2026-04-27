'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Bosh sahifa' },
  { href: '/quarries', label: 'Konlar' },
  { href: '/production', label: 'Ishlab chiqarish' },
  { href: '/products', label: 'Mahsulotlar' },
  { href: '/investment', label: 'Investitsiya' },
  { href: '/about', label: 'Biz haqimizda' },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-primary/95 backdrop-blur-lg border-b border-accent/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-3 cursor-pointer">
            <div className="w-10 h-10 gold-gradient rounded-lg flex items-center justify-center">
              <span className="text-primary font-bold text-lg">G'</span>
            </div>
            <div>
              <span className="text-white font-bold text-lg">G'ozg'on</span>
              <span className="text-accent text-xs block -mt-1">Invest Portal</span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link text-sm ${
                  pathname === link.href ? 'text-accent' : 'text-gray-300 hover:text-accent'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="relative p-2 text-gray-300 hover:text-accent transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="notification-badge">3</span>
            </Link>
            <Link href="/investment" className="hidden sm:block btn-primary text-sm py-2 px-6">
              Investitsiya qilish
            </Link>
            <button
              className="lg:hidden p-2 text-gray-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-primary/95 backdrop-blur-lg border-t border-accent/20">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-gray-300 hover:text-accent py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/dashboard"
              className="block text-gray-300 hover:text-accent py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Kabinet
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}