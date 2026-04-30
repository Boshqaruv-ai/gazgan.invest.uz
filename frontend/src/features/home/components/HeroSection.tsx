'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { heroStats } from '@/lib/data';

const heroImage = 'https://images.unsplash.com/photo-1573156667488-5c0cec674762?auto=format&fit=crop&w=1800&q=80';

export function HeroSection() {
  return (
    <section
      className="relative min-h-[82vh] flex items-center overflow-hidden pt-20"
      style={{
        backgroundImage: `linear-gradient(90deg, rgba(10,10,20,0.9) 0%, rgba(10,10,20,0.72) 42%, rgba(10,10,20,0.28) 100%), url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-primary/20" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-2 mb-6">
            <div className="w-2 h-2 bg-accent rounded-full" />
            <span className="text-accent text-sm font-medium">MVP investitsiya portali</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white">
            G&apos;ozg&apos;on Invest Portal
          </h1>

          <p className="text-gray-200 text-lg mb-8 max-w-2xl">
            Marmar va granit mahsulotlari, konlar, taxminiy investitsiya ssenariylari va tezkor aloqa uchun yengil web portal.
          </p>

          <div className="flex flex-wrap gap-4 mb-10">
            <Link href="/investment">
              <Button size="lg">Investitsiyani ko&apos;rish</Button>
            </Link>
            <Link href="/about#contact">
              <Button variant="outline" size="lg">Aloqa qilish</Button>
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-3 max-w-xl">
            {heroStats.map((stat) => (
              <div key={stat.label} className="border border-white/10 bg-primary/45 backdrop-blur-sm rounded-xl p-4">
                <div className="text-2xl font-bold text-accent">{stat.value}</div>
                <div className="text-gray-300 text-xs sm:text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
