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
    <nav className="fixed bottom-0 left-0 z-50 w-full border-t border-white/10 bg-[#0B0F1A]/96 pb-[max(9px,env(safe-area-inset-bottom,0px))] pt-2 backdrop-blur-xl" style={{ paddingBottom: 'max(12px, env(safe-area-inset-bottom))' }}>
      <div className="grid grid-cols-5 gap-1 px-2">
        {navItems.map((item) => {
          const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex h-[56px] flex-col items-center justify-center gap-1 rounded-[14px] text-[10px] font-semibold leading-tight transition-all duration-300 active:scale-95',
                active 
                  ? 'text-gold' 
                  : 'text-muted hover:bg-white/[0.04] hover:text-copy'
              )}
              aria-current={active ? 'page' : undefined}
            >
              <span className={cn('grid h-[24px] w-[24px] place-items-center rounded-[8px]', active && 'bg-gold text-[#0B0F1A] shadow-gold')}>
                <item.icon className="h-[18px] w-[18px]" />
              </span>
              <span className="mt-0.5">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
