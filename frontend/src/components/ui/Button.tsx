import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-semibold transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
          {
            'bg-gradient-to-br from-accent to-[#d9a62c] text-dark shadow-gold hover:from-accentLight hover:to-accent hover:-translate-y-0.5': variant === 'primary',
            'border border-white/10 bg-white/[0.03] text-copy hover:border-accent/60 hover:bg-white/[0.06] hover:text-accent': variant === 'outline',
            'text-muted hover:text-accent hover:bg-white/[0.04]': variant === 'ghost',
          },
          {
            'px-4 py-2 text-sm rounded-xl': size === 'sm',
            'px-8 py-3 rounded-2xl': size === 'md',
            'px-10 py-4 text-lg rounded-xl': size === 'lg',
          },
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
