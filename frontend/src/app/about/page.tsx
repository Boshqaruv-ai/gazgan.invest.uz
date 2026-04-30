'use client';

import { AboutHistory, AboutMission, AboutTeam, AboutContact } from '@/features/about';

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 hero-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 pt-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Biz haqimizda</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            G&apos;ozg&apos;on marmar va granit yo&apos;nalishlari bo&apos;yicha mahsulot, investitsiya va aloqa ma&apos;lumotlari
          </p>
        </div>

        <AboutHistory />
        <AboutMission />
        <AboutTeam />
        <AboutContact />
      </div>
    </div>
  );
}
