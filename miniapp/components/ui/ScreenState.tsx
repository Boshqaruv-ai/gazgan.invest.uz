import { AlertCircle, Loader2 } from 'lucide-react';

interface LoadingStateProps {
  title?: string;
}

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export function LoadingState({ title = 'Yuklanmoqda...' }: LoadingStateProps) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-card p-5 text-center">
      <Loader2 className="mx-auto h-7 w-7 animate-spin text-gold" />
      <p className="mt-3 text-sm font-semibold text-copy">{title}</p>
    </div>
  );
}

export function ErrorState({ title = 'Xatolik yuz berdi', message, onRetry }: ErrorStateProps) {
  return (
    <div className="rounded-[24px] border border-red-400/20 bg-red-400/10 p-5">
      <div className="flex items-start gap-3">
        <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-200" />
        <div>
          <p className="text-sm font-extrabold text-red-100">{title}</p>
          <p className="mt-2 text-sm leading-6 text-red-100/80">{message}</p>
        </div>
      </div>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 h-11 rounded-2xl border border-red-200/20 px-4 text-sm font-bold text-red-100"
        >
          Qayta urinish
        </button>
      ) : null}
    </div>
  );
}
