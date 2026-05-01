'use client';

import { FormEvent, useMemo, useState } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';
import { useAppTelegramUser } from '@/components/layout/TelegramUserProvider';
import { getTelegramInitData, getTelegramUser } from '@/lib/telegram';
import { cn } from '@/lib/utils';

interface LeadModalProps {
  open: boolean;
  onClose: () => void;
  projectId: string;
  projectTitle: string;
  intent: 'invest' | 'contact';
}

export function LeadModal({ open, onClose, projectId, projectTitle, intent }: LeadModalProps) {
  const { user, loading, error: userError } = useAppTelegramUser();
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const defaultMessage = useMemo(() => {
    return intent === 'invest'
      ? `${projectTitle} bo'yicha investitsiya shartlarini muhokama qilmoqchiman.`
      : `${projectTitle} bo'yicha menejer bilan bog'lanmoqchiman.`;
  }, [intent, projectTitle]);

  if (!open) return null;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          initData: getTelegramInitData(),
          user: getTelegramUser(),
          telegram_id: user?.telegram_id,
          project_id: projectId,
          message: message.trim() || defaultMessage,
        }),
      });
      const payload = await response.json() as { error?: string };

      if (!response.ok) {
        throw new Error(payload.error || 'Lead yuborilmadi.');
      }

      setStatus({ type: 'success', text: "So'rov qabul qilindi. Menejer Telegram orqali bog'lanadi." });
      setMessage('');
    } catch (submitError) {
      setStatus({
        type: 'error',
        text: submitError instanceof Error ? submitError.message : 'Lead yuborilmadi.',
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center bg-black/70 px-4 pb-4 backdrop-blur-sm">
      <div className="w-full max-w-[390px] rounded-[28px] border border-white/10 bg-card p-5 shadow-premium">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-gold">Investor lead</p>
            <h2 className="mt-2 text-2xl font-extrabold text-copy">
              {intent === 'invest' ? 'Investitsiya qilish' : 'Menejer bilan aloqa'}
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted">{projectTitle}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-muted"
            aria-label="Yopish"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={submit} className="mt-5 space-y-4">
          <label className="block">
            <span className="text-xs font-semibold text-muted">Ism</span>
            <input
              value={user?.first_name || 'Investor'}
              readOnly
              className="mt-2 h-12 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm font-semibold text-copy outline-none"
            />
          </label>
          <label className="block">
            <span className="text-xs font-semibold text-muted">Telegram username</span>
            <input
              value={user?.username ? `@${user.username}` : 'Telegram orqali aniqlanadi'}
              readOnly
              className="mt-2 h-12 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm font-semibold text-copy outline-none"
            />
          </label>
          <label className="block">
            <span className="text-xs font-semibold text-muted">Xabar</span>
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder={defaultMessage}
              rows={4}
              maxLength={700}
              className="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm leading-6 text-copy outline-none placeholder:text-muted focus:border-gold/50"
            />
          </label>

          {userError ? (
            <div className="rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200">
              {userError}
            </div>
          ) : null}

          {status ? (
            <div
              className={cn(
                'rounded-2xl border px-4 py-3 text-sm',
                status.type === 'success'
                  ? 'border-emerald-400/20 bg-emerald-400/10 text-emerald-200'
                  : 'border-red-400/20 bg-red-400/10 text-red-200'
              )}
            >
              {status.text}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={submitting || loading}
            className="gold-surface flex h-12 w-full items-center justify-center gap-2 rounded-2xl text-sm font-extrabold text-ink shadow-gold disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? (
              'Yuborilmoqda...'
            ) : (
              <>
                {intent === 'invest' ? <Send className="h-4 w-4" /> : <MessageCircle className="h-4 w-4" />}
                So&apos;rov yuborish
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
