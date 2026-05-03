import { cn } from '@/lib/utils';

interface FundingProgressProps {
  percentage: number;
  spotsLeft?: number | null;
  className?: string;
}

export function FundingProgress({ percentage, spotsLeft, className }: FundingProgressProps) {
  const safePercentage = Math.min(100, Math.max(0, Math.round(percentage)));

  return (
    <div className={className}>
      <div className="h-[7px] overflow-hidden rounded-full bg-white/[0.07]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#C9A84C] to-[#F1C94F] shadow-[0_0_18px_rgba(201,168,76,0.36)] transition-all duration-500"
          style={{ width: `${safePercentage}%` }}
        />
      </div>
      <div className="mt-2 flex items-center justify-between gap-3">
        <p className="text-[12px] font-semibold text-gold">{safePercentage}% mablag&apos; jalb qilingan</p>
        {typeof spotsLeft === 'number' ? (
          <p className={cn('text-[12px] font-semibold', spotsLeft <= 3 ? 'text-red-300' : 'text-muted')}>
            {spotsLeft} ta joy qoldi
          </p>
        ) : null}
      </div>
    </div>
  );
}
