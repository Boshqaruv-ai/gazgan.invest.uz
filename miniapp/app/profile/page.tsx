'use client';

import { RefreshCw, UserRound } from 'lucide-react';
import { useAppTelegramUser } from '@/components/layout/TelegramUserProvider';

export default function ProfilePage() {
  const { user, loading, error, refresh } = useAppTelegramUser();

  return (
    <main className="pb-6">
      <section className="rounded-[20px] border border-white/10 bg-card p-6 shadow-premium">
        <div className="flex h-[64px] w-[64px] items-center justify-center rounded-[18px] bg-gold/10 text-gold">
          <UserRound className="h-8 w-8" />
        </div>
        <p className="mt-5 text-[12px] font-bold uppercase tracking-[0.14em] text-gold">Profil</p>
        <h1 className="mt-2 text-[28px] font-bold leading-[1.35] text-copy">{user?.first_name || 'Investor'}</h1>
        <p className="mt-3 text-[15px] leading-[1.6] text-muted">
          Barcha lead va investitsiya harakatlari Telegram ID orqali bog&apos;lanadi. Login yoki parol kerak emas.
        </p>
      </section>

      <section className="mt-5 space-y-3 rounded-[20px] border border-white/10 bg-card p-5">
        <InfoRow label="Telegram ID" value={user?.telegram_id || (loading ? 'Aniqlanmoqda...' : 'Topilmadi')} />
        <InfoRow label="Username" value={user?.username ? `@${user.username}` : "Ko'rsatilmagan"} />
        <InfoRow label="Status" value={error ? 'Sinxronlash xatosi' : loading ? 'Sinxronlanmoqda' : "Supabase bilan bog'langan"} />
        {error ? (
          <div className="rounded-[12px] border border-red-400/20 bg-red-400/10 px-4 py-3 text-[14px] text-red-200">
            {error}
          </div>
        ) : null}
        <button
          type="button"
          onClick={() => void refresh()}
          className="mt-3 flex h-[48px] w-full items-center justify-center gap-2 rounded-[14px] border border-gold/30 bg-gold/10 text-[14px] font-bold text-gold transition-all hover:bg-gold/15 active:scale-95"
        >
          <RefreshCw className="h-4 w-4" />
          Qayta sinxronlash
        </button>
      </section>
    </main>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-[12px] bg-white/[0.04] px-4 py-3">
      <span className="text-[14px] text-muted">{label}</span>
      <span className="min-w-0 truncate text-right text-[14px] font-bold text-copy">{value}</span>
    </div>
  );
}