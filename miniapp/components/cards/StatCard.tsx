import { type LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string;
  detail: string;
  icon: LucideIcon;
}

export function StatCard({ label, value, detail, icon: Icon }: StatCardProps) {
  return (
    <article className="rounded-[16px] border border-white/10 bg-card p-4">
      <div className="mb-3 flex h-[40px] w-[40px] items-center justify-center rounded-[12px] bg-gold/10 text-gold">
        <Icon className="h-[18px] w-[18px]" />
      </div>
      <p className="text-[12px] font-medium leading-[1.4] text-muted">{label}</p>
      <p className="mt-1 text-[20px] font-bold leading-[1.35] tracking-tight text-copy">{value}</p>
      <p className="mt-1 text-[11px] leading-[1.4] text-muted">{detail}</p>
    </article>
  );
}