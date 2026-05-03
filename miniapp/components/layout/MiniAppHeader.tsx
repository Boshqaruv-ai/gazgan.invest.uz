'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ArrowLeft,
  Bell,
  Bot,
  Filter,
  Settings,
} from 'lucide-react';

type HeaderVariant = {
  title: string;
  subtitle?: string;
  backHref?: string;
  action?: 'bell' | 'filter' | 'settings' | 'bot';
};

export function MiniAppHeader() {
  const pathname = usePathname();
  const variant = getHeaderVariant(pathname);

  return (
    <header className="miniapp-header">
      <div className="miniapp-header-inner">
        {variant.backHref ? (
          <Link href={variant.backHref} className="topbar-icon" aria-label="Ortga">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        ) : (
          <LogoMark />
        )}

        <div className="min-w-0 flex-1">
          <p className="truncate text-[18px] font-black leading-tight tracking-tight text-copy">
            {variant.title}
          </p>
          {variant.subtitle ? (
            <p className="mt-0.5 truncate text-[10px] font-bold uppercase tracking-[0.12em] text-muted">
              {variant.subtitle}
            </p>
          ) : null}
        </div>

        <HeaderAction action={variant.action} />
      </div>
    </header>
  );
}

function getHeaderVariant(pathname: string): HeaderVariant {
  if (pathname === '/') {
    return {
      title: 'GAZGAN INVEST',
      subtitle: 'Investitsiya platformasi',
      action: 'bell',
    };
  }

  if (pathname.startsWith('/projects/')) {
    return {
      title: 'Loyiha batafsili',
      backHref: '/projects',
      action: 'bell',
    };
  }

  if (pathname.startsWith('/projects')) {
    return {
      title: 'Loyihalar',
      backHref: '/',
      action: 'filter',
    };
  }

  if (pathname.startsWith('/calculator')) {
    return {
      title: 'ROI Kalkulyator',
      backHref: '/',
    };
  }

  if (pathname.startsWith('/chat')) {
    return {
      title: 'AI Konsultant',
      backHref: '/',
      action: 'bot',
    };
  }

  if (pathname.startsWith('/profile')) {
    return {
      title: 'Profil',
      backHref: '/',
      action: 'settings',
    };
  }

  return {
    title: 'GAZGAN INVEST',
    subtitle: 'Investitsiya platformasi',
    action: 'bell',
  };
}

function LogoMark() {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <div className="grid h-[38px] w-[38px] shrink-0 place-items-center rounded-full bg-gold text-[#0B0F1A] shadow-gold">
        <span className="text-[25px] font-black leading-none">G</span>
      </div>
    </div>
  );
}

function HeaderAction({ action }: { action?: HeaderVariant['action'] }) {
  if (!action) {
    return <span className="h-[38px] w-[38px] shrink-0" />;
  }

  const Icon = action === 'filter'
    ? Filter
    : action === 'settings'
      ? Settings
      : action === 'bot'
        ? Bot
        : Bell;
  const label = action === 'filter'
    ? 'Filtr'
    : action === 'settings'
      ? 'Sozlamalar'
      : action === 'bot'
        ? 'AI yordamchi'
        : 'Bildirishnomalar';

  return (
    <button type="button" className="topbar-icon relative shrink-0" aria-label={label}>
      <Icon className="h-5 w-5" />
      {action === 'bell' ? (
        <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-gold" />
      ) : null}
    </button>
  );
}
