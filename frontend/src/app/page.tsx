'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

const stats = [
  { value: 250, suffix: 'mln m³', label: 'Zaxira' },
  { value: 12, suffix: '+', label: 'Faol konlar' },
  { value: 25, suffix: '+', label: 'Eksport davlatlari' },
  { value: 5000, suffix: '+', label: 'Ishchi o\'rinlari' },
];

const advantages = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    title: 'Noyob ranglar va teksturalar',
    description: "G'ozg'on marmarining oq, pushti va kulrang ranglari dunyoda noyob hisoblanadi.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Davlat tomonidan qo\'llab-quvvatlash',
    description: 'Erkin iqtisodiy zona maqomi, soliq imtiyozlari va bojxona to\'lovlaridan ozod qilish.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Qulay logistika',
    description: 'Temir yo\'l va avtomobil yo\'llarining yaqinligi, xalqaro bozorlarga tezkor yetkazib berish.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Zamonaviy texnologiyalar',
    description: 'Italiya va Xitoyning eng so\'nggi uskunalari, AI asosida sifat nazorati.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLineJoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Yuqori ROI',
    description: 'O\'rtacha 20-30% yillik daromadlilik va 3-5 yil ichida investitsiyani qoplash.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Malakali ishchi kuchi',
    description: 'Ko\'p yillik tajribaga ega mutaxassislar va doimiy ravishda o\'qitiladigan yosh kadrlar.',
  },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = React.useState(0);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);

          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function HomePage() {
  const [mapLayer, setMapLayer] = React.useState('quarries');

const mapData = {
    quarries: [
      { id: 1, name: "G'ozg'on-1", x: 370, y: 220, reserves: "25 mln m³", type: "Marmar" },
      { id: 2, name: "G'ozg'on-2", x: 340, y: 205, reserves: "18 mln m³", type: "Granit" },
      { id: 3, name: "Ko'kpatas", x: 395, y: 240, reserves: "12 mln m³", type: "Marmar" },
      { id: 4, name: "Zarband", x: 355, y: 265, reserves: "8 mln m³", type: "Travertin" },
      { id: 5, name: "Karmana", x: 410, y: 195, reserves: "15 mln m³", type: "Marmar" },
      { id: 6, name: "Nurota", x: 320, y: 185, reserves: "10 mln m³", type: "Granit" },
    ],
    factories: [
      { id: 1, name: "G'ozg'on Marble Combine", x: 360, y: 230, capacity: "1.2 mln m²/yil", type: "Qayta ishlash" },
      { id: 2, name: "Navoiy Granit Zavodi", x: 200, y: 250, capacity: "800 ming m²/yil", type: "Qayta ishlash" },
      { id: 3, name: "Markaziy	qurilish materiallari", x: 380, y: 215, capacity: "500 ming m²/yil", type: "Qurilish bloklari" },
      { id: 4, name: "Suvenir fabrikasi", x: 350, y: 240, capacity: "100 ming dona/yil", type: "Hunarmandchilik" },
    ],
    railway: [
      { from: { x: 600, y: 200 }, to: { x: 200, y: 250 }, name: "Toshkent-Navoiy" },
      { from: { x: 200, y: 250 }, to: { x: 370, y: 220 }, name: "Navoiy-G'ozg'on" },
      { from: { x: 370, y: 220 }, to: { x: 500, y: 200 }, name: "G'ozg'on-Samarqand" },
    ],
    roads: [
      { from: { x: 600, y: 180 }, to: { x: 370, y: 220 }, name: "M-37 (Toshkent-Termiz)" },
      { from: { x: 370, y: 220 }, to: { x: 500, y: 170 }, name: "A-377 (G'ozg'on-Samarqand)" },
      { from: { x: 200, y: 260 }, to: { x: 370, y: 220 }, name: "A-385 (Navoiy-G'ozg'on)" },
    ],
  };

  const [showInfo, setShowInfo] = React.useState<any>(null);

  return (
    <div className="stone-pattern">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center hero-bg overflow-hidden pt-20">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/3 rounded-full blur-3xl" style={{ animation: 'pulse 4s infinite' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/2 rounded-full blur-3xl" />
        </div>

        <div className="absolute inset-0 opacity-5">
          <div className="marble-texture w-full h-full" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-2 mb-6">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                <span className="text-accent text-sm font-medium">Investitsiya uchun ochiq</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                <span className="text-white">G&apos;ozg&apos;on:</span>
                <br />
                <span className="text-accent">O&apos;zbekistonning</span>
                <br />
                <span className="text-white">Marmar va Granit</span>
                <br />
                <span className="text-accentLight">Yuragi</span>
              </h1>
              <p className="text-gray-400 text-lg mb-8 max-w-lg">
                Dunyoga mashhur G&apos;ozg&apos;on marmar va granit konlariga investitsiya qiling. 
                Yuqori daromadlilik, davlat imtiyozlari va zamonaviy infratuzilma.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/investment">
                  <Button size="lg">Investitsiya qilish →</Button>
                </Link>
                <Link href="/products">
                  <Button variant="outline" size="lg">Katalogni ko&apos;rish</Button>
                </Link>
              </div>
            </div>

            <div className="hidden lg:block relative">
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent rounded-3xl transform rotate-6" />
                <div className="absolute inset-4 bg-gradient-to-br from-secondary to-primary rounded-3xl border border-accent/20 overflow-hidden">
                  <div className="absolute inset-0 marble-texture opacity-20" />
                  <div className="relative z-10 p-8 h-full flex flex-col justify-center">
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center">
                          <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-accent">12+</div>
                          <div className="text-gray-400 text-sm">Faol konlar</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center">
                          <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-accent">25+</div>
                          <div className="text-gray-400 text-sm">Eksport davlatlari</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center">
                          <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-accent">$500M+</div>
                          <div className="text-gray-400 text-sm">Yillik aylanma</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-gray-500 text-xs">Pastga suring</span>
          <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-primary/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Raqamlarda G&apos;ozg&apos;on</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">G&apos;ozg&apos;on marmar va granit sanoatining ulkan salohiyati raqamlarda</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-secondary/50 border border-accent/10 rounded-2xl p-6 text-center card-hover">
                <div className="w-14 h-14 mx-auto mb-4 bg-accent/10 rounded-xl flex items-center justify-center">
                  <svg className="w-7 h-7 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={index === 0 ? 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' : index === 1 ? 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5' : index === 2 ? 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z' : 'M17 20h5v-2a3 3 0 00-5.356-1M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z'} />
                  </svg>
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-accent stat-counter">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-gray-400 text-sm mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Nima uchun G&apos;ozg&apos;on?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Investitsiya uchun eng qulay sharoitlar va noyob imkoniyatlar</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => (
              <div key={index} className="bg-secondary/30 border border-accent/10 rounded-2xl p-8 card-hover">
                <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6 text-accent">
                  {advantage.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{advantage.title}</h3>
                <p className="text-gray-400">{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-20 bg-primary/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Interaktiv Xarita</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">G&apos;ozg&apos;oning Navoiy viloyatidagi joylashuvi va infratuzilma ob&apos;ektlari</p>
          </div>

          <div className="bg-secondary/30 border border-accent/10 rounded-2xl p-6">
            <div className="flex flex-wrap gap-3 mb-6">
              <button
                className={`filter-btn active text-sm px-4 py-2 rounded-lg border transition-all ${mapLayer === 'quarries' ? 'bg-accent text-dark border-accent' : 'border-accent/30 text-gray-400 hover:border-accent/60'}`}
                onClick={() => setMapLayer('quarries')}
              >
                ⛏ Konlar ({mapData.quarries.length})
              </button>
              <button
                className={`filter-btn text-sm px-4 py-2 rounded-lg border transition-all ${mapLayer === 'factories' ? 'bg-accent text-dark border-accent' : 'border-accent/30 text-gray-400 hover:border-accent/60'}`}
                onClick={() => setMapLayer('factories')}
              >
                🏭 Sexlar ({mapData.factories.length})
              </button>
              <button
                className={`filter-btn text-sm px-4 py-2 rounded-lg border transition-all ${mapLayer === 'railway' ? 'bg-accent text-dark border-accent' : 'border-accent/30 text-gray-400 hover:border-accent/60'}`}
                onClick={() => setMapLayer('railway')}
              >
                🚂 Temir yo'l
              </button>
              <button
                className={`filter-btn text-sm px-4 py-2 rounded-lg border transition-all ${mapLayer === 'roads' ? 'bg-accent text-dark border-accent' : 'border-accent/30 text-gray-400 hover:border-accent/60'}`}
                onClick={() => setMapLayer('roads')}
              >
                🛣 Avtomobil yo'llari
              </button>
              <button
                className={`filter-btn text-sm px-4 py-2 rounded-lg border transition-all ${mapLayer === 'all' ? 'bg-accent text-dark border-accent' : 'border-accent/30 text-gray-400 hover:border-accent/60'}`}
                onClick={() => setMapLayer('all')}
              >
                👁 Barchasi
              </button>
            </div>

            <div className="relative bg-dark/50 rounded-xl overflow-hidden" style={{ height: '550px' }}>
              <svg viewBox="0 0 800 500" className="w-full h-full">
                {/* O'zbekiston xaritasi */}
                <path className="map-region" d="M100,150 L150,120 L200,100 L280,80 L360,70 L450,65 L550,70 L650,90 L720,130 L750,180 L740,240 L700,300 L620,340 L520,360 L420,380 L320,390 L230,370 L160,330 L120,270 L90,210 Z" />

                {/* Navoiy viloyati */}
                <path style={{ fill: 'rgba(201,168,76,0.15)', stroke: '#c9a84c', strokeWidth: 2 }} d="M200,180 L280,160 L350,150 L400,170 L420,230 L380,290 L300,310 L230,290 L190,250 L180,210 Z" />

                {/* Shahar va towns */}
                <circle cx="600" cy="200" r="4" fill="#94a3b8" />
                <text x="600" y="225" textAnchor="middle" fill="#94a3b8" fontSize="11">Toshkent</text>

                <circle cx="180" cy="250" r="4" fill="#94a3b8" />
                <text x="180" y="275" textAnchor="middle" fill="#94a3b8" fontSize="11">Navoiy</text>

                <circle cx="500" cy="170" r="4" fill="#94a3b8" />
                <text x="500" y="150" textAnchor="middle" fill="#94a3b8" fontSize="11">Samarqand</text>

                <circle cx="370" cy="220" r="6" fill="#c9a84c" className="animate-pulse" />
                <circle cx="370" cy="220" r="3" fill="#fff" />
                <text x="370" y="198" textAnchor="middle" fill="#c9a84c" fontSize="14" fontWeight="bold">G'ozg'on</text>

                {/* Railway */}
                {(mapLayer === 'railway' || mapLayer === 'all') && (
                  <g>
                    <line x1="180" y1="250" x2="370" y2="220" stroke="#10b981" strokeWidth="2" strokeDasharray="6,3" opacity="0.7" />
                    <line x1="370" y1="220" x2="500" y2="170" stroke="#10b981" strokeWidth="2" strokeDasharray="6,3" opacity="0.7" />
                    <line x1="600" y1="200" x2="180" y2="250" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4,2" opacity="0.4" />
                    <circle cx="180" cy="250" r="3" fill="#10b981" />
                    <text x="180" y="290" textAnchor="middle" fill="#10b981" fontSize="9">Temiryo'l st.</text>
                  </g>
                )}

                {/* Roads */}
                {(mapLayer === 'roads' || mapLayer === 'all') && (
                  <g>
                    <line x1="600" y1="180" x2="370" y2="220" stroke="#f59e0b" strokeWidth="2.5" opacity="0.7" />
                    <line x1="370" y1="220" x2="500" y2="155" stroke="#f59e0b" strokeWidth="2" opacity="0.6" />
                    <line x1="180" y1="265" x2="370" y2="220" stroke="#f59e0b" strokeWidth="2" opacity="0.6" />
                    <text x="480" y="190" textAnchor="middle" fill="#f59e0b" fontSize="8" opacity="0.7">M-37</text>
                    <text x="420" y="185" textAnchor="middle" fill="#f59e0b" fontSize="8" opacity="0.7">A-377</text>
                  </g>
                )}

                {/* Quarries */}
                {(mapLayer === 'quarries' || mapLayer === 'all') && (
                  <g>
                    {mapData.quarries.map((q) => (
                      <g key={q.id} className="cursor-pointer" onClick={() => setShowInfo(q)}>
                        <circle cx={q.x} cy={q.y} r="8" fill="#ef4444" opacity="0.9" className="animate-pulse" />
                        <circle cx={q.x} cy={q.y} r="4" fill="#fff" />
                        <text x={q.x} y={q.y - 15} textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="bold">{q.name}</text>
                      </g>
                    ))}
                  </g>
                )}

                {/* Factories */}
                {(mapLayer === 'factories' || mapLayer === 'all') && (
                  <g>
                    {mapData.factories.map((f) => (
                      <g key={f.id} className="cursor-pointer" onClick={() => setShowInfo(f)}>
                        <circle cx={f.x} cy={f.y} r="7" fill="#3b82f6" opacity="0.9" />
                        <circle cx={f.x} cy={f.y} r="3" fill="#fff" />
                        <text x={f.x} y={f.y - 12} textAnchor="middle" fill="#3b82f6" fontSize="9" fontWeight="bold">{f.name}</text>
                      </g>
                    ))}
                  </g>
                )}

                {/* Legend */}
                <g transform="translate(20, 420)">
                  <rect x="0" y="0" width="180" height="70" fill="rgba(0,0,0,0.5)" rx="5" />
                  <circle cx="15" cy="20" r="5" fill="#ef4444" />
                  <text x="28" y="24" fill="#94a3b8" fontSize="10">Marmar/Granit konlari</text>
                  <circle cx="15" cy="40" r="5" fill="#3b82f6" />
                  <text x="28" y="44" fill="#94a3b8" fontSize="10">Qayta ishlash sexlari</text>
                  <line x1="8" y1="55" x2="22" y2="55" stroke="#10b981" strokeWidth="2" />
                  <text x="28" y="59" fill="#94a3b8" fontSize="10">Temir yo'l</text>
                </g>
              </svg>

              {/* Info Panel */}
              {showInfo && (
                <div className="absolute top-4 right-4 bg-secondary/90 backdrop-blur border border-accent/30 rounded-xl p-4 min-w-[200px]">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-white">{showInfo.name}</h4>
                    <button onClick={() => setShowInfo(null)} className="text-gray-400 hover:text-white">✕</button>
                  </div>
                  {'reserves' in showInfo && (
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between"><span className="text-gray-400">Zaxira:</span><span className="text-accent">{showInfo.reserves}</span></div>
                      <div className="flex justify-between"><span className="text-gray-400">Turi:</span><span className="text-white">{showInfo.type}</span></div>
                    </div>
                  )}
                  {'capacity' in showInfo && (
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between"><span className="text-gray-400">Quvvat:</span><span className="text-accent">{showInfo.capacity}</span></div>
                      <div className="flex justify-between"><span className="text-gray-400">Turi:</span><span className="text-white">{showInfo.type}</span></div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-gradient-to-r from-accent/20 via-accent/10 to-accent/20 border border-accent/20 rounded-3xl p-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Investitsiya qilishga tayyormisiz?</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">Bizning mutaxassislarimiz sizga eng yaxshi investitsiya imkoniyatlarini topishda yordam beradi.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/investment">
                <Button size="lg">Loyihalarni ko&apos;rish</Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg">Bog&apos;lanish</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}