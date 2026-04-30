'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';

interface ProjectDetailProps {
  projectId: string;
}

const projectsData: Record<string, {
  name: string;
  amount: number;
  roi: number;
  payback: number;
  description: string;
  details: string;
  features: string[];
  risks: string[];
  documents: string[];
}> = {
  'granit-processing': {
    name: 'Granit qayta ishlash sexi',
    amount: 5000000,
    roi: 25,
    payback: 4,
    description: 'Granit plitka va bloklarni qayta ishlash uchun ishlab chiqarish ssenariysi.',
    details: 'Bu ssenariy granit mahsulotlarini kesish, silliqlash va qadoqlash liniyasi uchun dastlabki baholash sifatida berilgan.',
    features: [
      'Yillik quvvat: 500,000 m2',
      'CNC va kesish liniyalari',
      'Sifat nazorati jarayoni',
      'Eksportga tayyor mahsulot formati',
    ],
    risks: [
      'Xom ashyo yetkazib berish kechikishi',
      'Elektr energiyasi uzilishlari',
      "Bozor narxlari o'zgarishi",
    ],
    documents: ['Biznes-reja', 'Texnik-iqtisodiy asos', 'Tijoriy taklif'],
  },
  'marble-processing': {
    name: 'Marmar qayta ishlash sexi',
    amount: 4000000,
    roi: 22,
    payback: 5,
    description: 'Marmar plitka va dekorativ mahsulotlar ishlab chiqarish ssenariysi.',
    details: "Marmar mahsulotlarini kesish, jilolash va tayyor katalog mahsulotiga aylantirish yo'nalishi.",
    features: [
      'Yillik quvvat: 400,000 m2',
      'Jilolash liniyasi',
      'Standart plitka formatlari',
      'Mahsulot saralash jarayoni',
    ],
    risks: ["Bozor talabi o'zgarishi", 'Raqobat', 'Qurilish kechikishi'],
    documents: ['Biznes-reja', 'Texnik loyiha', 'Iqtisodiy asos'],
  },
  'quarry-development': {
    name: 'Kon ochish',
    amount: 8000000,
    roi: 30,
    payback: 3,
    description: "Yangi kon yo'nalishini rivojlantirish uchun dastlabki baholash.",
    details: 'Konni ishga tushirish, texnika xaridi va qazib olish infratuzilmasini tayyorlash ssenariysi.',
    features: [
      'Zaxira: loyiha asosida tekshiriladi',
      'Qazib olish texnikasi',
      'Transport va saralash zonasi',
      'Geologik hujjatlar talab qilinadi',
    ],
    risks: ['Geologik xavflar', 'Ekologik talablar', 'Qazib olish xavfsizligi'],
    documents: ['Kon litsenziyasi', 'Geologik hisob', 'Xavf tahlili'],
  },
  'souvenir-factory': {
    name: 'Suvenir fabrikasi',
    amount: 1500000,
    roi: 30,
    payback: 3,
    description: 'Marmar va granitdan kichik dekorativ buyumlar ishlab chiqarish ssenariysi.',
    details: "Kichik formatli dekorativ mahsulotlar, suvenirlar va buyurtma asosidagi buyumlar ishlab chiqarish yo'nalishi.",
    features: ['Yillik quvvat: 100,000 dona', 'Mahalliy ishchi kuchi', 'Eksport imkoniyati', "Kichikroq boshlang'ich miqdor"],
    risks: ['Sotuv kanallari', 'Brending', 'Sifat nazorati'],
    documents: ['Biznes-reja', 'Marketing reja', 'Ishlab chiqarish rejasi'],
  },
};

export function ProjectDetail({ projectId }: ProjectDetailProps) {
  const project = projectsData[projectId];

  if (!project) {
    return (
      <div className="min-h-screen pt-24 pb-20 hero-bg flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-3xl font-bold text-white mb-4">Loyiha topilmadi</h1>
          <p className="text-gray-400 mb-8">Kerakli loyiha topilmadi</p>
          <Link href="/investment">
            <Button>Investitsiya sahifasiga qaytish</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 hero-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/investment" className="inline-flex items-center gap-2 text-gray-400 hover:text-accent mb-6">
          <span aria-hidden="true">&lt;</span>
          <span>Orqaga</span>
        </Link>

        <div className="bg-secondary/30 border border-accent/10 rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">{project.name}</h1>
            <span className="bg-accent/10 text-accent text-sm px-4 py-2 rounded-full w-fit">
              ~{project.roi}% ROI
            </span>
          </div>

          <p className="text-gray-400 mb-4">{project.description}</p>
          <p className="text-accent/80 text-sm mb-8">Bu taxminiy MVP ssenariy. Moliyaviy kafolat emas.</p>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-dark/50 rounded-xl p-4 text-center">
              <div className="text-xl sm:text-2xl font-bold text-accent">${(project.amount / 1000000).toFixed(1)}M</div>
              <div className="text-gray-500 text-xs sm:text-sm mt-1">Miqdor</div>
            </div>
            <div className="bg-dark/50 rounded-xl p-4 text-center">
              <div className="text-xl sm:text-2xl font-bold text-green-400">{project.roi}%</div>
              <div className="text-gray-500 text-xs sm:text-sm mt-1">Taxminiy ROI</div>
            </div>
            <div className="bg-dark/50 rounded-xl p-4 text-center">
              <div className="text-xl sm:text-2xl font-bold text-accent">{project.payback} yil</div>
              <div className="text-gray-500 text-xs sm:text-sm mt-1">Qoplash</div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-bold text-white mb-4">Batafsil ma&apos;lumot</h2>
            <p className="text-gray-400">{project.details}</p>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-bold text-white mb-4">Loyiha xususiyatlari</h2>
            <ul className="space-y-3">
              {project.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <span className="text-accent mt-0.5">-</span>
                  <span className="text-gray-300 text-sm sm:text-base">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-bold text-white mb-4">Xavflar</h2>
            <ul className="space-y-3">
              {project.risks.map((risk) => (
                <li key={risk} className="flex items-start gap-3">
                  <span className="text-yellow-500 mt-0.5">!</span>
                  <span className="text-gray-300 text-sm sm:text-base">{risk}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-bold text-white mb-4">Kerakli hujjatlar</h2>
            <div className="flex flex-wrap gap-3">
              {project.documents.map((doc) => (
                <span key={doc} className="flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-lg text-sm">
                  {doc}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/about#contact" className="flex-1">
              <Button className="w-full">Kontakt so&apos;rovi yuborish</Button>
            </Link>
            <Link href="/investment" className="flex-1">
              <Button variant="outline" className="w-full">Boshqa ssenariylar</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
