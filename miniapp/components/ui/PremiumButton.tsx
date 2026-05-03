import Link from 'next/link';
import { ArrowRight, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'outline' | 'danger' | 'ghost';

interface PremiumButtonProps {
  children: React.ReactNode;
  href?: string;
  type?: 'button' | 'submit';
  icon?: LucideIcon;
  trailingIcon?: LucideIcon | false;
  variant?: ButtonVariant;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export function PremiumButton({
  children,
  href,
  type = 'button',
  icon: Icon,
  trailingIcon,
  variant = 'primary',
  className,
  disabled,
  onClick,
}: PremiumButtonProps) {
  const TrailingIcon = trailingIcon || null;
  const content = (
    <>
      {Icon ? <Icon className="h-[18px] w-[18px] shrink-0" /> : null}
      <span className="min-w-0 truncate">{children}</span>
      {trailingIcon === false ? null : TrailingIcon ? (
        <TrailingIcon className="h-[18px] w-[18px] shrink-0" />
      ) : variant === 'primary' ? (
        <ArrowRight className="h-[18px] w-[18px] shrink-0" />
      ) : null}
    </>
  );

  const classes = cn(
    'inline-flex h-[48px] min-h-[48px] w-full items-center justify-center gap-2 rounded-[13px] px-4 text-[14px] font-bold leading-none transition duration-300 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60',
    variant === 'primary' && 'gold-surface text-[#0B0F1A] shadow-gold',
    variant === 'outline' && 'border border-gold/70 bg-transparent text-white shadow-[inset_0_0_0_1px_rgba(201,168,76,0.18)]',
    variant === 'danger' && 'border border-red-500/25 bg-red-500/16 text-red-300',
    variant === 'ghost' && 'border border-white/10 bg-white/[0.04] text-white',
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {content}
    </button>
  );
}
