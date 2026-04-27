import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-gray-400 text-sm mb-2">{label}</label>
        )}
        <input
          ref={ref}
          className={cn(
            'w-full bg-white/5 border border-accent/30 rounded-lg px-4 py-3 text-white placeholder:text-white/40 transition-all duration-300 outline-none',
            'focus:border-accent focus:shadow-[0_0_0_3px_rgba(201,168,76,0.1)]',
            error && 'border-red-500',
            className
          )}
          {...props}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';