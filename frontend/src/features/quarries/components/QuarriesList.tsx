'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/Card';
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
  const { filter, setFilter, sort, setSort, quarries } = useQuarries();

  return (
    <>
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <button
          onClick={() => setFilter('all')}
          className={`tab-btn ${filter === 'all' ? 'active' : ''}`}
        >
          Barchasi
        </button>
        <button
          onClick={() => setFilter('Marmar')}
          className={`tab-btn ${filter === 'Marmar' ? 'active' : ''}`}
        >
          Marmar
        </button>
        <button
          onClick={() => setFilter('Granit')}
          className={`tab-btn ${filter === 'Granit' ? 'active' : ''}`}
        >
          Granit
        </button>

        <select
          value={sort}
          onChange={(event) => setSort(event.target.value)}
          className="bg-secondary/50 text-gray-300 text-sm px-4 py-2 rounded-lg border border-accent/20"
        >
          <option value="name">Nom bo&apos;yicha</option>
          <option value="reserves">Zaxira bo&apos;yicha</option>
        </select>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {quarries.map((quarry) => (
          <Card key={quarry.id} hover className="overflow-hidden">
            <div className="relative h-40 overflow-hidden bg-dark">
              <Image
                src={quarry.image}
                alt={quarry.imageAlt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent" />
            </div>
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs font-bold px-2 py-0.5 rounded ${quarry.type === 'Marmar' ? 'bg-blue-500' : 'bg-red-500'} text-white`}>
                  {quarry.type}
                </span>
                <span className="text-xs text-gray-500">{quarry.color}</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">{quarry.name}</h3>
              <p className="text-gray-400 text-sm mb-3 line-clamp-2">{quarry.description}</p>
              <div className="space-y-1 mb-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Indikativ zaxira:</span>
                  <span className="text-accent font-semibold">{quarry.reserves}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Zichlik:</span>
                  <span className="text-white">{quarry.density}</span>
                </div>
              </div>
              <Link href={`/quarries/${quarry.slug}`}>
                <button className="btn-outline w-full text-sm py-2">Batafsil -&gt;</button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
