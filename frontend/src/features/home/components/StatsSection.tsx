'use client';

import { statistics } from '@/lib/data';

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix: string }) {
  return <span>{target}{suffix}</span>;
}

export function StatsSection() {
  return (
    <section className="py-20 bg-primary/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Raqamlarda G&apos;ozg&apos;on</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">MVP katalogidagi mahsulot, kon va investitsiya ssenariylari</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {statistics.map((stat, index) => (
            <div key={index} className="bg-secondary/50 border border-accent/10 rounded-2xl p-6 text-center card-hover">
              <div className="w-14 h-14 mx-auto mb-4 bg-accent/10 rounded-xl flex items-center justify-center">
                <svg className="w-7 h-7 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={index === 0 ? 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' : index === 1 ? 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5' : index === 2 ? 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z' : 'M17 20h5v-2a3 3 0 00-5.356-1M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z'} />
                </svg>
              </div>
              <div className="text-3xl lg:text-4xl font-bold text-accent">
                {stat.value}{stat.suffix}
              </div>
              <div className="text-gray-400 text-sm mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
