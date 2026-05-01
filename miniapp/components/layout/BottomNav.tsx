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
    <nav className="fixed bottom-0 left-1/2 z-50 w-full max-w-[390px] -translate-x-1/2 border-t border-white/10 bg-ink/95 pb-[calc(12px+env(safe-area-inset-bottom,0px))] pt-3 backdrop-blur-xl">
      <div className="grid grid-cols-5 gap-1 px-2">
        {navItems.map((item) => {
          const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex h-[54px] flex-col items-center justify-center gap-0.5 rounded-[14px] text-[11px] font-semibold leading-tight transition-all active:scale-95',
                active 
                  ? 'bg-gold text-ink shadow-gold' 
                  : 'text-muted hover:bg-white/[0.06] hover:text-copy'
              )}
              aria-current={active ? 'page' : undefined}
            >
              <item.icon className="h-[22px] w-[22px]" />
              <span className="mt-0.5">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}