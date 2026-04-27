'use client';

import * as React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';

const quarries = [
  {
    id: 'gozgon-oq',
    name: "G'ozg'on Oq Marmar Koni",
    type: 'marble',
    colors: ['Oq', 'Pushti'],
    reserves: 85,
    density: 2.7,
    location: "Navoiy viloyati, G'ozg'on shahri",
    description: "Navoiy viloyati, G'ozg'on shahri yaqinida joylashgan asosiy marmar koni.",
  },
  {
    id: 'gozgon-pushti',
    name: "G'ozg'on Pushti Marmar Koni",
    type: 'marble',
    colors: ['Pushti'],
    reserves: 42,
    density: 2.65,
    location: "Navoiy viloyati, G'ozg'on tumani",
    description: "Noyob pushti rangdagi marmar koni. Dunyoda eng kam uchraydigan turlardan biri.",
  },
  {
    id: 'gozgon-granit',
    name: "G'ozg'on Granit Koni",
    type: 'granite',
    colors: ['Kulrang', 'Qora'],
    reserves: 120,
    density: 2.8,
    location: "Navoiy viloyati, G'ozg'on shahri",
    description: "Yuqori sifatli kulrang va qora granit koni. Qurilish va bezak uchun ideal.",
  },
  {
    id: 'kulrang',
    name: "Kulrang Marmar Koni",
    type: 'marble',
    colors: ['Kulrang'],
    reserves: 35,
    density: 2.68,
    location: "Navoiy viloyati, Karmana tumani",
    description: "Zamonaviy arxitekturada mashhur bo'lgan kulrang marmar turi.",
  },
  {
    id: 'qizil-granit',
    name: "Qizil Granit Koni",
    type: 'granite',
    colors: ['Qizil'],
    reserves: 28,
    density: 2.75,
    location: "Navoiy viloyati, Navoiy tumani",
    description: "Noyob qizil rangdagi granit. Monumental qurilish uchun ideal material.",
  },
  {
    id: 'oltin-marmar',
    name: "Oltin Marmar Koni",
    type: 'marble',
    colors: ['Oltin'],
    reserves: 15,
    density: 2.72,
    location: "Navoiy viloyati, G'ozg'on shahri",
    description: "Hashamatli interyerlar uchun oltin rangdagi noyob marmar.",
  },
];

export default function QuarriesPage() {
  const [filter, setFilter] = React.useState('all');

  const filteredQuarries = filter === 'all' 
    ? quarries 
    : quarries.filter(q => q.type === filter);

  return (
    <div className="min-h-screen pt-24 pb-20 hero-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 pt-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Konlar va Zaxiralar</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            G&apos;ozg&apos;oning boy marmar va granit konlari haqida batafsil ma&apos;lumot
          </p>
        </div>

        {/* Filters */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setFilter('all')}
            className={`tab-btn ${filter === 'all' ? 'active' : ''}`}
          >
            Barchasi
          </button>
          <button
            onClick={() => setFilter('marble')}
            className={`tab-btn ${filter === 'marble' ? 'active' : ''}`}
          >
            Marmar
          </button>
          <button
            onClick={() => setFilter('granite')}
            className={`tab-btn ${filter === 'granite' ? 'active' : ''}`}
          >
            Granit
          </button>
        </div>

        {/* Quarry Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredQuarries.map((quarry) => (
            <Card key={quarry.id} hover className="overflow-hidden">
              <div className={`h-48 relative overflow-hidden ${
                quarry.type === 'marble' 
                  ? 'bg-gradient-to-br from-gray-200 to-gray-300' 
                  : 'bg-gradient-to-br from-gray-500 to-gray-700'
              }`}>
                <div className="absolute top-4 right-4 bg-accent text-primary text-xs font-bold px-3 py-1 rounded-full">
                  {quarry.type === 'marble' ? 'Marmar' : 'Granit'}
                </div>
                <div className="absolute bottom-4 left-4 flex gap-2">
                  {quarry.colors.map(color => (
                    <span key={color} className="bg-dark/70 text-white text-xs px-2 py-1 rounded">
                      {color}
                    </span>
                  ))}
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{quarry.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{quarry.description}</p>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Zaxira:</span>
                    <span className="text-accent font-semibold">{quarry.reserves} mln m³</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Zichlik:</span>
                    <span className="text-white">{quarry.density} g/sm³</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Joylashuv:</span>
                    <span className="text-white text-right">{quarry.location}</span>
                  </div>
                </div>
                <Link href={`/quarries/${quarry.id}`}>
                  <button className="btn-outline w-full text-sm py-2">Batafsil →</button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}