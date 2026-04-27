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
            'bg-gradient-to-br from-accent to-[#b8943f] text-dark hover:from-accentLight hover:to-accent hover:-translate-y-0.5 hover:shadow-lg': variant === 'primary',
            'border-2 border-accent text-accent hover:bg-accent hover:text-dark': variant === 'outline',
            'text-gray-300 hover:text-accent': variant === 'ghost',
          },
          {
            'px-4 py-2 text-sm rounded-lg': size === 'sm',
            'px-8 py-3 rounded-lg': size === 'md',
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