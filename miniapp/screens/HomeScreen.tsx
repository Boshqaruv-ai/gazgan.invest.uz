'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Bell, Bot, BriefcaseBusiness, ChevronRight, Clock3, Coins, Landmark, PieChart } from 'lucide-react';
import { StatCard } from '@/components/cards/StatCard';
import { PremiumButton } from '@/components/ui/PremiumButton';
import { ErrorState, LoadingState } from '@/components/ui/ScreenState';
import { useAppTelegramUser } from '@/components/layout/TelegramUserProvider';
import { useProjects } from '@/hooks/useProjects';
import { useTelegramWebApp } from '@/hooks/useTelegramWebApp';
import { formatCurrencyCompact } from '@/lib/utils';

export function HomeScreen() {
  useTelegramWebApp();
  const { user } = useAppTelegramUser();
  const { projects, stats, loading, error, reload } = useProjects();
  const heroProject = projects.find((project) => project.projectType === 'construction') ?? projects[0];

  const statCards = [
    { label: 'Faol loyihalar', value: String(stats?.activeProjects ?? 0), detail: 'ta loyiha', icon: BriefcaseBusiness },
    { label: 'Indikativ ROI', value: stats?.roiRange ?? '...', detail: 'yillik ssenariy', icon: PieChart },
    { label: 'Payback muddati', value: stats?.paybackRange ?? '...', detail: "o'rtacha", icon: Clock3 },
    { label: 'Jami investitsiya', value: formatCurrencyCompact(stats?.totalInvestment ?? 0), detail: "jalb qilinadigan", icon: Coins },
  ];

  return (
    <main className="screen-shell">
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between gap-4"
      >
        <div className="flex items-center gap-2.5">
          <div className="flex h-[32px] w-[32px] items-center justify-center rounded-full border border-gold/40 bg-gold/10">
            <Landmark className="h-[18px] w-[18px] text-gold" />
          </div>
          <p className="text-[14px] font-extrabold tracking-tight text-copy">
            <span className="text-gold">GAZGAN</span> INVEST
          </p>
        </div>
        <button
          type="button"
          aria-label="Bildirishnomalar"
          className="flex h-[38px] w-[38px] items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white"
        >
          <Bell className="h-5 w-5" />
        </button>
      </motion.header>

      <section className="mt-4">
        {heroProject ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35 }}
            className="relative min-h-[236px] overflow-hidden rounded-[16px] border border-white/10 bg-card shadow-premium"
          >
            <Image
              src={heroProject.image}
              alt={heroProject.title}
              fill
              priority
              sizes="350px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F1A]/95 via-[#0B0F1A]/70 to-[#0B0F1A]/12" />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0B0F1A] to-transparent" />
            <div className="relative z-10 flex min-h-[236px] flex-col justify-end p-5">
              <h1 className="max-w-[285px] text-[25px] font-extrabold leading-[1.18] tracking-tight text-white">
                G&apos;ozg&apos;on — O&apos;zbekistonning marmar va granit yuragi
              </h1>
              <p className="mt-3 max-w-[265px] text-[13px] leading-[1.45] text-white/78">
                Yuqori daromadli investitsiya imkoniyatlari sizni kutmoqda
              </p>
            </div>
          </motion.div>
        ) : loading ? (
          <LoadingState title="Loyihalar yuklanmoqda..." />
        ) : error ? (
          <ErrorState message={error} onRetry={() => void reload()} />
        ) : null}
      </section>

      <section className="mt-3 grid gap-2.5">
        <PremiumButton href="/projects">Investitsiya qilish</PremiumButton>
        <PremiumButton href="/projects" variant="outline" trailingIcon={false}>
          Loyihalarni ko&apos;rish
        </PremiumButton>
      </section>

      <section className="mt-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-[14px] font-extrabold text-copy">Asosiy ko&apos;rsatkichlar</h2>
          <Link href="/projects" className="inline-flex items-center gap-1 text-[12px] font-bold text-gold">
            Barchasi
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
            >
              <StatCard {...stat} />
            </motion.div>
          ))}
        </div>
      </section>

      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4 rounded-[16px] border border-white/10 bg-card p-3.5 shadow-premium"
      >
        <Link href="/chat" className="flex items-center gap-3">
          <div className="relative flex h-[64px] w-[64px] shrink-0 items-center justify-center rounded-full bg-[radial-gradient(circle_at_30%_20%,#FFF0A3,#C9A84C_38%,#2B210A_76%)] shadow-[0_0_26px_rgba(201,168,76,0.35)]">
            <div className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-[#0B0F1A]">
              <Bot className="h-6 w-6 text-gold" />
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-[16px] font-extrabold text-copy">AI Konsultant</h2>
            <p className="mt-1 line-clamp-2 text-[13px] leading-[1.35] text-muted">
              Savollaringizga 24/7 javob beradi va loyihani tanlashda yordam beradi.
            </p>
          </div>
          <span className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full border border-gold/20 bg-gold/10 text-gold">
            <ChevronRight className="h-5 w-5" />
          </span>
        </Link>
      </motion.section>

      {user?.first_name ? (
        <p className="mt-4 text-center text-[11px] text-muted">Telegram investor: {user.first_name}</p>
      ) : null}
    </main>
  );
}
