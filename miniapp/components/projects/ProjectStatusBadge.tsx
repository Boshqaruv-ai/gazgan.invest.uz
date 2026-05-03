import type { ProjectStatus, ProjectType } from '@/lib/projects';
import { cn } from '@/lib/utils';

export function ProjectStatusBadge({ status, className }: { status: ProjectStatus; className?: string }) {
  if (status === 'ACTIVE') return null;

  return (
    <span
      className={cn(
        'inline-flex h-[27px] items-center rounded-full px-3 text-[11px] font-extrabold leading-none',
        status === 'HOT' && 'bg-gold text-[#0B0F1A]',
        status === 'NEW' && 'bg-[#F1C94F] text-[#0B0F1A]',
        status === 'FUNDED' && 'bg-emerald-500 text-white',
        className
      )}
    >
      {status}
    </span>
  );
}

export function ProjectTypeBadge({ type }: { type: ProjectType }) {
  const label = type === 'construction' ? 'Qurilish' : type === 'processing' ? 'Qayta ishlash' : 'Boshqalar';

  return (
    <span className="inline-flex h-[27px] items-center rounded-full bg-emerald-500/80 px-3 text-[11px] font-bold text-white">
      {label}
    </span>
  );
}
