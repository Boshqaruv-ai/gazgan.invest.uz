import Link from 'next/link';
import { ArrowRight, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CTAButtonProps {
  href: string;
  children: React.ReactNode;
  icon?: LucideIcon;
  variant?: 'primary' | 'outline';
  className?: string;
}

export function CTAButton({ href, children, icon: Icon, variant = 'primary', className }: CTAButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        'inline-flex h-[52px] min-h-[52px] w-full items-center justify-center gap-3 rounded-[14px] px-5 text-[16px] font-semibold leading-[1.4] tracking-tight transition-all active:scale-[0.97]',
        variant === 'primary'
          ? 'gold-surface text-ink shadow-[0_8px_32px_rgba(212,175,55,0.25)]'
          : 'border border-gold/30 bg-gold/8 text-gold hover:bg-gold/12 hover:border-gold/40 active:bg-gold/20',
        className
      )}
    >
      {Icon ? <Icon className="h-[20px] w-[20px] shrink-0" /> : null}
      <span className="min-w-0 truncate">{children}</span>
      {variant === 'primary' ? <ArrowRight className="h-[18px] w-[18px] shrink-0" /> : null}
    </Link>
  );
}