'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, MessageCircle, X } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Bosh sahifa' },
  { href: '/quarries', label: 'Konlar' },
  { href: '/production', label: 'Ishlab chiqarish' },
  { href: '/products', label: 'Mahsulotlar' },
  { href: '/investment', label: 'Investitsiya' },
  { href: '/about#contact', label: 'Aloqa' },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-dark/80 backdrop-blur-xl">
      <div className="section-shell">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent text-lg font-black text-dark shadow-gold">
              G
            </div>
            <div>
              <span className="block text-lg font-bold tracking-tight text-copy">Gozgon Invest</span>
              <span className="-mt-0.5 block text-xs font-medium text-accent">Marble & Granite Platform</span>
            </div>
          </Link>

          <div className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => {
              const active = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href.split('#')[0]);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${active ? 'text-accent' : 'text-muted hover:text-copy'}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <Link href="/chat" className="hidden rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-semibold text-copy transition-colors hover:border-accent/45 hover:text-accent sm:inline-flex">
              <MessageCircle className="mr-2 h-4 w-4" />
              AI konsultant
            </Link>
            <Link href="/investment" className="hidden rounded-2xl bg-accent px-5 py-2.5 text-sm font-bold text-dark shadow-gold transition-transform hover:-translate-y-0.5 md:inline-flex">
              Loyihalarni ko‘rish
            </Link>
            <button
              className="rounded-xl border border-white/10 p-2 text-copy lg:hidden"
              onClick={() => setMobileMenuOpen((current) => !current)}
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-white/10 py-4 lg:hidden">
            <div className="grid gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-xl px-3 py-3 text-muted hover:bg-white/[0.04] hover:text-copy"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/chat"
                className="rounded-xl px-3 py-3 text-muted hover:bg-white/[0.04] hover:text-copy"
                onClick={() => setMobileMenuOpen(false)}
              >
                AI konsultant
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
