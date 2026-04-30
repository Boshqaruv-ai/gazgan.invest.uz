'use client';

import * as React from 'react';
import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

interface StatCardProps {
  value: number;
  suffix?: string;
  label: string;
  eyebrow?: string;
  className?: string;
}

export function StatCard({ value, suffix = '', label, eyebrow, className }: StatCardProps) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => `${Math.round(latest).toLocaleString('uz-UZ')}${suffix}`);

  React.useEffect(() => {
    const controls = animate(count, value, { duration: 1.4, ease: 'easeOut' });
    return () => controls.stop();
  }, [count, value]);

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      className={cn('glass-card rounded-2xl p-5 sm:p-6', className)}
    >
      {eyebrow && <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-accent/80">{eyebrow}</div>}
      <motion.div className="text-3xl font-bold tracking-tight text-copy sm:text-4xl">{rounded}</motion.div>
      <div className="mt-2 text-sm text-muted">{label}</div>
    </motion.div>
  );
}
