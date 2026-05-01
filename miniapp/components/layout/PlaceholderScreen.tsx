import { ArrowLeft, type LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { CTAButton } from '@/components/ui/CTAButton';

interface PlaceholderScreenProps {
  eyebrow: string;
  title: string;
  description: string;
  ctaHref: string;
  ctaLabel: string;
  icon?: LucideIcon;
}

export function PlaceholderScreen({ eyebrow, title, description, ctaHref, ctaLabel, icon: Icon }: PlaceholderScreenProps) {
  return (
    <main className="pb-6">
      <Link 
        href="/" 
        className="inline-flex h-[40px] w-[40px] items-center justify-center rounded-[12px] border border-white/10 bg-white/[0.04] text-copy transition-all active:scale-95"
      >
        <ArrowLeft className="h-5 w-5" />
      </Link>
      <section className="mt-8 rounded-[20px] border border-white/10 bg-card p-6 shadow-premium">
        <div className="mb-5 flex h-[56px] w-[56px] items-center justify-center rounded-[14px] bg-gold/10 text-gold">
          {Icon ? <Icon className="h-7 w-7" /> : <span className="text-xl font-black">G</span>}
        </div>
        <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-gold">{eyebrow}</p>
        <h1 className="mt-3 text-[28px] font-bold leading-[1.35] text-copy">{title}</h1>
        <p className="mt-4 text-[15px] leading-[1.6] text-muted">{description}</p>
        <CTAButton href={ctaHref} className="mt-6 w-full">
          {ctaLabel}
        </CTAButton>
      </section>
    </main>
  );
}