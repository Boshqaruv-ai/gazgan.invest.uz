'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, BriefcaseBusiness, CalendarDays, Clock3, FileText, ImageIcon, MapPin, Share2, ShieldCheck, Star, TrendingUp, Users, type LucideIcon } from 'lucide-react';
import { ChartCard } from '@/components/charts/ChartCard';
import { FundingProgress } from '@/components/projects/FundingProgress';
import { ProjectTypeBadge } from '@/components/projects/ProjectStatusBadge';
import { LeadModal } from '@/components/leads/LeadModal';
import { PremiumButton } from '@/components/ui/PremiumButton';
import { ErrorState, LoadingState } from '@/components/ui/ScreenState';
import { useTelegramWebApp } from '@/hooks/useTelegramWebApp';
import type { Project } from '@/lib/projects';
import { getTelegramWebApp, triggerTelegramHaptic } from '@/lib/telegram';
import { cn, formatCurrencyCompact } from '@/lib/utils';
import { fetchProject } from '@/services/projects';
import { toggleSavedProject } from '@/services/profile';

const detailTabs = ['Umumiy', 'Moliyaviy', 'Hujjatlar', 'Galereya', 'Jamoa'] as const;
type DetailTab = typeof detailTabs[number];

export function ProjectDetailScreen({ projectId }: { projectId: string }) {
  useTelegramWebApp();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState<DetailTab>('Umumiy');
  const [leadIntent, setLeadIntent] = useState<'invest' | 'contact' | null>(null);
  const [saved, setSaved] = useState(false);

  const loadProject = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      setProject(await fetchProject(projectId));
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Loyiha yuklanmadi.');
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadProject();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [loadProject]);

  const verifiedGovernmentDocument = useMemo(() => {
    if (!project || project.trustLevel !== 'verified_government') return null;
    return project.documents.find((document) => document.isVerified && (document.documentType === 'legal' || document.documentType === 'certificate')) ?? null;
  }, [project]);

  if (loading) {
    return (
      <main className="screen-shell">
        <LoadingState title="Loyiha yuklanmoqda..." />
      </main>
    );
  }

  if (error || !project) {
    return (
      <main className="screen-shell">
        <ErrorState message={error || 'Loyiha topilmadi.'} onRetry={() => void loadProject()} />
      </main>
    );
  }

  async function saveProject() {
    if (!project) return;
    triggerTelegramHaptic('light');
    setSaved((current) => !current);

    try {
      await toggleSavedProject(project.id);
    } catch {
      setSaved((current) => !current);
    }
  }

  async function shareProject() {
    if (!project) return;
    triggerTelegramHaptic('light');
    const url = `${window.location.origin}/projects/${project.id}`;

    if (navigator.share) {
      await navigator.share({ title: project.title, url }).catch(() => undefined);
      return;
    }

    await navigator.clipboard?.writeText(url).catch(() => undefined);
    getTelegramWebApp()?.HapticFeedback?.impactOccurred('light');
  }

  const images = project.images.length > 0 ? project.images : [project.image];

  return (
    <main className="screen-shell px-0 pb-[calc(154px+env(safe-area-inset-bottom,0px))] pt-0">
      <section className="relative h-[263px] overflow-hidden rounded-b-[22px]">
        <Image
          src={images[activeImage] ?? project.image}
          alt={project.title}
          fill
          priority
          sizes="390px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1A] via-[#0B0F1A]/20 to-[#0B0F1A]/20" />
        <div className="absolute left-5 right-5 top-[calc(14px+env(safe-area-inset-top,0px))] flex items-center justify-between">
          <Link href="/projects" className="topbar-icon bg-black/20" aria-label="Ortga">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex gap-2">
            <button type="button" onClick={saveProject} className="topbar-icon bg-black/20" aria-label="Saqlash">
              <Star className={cn('h-5 w-5', saved ? 'fill-gold text-gold' : 'text-white')} />
            </button>
            <button type="button" onClick={() => void shareProject()} className="topbar-icon bg-black/20" aria-label="Ulashish">
              <Share2 className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="absolute bottom-4 right-5 rounded-full bg-black/55 px-2.5 py-1 text-[12px] font-semibold text-white">
          {activeImage + 1}/{images.length}
        </div>
      </section>

      {images.length > 1 ? (
        <div className="miniapp-scrollbar -mt-3 flex gap-2 overflow-x-auto px-5 pb-1">
          {images.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setActiveImage(index)}
              className={cn('h-1.5 w-8 rounded-full transition', index === activeImage ? 'bg-gold' : 'bg-white/15')}
              aria-label={`${index + 1}-rasm`}
            />
          ))}
        </div>
      ) : null}

      <section className="px-5 pt-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h1 className="text-[24px] font-extrabold leading-[1.2] text-copy">{project.title}</h1>
              <div className="mt-2 flex items-center gap-1.5 text-[12px] text-muted">
                <MapPin className="h-3.5 w-3.5 text-gold" />
                <span className="min-w-0 truncate">{project.location}</span>
              </div>
            </div>
            <ProjectTypeBadge type={project.projectType} />
          </div>

          <div className="mt-4 rounded-[16px] border border-white/10 bg-card p-3.5">
            <div className="grid grid-cols-4 gap-2">
              <Metric label="ROI" value={`${project.expectedReturn}%`} />
              <Metric label="Investitsiya" value={formatCurrencyCompact(project.investmentRequired)} />
              <Metric label="Payback" value={`${project.paybackYears} yil`} />
              <Metric label="Mablag'" value={`${project.fundingPercentage}%`} />
            </div>
            <FundingProgress percentage={project.fundingPercentage} spotsLeft={project.spotsLeft} className="mt-3" />
          </div>

          <div className="miniapp-scrollbar -mx-5 mt-5 flex gap-5 overflow-x-auto border-b border-white/10 px-5">
            {detailTabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={cn(
                  'shrink-0 border-b-2 pb-3 text-[13px] font-bold transition',
                  activeTab === tab ? 'border-gold text-gold' : 'border-transparent text-muted'
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </motion.div>

        <section className="mt-5">
          {activeTab === 'Umumiy' ? (
            <ProjectOverview project={project} verifiedGovernmentDocument={verifiedGovernmentDocument} />
          ) : activeTab === 'Moliyaviy' ? (
            <ChartCard title="ROI ssenariylari" data={project.roiBreakdown} />
          ) : activeTab === 'Hujjatlar' ? (
            <DocumentsPanel project={project} verifiedGovernmentDocument={verifiedGovernmentDocument} />
          ) : activeTab === 'Galereya' ? (
            <GalleryPanel images={project.galleryImages} title={project.title} />
          ) : (
            <TeamPanel />
          )}
        </section>
      </section>

      <div className="fixed bottom-[calc(78px+env(safe-area-inset-bottom,0px))] left-1/2 z-40 w-full max-w-[390px] -translate-x-1/2 px-5">
        <div className="grid gap-2 rounded-[18px] border border-white/10 bg-[#0B0F1A]/96 p-2.5 backdrop-blur-xl">
          <PremiumButton onClick={() => setLeadIntent('invest')} trailingIcon={false}>
            Investitsiya qilish
          </PremiumButton>
          <PremiumButton onClick={() => setLeadIntent('contact')} variant="outline" trailingIcon={false}>
            Menejer bilan aloqa
          </PremiumButton>
        </div>
      </div>

      <LeadModal
        open={leadIntent !== null}
        onClose={() => setLeadIntent(null)}
        projectId={project.id}
        projectTitle={project.title}
        intent={leadIntent ?? 'contact'}
      />
    </main>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="truncate text-[11px] text-muted">{label}</p>
      <p className="mt-1 truncate text-[16px] font-extrabold text-copy">{value}</p>
    </div>
  );
}

function ProjectOverview({
  project,
  verifiedGovernmentDocument,
}: {
  project: Project;
  verifiedGovernmentDocument: Project['documents'][number] | null;
}) {
  return (
    <div>
      <h2 className="text-[16px] font-extrabold text-copy">Loyiha haqida</h2>
      <p className="mt-3 text-[14px] leading-[1.55] text-muted">{project.description}</p>

      <div className="mt-4 rounded-[16px] border border-white/10 bg-card p-4">
        <Fact icon={TrendingUp} label="Yillik quvvat" value={project.timeline[0]?.title || "Hujjatlarda ko'rsatiladi"} />
        <Fact icon={Users} label="Ish o'rinlari" value={project.timeline[1]?.title || `${project.investorsCount} investor`} />
        <Fact icon={CalendarDays} label="Boshlanish sanasi" value={project.timeline[2]?.title || 'Tasdiqlanmoqda'} />
        <Fact icon={Clock3} label="Tugash sanasi" value={project.timeline[3]?.title || 'Tasdiqlanmoqda'} />
      </div>

      <div className="mt-4 rounded-[16px] border border-white/10 bg-card p-4">
        {verifiedGovernmentDocument ? (
          <a href={verifiedGovernmentDocument.fileUrl} target="_blank" rel="noreferrer" className="flex items-center gap-3">
            <ShieldCheck className="h-5 w-5 text-gold" />
            <div>
              <p className="text-[14px] font-extrabold text-copy">Government backed</p>
              <p className="mt-1 text-[12px] text-muted">This project is verified based on provided legal documentation</p>
            </div>
          </a>
        ) : (
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-5 w-5 text-muted" />
            <div>
              <p className="text-[14px] font-extrabold text-copy">Verification pending</p>
              <p className="mt-1 text-[12px] text-muted">Hukumat tasdigi faqat haqiqiy hujjat mavjud bo&apos;lsa ko&apos;rsatiladi.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function DocumentsPanel({
  project,
  verifiedGovernmentDocument,
}: {
  project: Project;
  verifiedGovernmentDocument: Project['documents'][number] | null;
}) {
  if (project.documents.length === 0) {
    return (
      <div className="rounded-[16px] border border-white/10 bg-card p-5 text-center">
        <FileText className="mx-auto h-7 w-7 text-muted" />
        <h2 className="mt-3 text-[16px] font-extrabold text-copy">Hujjatlar kutilmoqda</h2>
        <p className="mt-2 text-[13px] leading-[1.5] text-muted">Supabase project_documents jadvalida tasdiqlangan fayl bo&apos;lsa, shu yerda ochiladi.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {project.documents.map((document) => (
        <a
          key={document.id}
          href={document.fileUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 rounded-[16px] border border-white/10 bg-card p-4"
        >
          <FileText className="h-5 w-5 text-gold" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[14px] font-extrabold text-copy">{document.title}</p>
            <p className="mt-1 text-[12px] text-muted">{document.issuer || "Issuer ko'rsatilmagan"}</p>
          </div>
          {document.id === verifiedGovernmentDocument?.id ? (
            <ShieldCheck className="h-5 w-5 text-gold" />
          ) : null}
        </a>
      ))}
    </div>
  );
}

function GalleryPanel({ images, title }: { images: string[]; title: string }) {
  return (
    <div className="grid grid-cols-2 gap-2.5">
      {images.length > 0 ? images.map((image, index) => (
        <div key={`${image}-${index}`} className="relative aspect-square overflow-hidden rounded-[16px] border border-white/10 bg-card">
          <Image src={image} alt={`${title} ${index + 1}`} fill sizes="160px" className="object-cover" />
        </div>
      )) : (
        <div className="col-span-2 rounded-[16px] border border-white/10 bg-card p-5 text-center">
          <ImageIcon className="mx-auto h-7 w-7 text-muted" />
          <p className="mt-3 text-[13px] text-muted">Galereya rasmlari Supabase orqali qo&apos;shilganda ko&apos;rinadi.</p>
        </div>
      )}
    </div>
  );
}

function TeamPanel() {
  return (
    <div className="rounded-[16px] border border-white/10 bg-card p-5">
      <BriefcaseBusiness className="h-6 w-6 text-gold" />
      <h2 className="mt-3 text-[16px] font-extrabold text-copy">Investor menejeri</h2>
      <p className="mt-2 text-[13px] leading-[1.5] text-muted">
        Menejer ma&apos;lumotlari investitsiya yoki aloqa so&apos;rovi yuborilgandan keyin Telegram orqali beriladi.
      </p>
    </div>
  );
}

function Fact({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 py-2">
      <Icon className="h-4 w-4 text-gold" />
      <p className="min-w-0 flex-1 text-[13px] text-muted">{label}: <span className="font-semibold text-copy">{value}</span></p>
    </div>
  );
}
