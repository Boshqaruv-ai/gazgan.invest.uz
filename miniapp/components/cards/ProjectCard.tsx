import Image from 'next/image';
import { MapPin } from 'lucide-react';
import { FundingProgress } from '@/components/projects/FundingProgress';
import { ProjectStatusBadge, ProjectTypeBadge } from '@/components/projects/ProjectStatusBadge';
import { PremiumButton } from '@/components/ui/PremiumButton';
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
    <article
      className={cn(
        'block overflow-hidden rounded-[20px] border border-white/10 bg-card shadow-premium',
        variant === 'rail' ? 'w-[280px] shrink-0 snap-start' : 'w-full'
      )}
    >
      <div className="relative h-[135px] overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          priority={priority}
          sizes="280px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1A]/88 via-[#0B0F1A]/18 to-transparent" />
        <ProjectStatusBadge status={project.status} className="absolute left-3 top-3" />
        <div className="absolute right-3 top-3">
          <ProjectTypeBadge type={project.projectType} />
        </div>
      </div>
      <div className="p-4 pt-3">
        <h3 className="line-clamp-2 text-[16px] font-extrabold leading-[1.35] text-copy">
          {project.title}
        </h3>
        <div className="mt-2 flex items-center gap-1.5 text-[12px] text-muted">
          <MapPin className="h-3.5 w-3.5 text-gold" />
          <span className="min-w-0 truncate">{project.location}</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="rounded-full bg-white/[0.06] px-2.5 py-1 text-[11px] font-medium text-white/80">{project.category}</span>
          <span className="rounded-full bg-white/[0.06] px-2.5 py-1 text-[11px] font-medium text-white/80">
            {project.projectType === 'processing' ? 'Zavod' : 'Kon'}
          </span>
        </div>
        <div className="mt-4 grid grid-cols-4 gap-2">
          <Metric label="ROI" value={`${project.expectedReturn}%`} />
          <Metric label="Investitsiya" value={formatCurrencyCompact(project.investmentRequired)} />
          <Metric label="Payback" value={`${project.paybackYears} yil`} />
          <Metric label="Mablag'" value={`${project.fundingPercentage}%`} />
        </div>
        <FundingProgress percentage={project.fundingPercentage} spotsLeft={project.spotsLeft} className="mt-3" />
        <PremiumButton href={`/projects/${project.id}`} className="mt-4 h-[44px] min-h-[44px]" trailingIcon={false}>
          Batafsil ko&apos;rish
        </PremiumButton>
      </div>
    </article>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="truncate text-[11px] leading-none text-muted">{label}</p>
      <p className="mt-1.5 truncate text-[15px] font-extrabold leading-none text-copy">{value}</p>
    </div>
  );
}
