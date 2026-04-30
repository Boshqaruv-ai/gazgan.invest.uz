'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Gauge, MapPin, Mountain } from 'lucide-react';
import { Reveal } from '@/components/marketing';
import { Button } from '@/components/ui/Button';
import { quarries } from '@/lib/quarries';

export function useQuarries() {
  const [filter, setFilter] = React.useState('all');
  const [sort, setSort] = React.useState('name');

  const filteredQuarries = filter === 'all'
    ? quarries
    : quarries.filter((quarry) => quarry.type === filter);

  const sorted = [...filteredQuarries].sort((a, b) => {
    if (sort === 'name') return a.name.localeCompare(b.name);
    if (sort === 'reserves') return parseInt(b.reserves, 10) - parseInt(a.reserves, 10);
    return 0;
  });

  return { filter, setFilter, sort, setSort, quarries: sorted };
}

export function QuarriesList() {
  const { filter, setFilter, sort, setSort, quarries: visibleQuarries } = useQuarries();

  return (
    <section>
      <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {['all', 'Marmar', 'Granit'].map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`tab-btn ${filter === item ? 'active' : ''}`}
            >
              {item === 'all' ? 'Barchasi' : item}
            </button>
          ))}
        </div>

        <select value={sort} onChange={(event) => setSort(event.target.value)} className="input-field sm:w-64">
          <option value="name">Nom bo‘yicha</option>
          <option value="reserves">Zaxira bo‘yicha</option>
        </select>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {visibleQuarries.map((quarry, index) => (
          <Reveal key={quarry.id} delay={index * 0.04}>
            <article className="glass-card grid overflow-hidden rounded-2xl md:grid-cols-[0.9fr_1.1fr]">
              <div className="relative min-h-64">
                <Image
                  src={quarry.image}
                  alt={quarry.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 34vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/45 px-3 py-1 text-xs font-semibold text-copy backdrop-blur">
                  {quarry.type}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold tracking-tight text-copy">{quarry.name}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{quarry.description}</p>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                    <Mountain className="mb-2 h-4 w-4 text-accent" />
                    <div className="text-xs text-muted">Zaxira</div>
                    <div className="mt-1 text-sm font-bold text-copy">{quarry.reserves}</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                    <Gauge className="mb-2 h-4 w-4 text-accent" />
                    <div className="text-xs text-muted">Zichlik</div>
                    <div className="mt-1 text-sm font-bold text-copy">{quarry.density}</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                    <MapPin className="mb-2 h-4 w-4 text-accent" />
                    <div className="text-xs text-muted">Hudud</div>
                    <div className="mt-1 text-sm font-bold text-copy">{quarry.color}</div>
                  </div>
                </div>

                <Link href={`/quarries/${quarry.slug}`}>
                  <Button className="mt-6 w-full">
                    Kon ma’lumotlari
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
