'use client';

import Link from 'next/link';
import { AlertTriangle, CheckCircle2, FileText } from 'lucide-react';
import { LeadForm } from '@/components/marketing';
import { Button } from '@/components/ui/Button';
import { investments } from '@/lib/investments';

interface ProjectDetailProps {
  projectId: string;
}

const projectMeta: Record<string, {
  details: string;
  features: string[];
  risks: string[];
  documents: string[];
}> = {
  'granit-processing': {
    details: 'Granit mahsulotlarini kesish, silliqlash, qadoqlash va eksportga tayyor formatga olib chiqish uchun ishlab chiqarish kompleksi.',
    features: ['CNC va kesish liniyalari', 'Sifat nazorati jarayoni', 'Eksportga tayyor mahsulot formati'],
    risks: ['Xom ashyo yetkazib berish kechikishi', 'Elektr energiyasi uzilishlari', 'Bozor narxlari o‘zgarishi'],
    documents: ['Biznes-reja', 'Texnik-iqtisodiy asos', 'Tijoriy taklif'],
  },
  'marble-processing': {
    details: 'Marmar plitka, slab va dekorativ mahsulotlarni ishlab chiqarish uchun jilolash va tayyor mahsulot liniyasi.',
    features: ['Jilolash liniyasi', 'Standart plitka formatlari', 'Mahsulot saralash jarayoni'],
    risks: ['Bozor talabi o‘zgarishi', 'Raqobat', 'Qurilish kechikishi'],
    documents: ['Biznes-reja', 'Texnik loyiha', 'Iqtisodiy asos'],
  },
  'quarry-development': {
    details: 'Konni ishga tushirish, qazib olish texnikasi va transport infratuzilmasini tayyorlash ssenariysi.',
    features: ['Qazib olish texnikasi', 'Transport va saralash zonasi', 'Geologik hujjatlar talab qilinadi'],
    risks: ['Geologik xavflar', 'Ekologik talablar', 'Qazib olish xavfsizligi'],
    documents: ['Kon litsenziyasi', 'Geologik hisob', 'Xavf tahlili'],
  },
  'souvenir-factory': {
    details: 'Kichik formatli dekorativ mahsulotlar, suvenirlar va buyurtma asosidagi interyer buyumlari ishlab chiqarish.',
    features: ['Mahalliy ishchi kuchi', 'Eksport imkoniyati', 'Kichikroq boshlang‘ich miqdor'],
    risks: ['Sotuv kanallari', 'Brending', 'Sifat nazorati'],
    documents: ['Biznes-reja', 'Marketing reja', 'Ishlab chiqarish rejasi'],
  },
};

export function ProjectDetail({ projectId }: ProjectDetailProps) {
  const project = investments.find((item) => item.id === projectId);
  const meta = project ? projectMeta[project.id] : null;

  if (!project || !meta) {
    return (
      <main className="min-h-screen bg-dark pt-32">
        <div className="section-shell text-center">
          <h1 className="text-3xl font-bold text-copy">Loyiha topilmadi</h1>
          <Link href="/investment">
            <Button className="mt-6">Investitsiya sahifasiga qaytish</Button>
          </Link>
        </div>
      </main>
    );
  }

  const progress = Math.min(Math.max(project.roi, 0), 40) / 40 * 100;

  return (
    <main className="min-h-screen bg-dark pt-28">
      <section className="section-shell pb-20 pt-8">
        <Link href="/investment" className="mb-7 inline-flex text-sm font-medium text-muted transition-colors hover:text-accent">
          Investitsiya sahifasiga qaytish
        </Link>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="glass-card rounded-2xl p-6 sm:p-8">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-accent/80">{project.category}</div>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-copy md:text-5xl">{project.name}</h1>
            <p className="mt-5 text-lg leading-8 text-muted">{project.description}</p>
            <p className="mt-4 text-sm text-muted">Natijalar bozor sharoitiga bog‘liq.</p>

            <div className="mt-8 grid grid-cols-3 gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="text-xs text-muted">Investitsiya</div>
                <div className="mt-2 text-xl font-bold text-copy">${(project.amount / 1000000).toFixed(1)}M</div>
              </div>
              <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4">
                <div className="text-xs text-emerald-200">ROI</div>
                <div className="mt-2 text-xl font-bold text-emerald-300">{project.roi}%</div>
              </div>
              <div className="rounded-2xl border border-accent/25 bg-accent/10 p-4">
                <div className="text-xs text-accent/80">Payback</div>
                <div className="mt-2 text-xl font-bold text-accent">{project.payback} yil</div>
              </div>
            </div>

            <div className="mt-8">
              <div className="mb-2 flex justify-between text-sm text-muted">
                <span>ROI progress</span>
                <span>{project.roi}%</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-accent" style={{ width: `${progress}%` }} />
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-bold text-copy">Loyiha tafsilotlari</h2>
              <p className="mt-4 text-sm leading-7 text-muted">{meta.details}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-xl font-bold text-copy">Xususiyatlar</h3>
              <div className="mt-4 grid gap-3">
                {meta.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-muted">
                    <CheckCircle2 className="h-5 w-5 text-accent" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-xl font-bold text-copy">Risklar</h3>
              <div className="mt-4 grid gap-3">
                {meta.risks.map((risk) => (
                  <div key={risk} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-muted">
                    <AlertTriangle className="h-5 w-5 text-accent" />
                    {risk}
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-xl font-bold text-copy">Kerakli hujjatlar</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {meta.documents.map((doc) => (
                  <span key={doc} className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-2 text-sm text-accent">
                    <FileText className="h-4 w-4" />
                    {doc}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="lead" className="section-shell pb-20">
        <LeadForm
          compact
          defaultInterest="Investitsiya loyihasi"
          title={`${project.name} bo‘yicha investor so‘rovi`}
          subtitle="Kapital miqdori, muddat va kerakli loyiha formatini yozing."
        />
      </section>
    </main>
  );
}
