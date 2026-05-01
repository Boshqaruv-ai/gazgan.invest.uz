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
    <main className="px-5 pb-6 pt-[calc(18px+var(--safe-top))]">
      <Link href="/" className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-copy">
        <ArrowLeft className="h-5 w-5" />
      </Link>
      <section className="mt-8 rounded-[28px] border border-white/10 bg-card p-6 shadow-premium">
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/10 text-gold">
          {Icon ? <Icon className="h-7 w-7" /> : <span className="text-xl font-black">G</span>}
        </div>
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-gold">{eyebrow}</p>
        <h1 className="mt-3 text-3xl font-extrabold leading-tight text-copy">{title}</h1>
        <p className="mt-4 text-sm leading-6 text-muted">{description}</p>
        <CTAButton href={ctaHref} className="mt-6 w-full">
          {ctaLabel}
        </CTAButton>
      </section>
    </main>
  );
}
