import { type LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string;
  detail: string;
  icon: LucideIcon;
}

export function StatCard({ label, value, detail, icon: Icon }: StatCardProps) {
  return (
    <article className="rounded-[22px] border border-white/10 bg-card p-4">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-gold/10 text-gold">
        <Icon className="h-5 w-5" />
      </div>
      <p className="text-xs font-medium text-muted">{label}</p>
      <p className="mt-1 text-xl font-extrabold tracking-tight text-copy">{value}</p>
      <p className="mt-1 text-xs text-muted">{detail}</p>
    </article>
  );
}
