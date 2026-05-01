import Image from 'next/image';
import Link from 'next/link';
import { Clock3, TrendingUp } from 'lucide-react';
import type { Project } from '@/lib/projects';
import { cn } from '@/lib/utils';
import { formatCurrencyCompact } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
  variant?: 'rail' | 'list';
}

export function ProjectCard({ project, priority = false, variant = 'rail' }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.id}`}
      className={cn(
        'block overflow-hidden rounded-[20px] border border-white/10 bg-card shadow-premium',
        variant === 'rail' ? 'w-[280px] shrink-0 snap-start' : 'w-full'
      )}
    >
      <div className="relative h-[140px] overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          priority={priority}
          sizes="280px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/82 via-ink/10 to-transparent" />
        {project.highlight ? (
          <div className="absolute left-3 top-3 rounded-full bg-emerald-400 px-3 py-1 text-[11px] font-bold text-ink">
            High return
          </div>
        ) : null}
      </div>
      <div className="p-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-semibold text-muted">
            {project.category}
          </span>
          <span className="text-[14px] font-bold text-gold">{project.roi}% ROI</span>
        </div>
        <h3 className="line-clamp-2 min-h-[48px] text-[17px] font-semibold leading-[1.45] text-copy">
          {project.title}
        </h3>
        <p className="mt-2 line-clamp-2 min-h-[40px] text-[13px] leading-[1.5] text-muted">{project.description}</p>
        <div className="mt-4 grid grid-cols-2 gap-2.5">
          <div className="rounded-[12px] bg-white/[0.04] p-3">
            <div className="flex items-center gap-1.5 text-[11px] text-muted">
              <TrendingUp className="h-3.5 w-3.5" />
              Kapital
            </div>
            <p className="mt-1 text-[14px] font-bold text-copy">{formatCurrencyCompact(project.amount)}</p>
          </div>
          <div className="rounded-[12px] bg-white/[0.04] p-3">
            <div className="flex items-center gap-1.5 text-[11px] text-muted">
              <Clock3 className="h-3.5 w-3.5" />
              Payback
            </div>
            <p className="mt-1 text-[14px] font-bold text-copy">{project.payback} yil</p>
          </div>
        </div>
      </div>
    </Link>
  );
}