'use client';

import { QuarriesList } from '@/features/quarries';

export default function QuarriesPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 hero-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 pt-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Konlar va Zaxiralar</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            G&apos;ozg&apos;oning boy marmar va granit konlari haqida batafsil ma&apos;lumot
          </p>
        </div>

        <QuarriesList />
      </div>
    </div>
  );
}