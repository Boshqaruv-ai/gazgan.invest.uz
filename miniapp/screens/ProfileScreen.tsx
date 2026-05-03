'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Bookmark, ChevronRight, FileText, History, LogOut, Settings, Shield, UserRound, type LucideIcon } from 'lucide-react';
import { PremiumButton } from '@/components/ui/PremiumButton';
import { ErrorState, LoadingState } from '@/components/ui/ScreenState';
import { useTelegramWebApp } from '@/hooks/useTelegramWebApp';
import { closeTelegramApp, triggerTelegramHaptic } from '@/lib/telegram';
import { fetchProfileSummary, type ProfileSummary } from '@/services/profile';
import type { AppTelegramUser } from '@/components/layout/TelegramUserProvider';

export function ProfileScreen() {
  useTelegramWebApp();
  const [user, setUser] = useState<AppTelegramUser | null>(null);
  const [summary, setSummary] = useState<ProfileSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadProfile() {
    setLoading(true);
    setError(null);

    try {
      const payload = await fetchProfileSummary();
      setUser(payload.user);
      setSummary(payload.summary);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Profil yuklanmadi.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadProfile();
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="screen-shell">
        <LoadingState title="Profil yuklanmoqda..." />
      </div>
    );
  }

  if (error || !user || !summary) {
    return (
      <div className="screen-shell">
        <ErrorState message={error || 'Profil topilmadi.'} onRetry={() => void loadProfile()} />
      </div>
    );
  }

  const displayName = user.first_name || user.username || 'Investor';
  const level = user.investor_level ?? 'standard';

  return (
    <div className="screen-shell">
      <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3">
          <div className="flex h-[64px] w-[64px] shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-[22px] font-extrabold text-gold">
            {displayName.slice(0, 1).toUpperCase() || <UserRound className="h-7 w-7" />}
          </div>
          <div className="min-w-0">
            <h1 className="truncate text-[18px] font-extrabold text-copy">{displayName}</h1>
            <p className="mt-1 text-[13px] text-muted">Investor</p>
            <p className="mt-0.5 truncate text-[12px] text-muted">
              {user.username ? `@${user.username}` : `Telegram ID: ${user.telegram_id}`}
            </p>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="mt-5 overflow-hidden rounded-[16px] border border-gold/25 bg-[linear-gradient(135deg,rgba(201,168,76,0.24),rgba(201,168,76,0.58))] p-5 shadow-gold"
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[12px] text-white/76">Investor darajasi</p>
            <p className="mt-1 text-[18px] font-extrabold capitalize text-white">{levelLabel(level)}</p>
            <p className="mt-2 text-[12px] text-white/78">A&apos;zo bo&apos;lgan sana</p>
            <p className="mt-1 text-[13px] font-semibold text-white">{formatDate(user.member_since)}</p>
          </div>
          <div className="grid h-[78px] w-[78px] place-items-center rounded-full border border-[#0B0F1A]/20 bg-[#0B0F1A]/15">
            <Shield className="h-9 w-9 text-[#0B0F1A]" />
          </div>
        </div>
      </motion.section>

      <section className="mt-5">
        <h2 className="text-[16px] font-extrabold text-copy">Mening ma&apos;lumotlarim</h2>
        <div className="mt-3 overflow-hidden rounded-[16px] border border-white/10 bg-card">
          <ProfileRow icon={Bookmark} label="Saqlangan loyihalar" value={`${summary.savedProjects} ta loyiha`} />
          <ProfileRow icon={History} label="Muloqot tarixi" value={`${summary.chatHistory} ta suhbat`} />
          <ProfileRow icon={FileText} label="Yuklab olingan hujjatlar" value={`${summary.downloadedDocuments} ta fayl`} />
          <ProfileRow icon={Bell} label="Xabarnomalar" value={`${summary.notifications} ta yangi`} badge={summary.unreadNotifications} />
          <ProfileRow icon={Settings} label="Sozlamalar" value="" />
        </div>
      </section>

      {summary.recentNotifications.length > 0 ? (
        <section className="mt-4 space-y-2">
          {summary.recentNotifications.map((notification) => (
            <div key={notification.id} className="rounded-[14px] border border-white/10 bg-card p-3">
              <p className="text-[13px] font-bold text-copy">{notification.title}</p>
              {notification.body ? <p className="mt-1 text-[12px] text-muted">{notification.body}</p> : null}
            </div>
          ))}
        </section>
      ) : null}

      <PremiumButton
        variant="danger"
        trailingIcon={false}
        icon={LogOut}
        className="mt-4"
        onClick={() => {
          triggerTelegramHaptic('light');
          closeTelegramApp();
        }}
      >
        Chiqish
      </PremiumButton>
    </div>
  );
}

function ProfileRow({
  icon: Icon,
  label,
  value,
  badge,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  badge?: number;
}) {
  return (
    <div className="flex min-h-[56px] items-center gap-3 border-b border-white/10 px-4 last:border-b-0">
      <Icon className="h-5 w-5 shrink-0 text-gold" />
      <div className="min-w-0 flex-1">
        <p className="text-[14px] font-semibold text-copy">{label}</p>
        {value ? <p className="mt-0.5 text-[12px] text-muted">{value}</p> : null}
      </div>
      {badge ? (
        <span className="grid h-5 min-w-[20px] place-items-center rounded-full bg-red-500 px-1.5 text-[10px] font-extrabold text-white">
          {badge}
        </span>
      ) : null}
      <ChevronRight className="h-4 w-4 text-muted" />
    </div>
  );
}

function levelLabel(level: NonNullable<AppTelegramUser['investor_level']>) {
  return level === 'gold' ? 'Gold' : level === 'platinum' ? 'Platinum' : 'Standard';
}

function formatDate(value: string | undefined) {
  if (!value) return 'Tasdiqlanmoqda';
  return new Intl.DateTimeFormat('uz-UZ').format(new Date(value));
}
