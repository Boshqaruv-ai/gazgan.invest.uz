'use client';

import { InvestmentBenefits, InvestmentProjects, InvestmentCalculator } from '@/features/investment';

export default function InvestmentPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 hero-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 pt-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Investitsiya Imkoniyatlari</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            G&apos;ozg&apos;on marmar va granit yo&apos;nalishlari bo&apos;yicha MVP katalog va taxminiy ssenariylar
          </p>
          <p className="text-accent/80 max-w-3xl mx-auto text-sm mt-4">
            Bu sahifadagi ROI va miqdorlar dastlabki baholash uchun. Yakuniy tijoriy shartlar kontakt orqali alohida tasdiqlanadi.
          </p>
        </div>

        <InvestmentBenefits />
        <InvestmentProjects />
        <InvestmentCalculator />
      </div>
    </div>
  );
}
