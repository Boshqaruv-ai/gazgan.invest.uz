'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';

const workshops = [
  {
    name: 'Sex №1 - Katta plitalar',
    type: 'plates',
    capacity: 800000,
    description: "Katta o'lchamdagi marmar va granit plitalarni ishlab chiqarish. Italiyaning 'Breton' dastgohlari bilan jihozlangan.",
    processes: ['Kesish', 'Silliqlash', 'Jilolash'],
  },
  {
    name: 'Sex №2 - Plitkalar',
    type: 'tiles',
    capacity: 600000,
    description: "Standart o'lchamdagi plitkalar ishlab chiqarish. Avtomatlashtirilgan kesish va qadoqlash liniyalari.",
    processes: ['Kesish', 'Qadoqlash', 'Nazorat'],
  },
  {
    name: 'Sex №3 - Bloklar',
    type: 'blocks',
    capacity: 400000,
    description: "Katta hajmdagi marmar va granit bloklarni tayyorlash va eksportga jo'natish.",
    processes: ['Bloklash', 'Yuklash'],
  },
  {
    name: 'Sex №4 - Suvenirlar',
    type: 'souvenirs',
    capacity: 200000,
    description: "Hunarmandchilik buyumlari va suvenirlar ishlab chiqarish. CNC dastgohlari va qo'l mehnati uyg'unligi.",
    processes: ['CNC', 'Qo\'l ishi', 'Dizayn'],
  },
];

const equipment = [
  { name: 'Breton Bretonmax', country: 'Italiya', function: 'Katta plitalarni kesish', count: 4 },
  { name: 'SIMEC Multiwire', country: 'Italiya', function: 'Simli arralash', count: 6 },
  { name: 'Keda KD-1200', country: 'Xitoy', function: 'Plitkalar kesish', count: 12 },
  { name: 'CMS Brembana CNC', country: 'Italiya', function: 'CNC ishlov berish', count: 3 },
  { name: 'Donatoni POL-600', country: 'Italiya', function: 'Jilolash va silliqlash', count: 8 },
];

export default function ProductionPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 hero-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 pt-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Ishlab Chiqarish va Texnologiyalar</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Zamonaviy uskunalar va ilg&apos;or texnologiyalar bilan jihozlangan ishlab chiqarish jarayoni
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-secondary/50 border border-accent/10 rounded-2xl p-6 text-center card-hover">
            <div className="text-3xl font-bold text-accent mb-2">8</div>
            <div className="text-gray-400 text-sm">Qayta ishlash sexlari</div>
          </div>
          <div className="bg-secondary/50 border border-accent/10 rounded-2xl p-6 text-center card-hover">
            <div className="text-3xl font-bold text-accent mb-2">2M+</div>
            <div className="text-gray-400 text-sm">m² yillik quvvat</div>
          </div>
          <div className="bg-secondary/50 border border-accent/10 rounded-2xl p-6 text-center card-hover">
            <div className="text-3xl font-bold text-accent mb-2">45+</div>
            <div className="text-gray-400 text-sm">Zamonaviy dastgohlar</div>
          </div>
          <div className="bg-secondary/50 border border-accent/10 rounded-2xl p-6 text-center card-hover">
            <div className="text-3xl font-bold text-accent mb-2">99%</div>
            <div className="text-gray-400 text-sm">Sifat ko'rsatkichi</div>
          </div>
        </div>

        {/* Workshops */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8">Qayta ishlash sexlari</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {workshops.map((workshop, index) => (
              <div key={index} className="bg-secondary/30 border border-accent/10 rounded-2xl p-8 card-hover">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{workshop.name}</h3>
                    <p className="text-accent text-sm">Yillik quvvat: {workshop.capacity.toLocaleString()} m²</p>
                  </div>
                </div>
                <p className="text-gray-400 text-sm mb-4">{workshop.description}</p>
                <div className="flex flex-wrap gap-2">
                  {workshop.processes.map(process => (
                    <span key={process} className="bg-accent/10 text-accent text-xs px-3 py-1 rounded-full">
                      {process}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Equipment */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-8">Uskunalar parki</h2>
          <div className="bg-secondary/30 border border-accent/10 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-accent/20">
                    <th className="text-left p-4 text-accent font-semibold">Uskuna nomi</th>
                    <th className="text-left p-4 text-accent font-semibold">Ishlab chiqaruvchi</th>
                    <th className="text-left p-4 text-accent font-semibold">Vazifasi</th>
                    <th className="text-left p-4 text-accent font-semibold">Soni</th>
                  </tr>
                </thead>
                <tbody>
                  {equipment.map((item, index) => (
                    <tr key={index} className="border-b border-white/5 hover:bg-accent/5 transition-colors">
                      <td className="p-4 text-white">{item.name}</td>
                      <td className="p-4 text-gray-400">{item.country}</td>
                      <td className="p-4 text-gray-400">{item.function}</td>
                      <td className="p-4 text-accent font-semibold">{item.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* AI Quality Control */}
        <div className="mt-16 bg-gradient-to-r from-accent/10 to-transparent border border-accent/20 rounded-2xl p-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">AI Sifat Nazorati</h2>
              <p className="text-gray-400 mb-4">Sun&apos;iy intellekt yordamida har bir mahsulotning sifati avtomatik ravishda tekshiriladi. AI tizimi:</p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-gray-300">
                  <svg className="w-5 h-5 text-accent flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Yoriqular va nuqsonlarni aniqlash
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <svg className="w-5 h-5 text-accent flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Rang va tekstura tasnifi
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <svg className="w-5 h-5 text-accent flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  O&apos;lcham aniqligini tekshirish
                </li>
                <li className="flex items-center gap-3 text-gray-300">
                  <svg className="w-5 h-5 text-accent flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Avtomatik saralash
                </li>
              </ul>
            </div>
            <div className="bg-dark/50 rounded-xl p-6 border border-accent/10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-accent font-semibold">Sifat ko&apos;rsatkichlari</span>
                <span className="text-green-400 text-sm">● Real-time</span>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Yuqori sifat (A)</span>
                    <span className="text-accent">78%</span>
                  </div>
                  <div className="w-full bg-dark rounded-full h-2">
                    <div className="progress-bar h-2 rounded-full" style={{ width: '78%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">O&apos;rta sifat (B)</span>
                    <span className="text-accent">18%</span>
                  </div>
                  <div className="w-full bg-dark rounded-full h-2">
                    <div className="progress-bar h-2 rounded-full" style={{ width: '18%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Past sifat (C)</span>
                    <span className="text-accent">4%</span>
                  </div>
                  <div className="w-full bg-dark rounded-full h-2">
                    <div className="progress-bar h-2 rounded-full" style={{ width: '4%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}