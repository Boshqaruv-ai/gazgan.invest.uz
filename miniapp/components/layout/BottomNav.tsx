'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Calculator, FolderKanban, Home, MessageCircle, UserRound } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/projects', label: 'Loyihalar', icon: FolderKanban },
  { href: '/calculator', label: 'ROI', icon: Calculator },
  { href: '/chat', label: 'Chat', icon: MessageCircle },
  { href: '/profile', label: 'Profil', icon: UserRound },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 z-50 w-full max-w-[390px] border-t border-white/10 bg-ink/92 px-3 pb-[calc(10px+var(--safe-bottom))] pt-2 backdrop-blur-xl sm:left-1/2 sm:-translate-x-1/2">
      <div className="grid grid-cols-5 gap-1">
        {navItems.map((item) => {
          const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex h-[58px] flex-col items-center justify-center gap-1 rounded-2xl text-[11px] font-semibold transition active:scale-95',
                active ? 'bg-gold text-ink shadow-gold' : 'text-muted hover:bg-white/[0.04] hover:text-copy'
              )}
              aria-current={active ? 'page' : undefined}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
