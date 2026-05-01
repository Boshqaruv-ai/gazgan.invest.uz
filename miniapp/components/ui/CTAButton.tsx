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
        'inline-flex h-12 min-w-0 items-center justify-center gap-2 rounded-2xl px-4 text-sm font-extrabold transition active:scale-95',
        variant === 'primary'
          ? 'gold-surface text-ink shadow-gold'
          : 'border border-gold/25 bg-gold/10 text-gold hover:bg-gold/15',
        className
      )}
    >
      {Icon ? <Icon className="h-5 w-5" /> : null}
      <span className="min-w-0 truncate">{children}</span>
      {variant === 'primary' ? <ArrowRight className="h-4 w-4 shrink-0" /> : null}
    </Link>
  );
}
