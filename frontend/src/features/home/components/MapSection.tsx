'use client';

import * as React from 'react';
import { mapData } from '@/lib/data';

export type MapLayer = 'quarries' | 'factories' | 'railway' | 'roads' | 'all';

const layerButtons: Array<{ key: MapLayer; label: string }> = [
  { key: 'quarries', label: 'Konlar' },
  { key: 'factories', label: 'Sexlar' },
  { key: 'railway', label: "Temir yo'l" },
  { key: 'roads', label: "Avtomobil yo'llari" },
  { key: 'all', label: 'Barchasi' },
];

export function MapSection() {
  const [mapLayer, setMapLayer] = React.useState<MapLayer>('quarries');
  const [showInfo, setShowInfo] = React.useState<{ name: string; reserves?: string; capacity?: string; type: string } | null>(null);

  return (
    <section className="py-20 bg-primary/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">G&apos;ozg&apos;on konlari xaritasi</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Soddalashtirilgan joylashuv va logistika diagrammasi</p>
        </div>

        <div className="bg-secondary/30 border border-accent/10 rounded-2xl p-6">
          <div className="flex flex-wrap gap-3 mb-6">
            {layerButtons.map((button) => (
              <button
                key={button.key}
                className={`filter-btn text-sm px-4 py-2 rounded-lg border transition-all ${mapLayer === button.key ? 'bg-accent text-dark border-accent' : 'border-accent/30 text-gray-400 hover:border-accent/60'}`}
                onClick={() => setMapLayer(button.key)}
              >
                {button.label}
              </button>
            ))}
          </div>

          <div className="relative bg-dark/50 rounded-xl overflow-hidden h-[300px] sm:h-[400px] lg:h-[500px]">
            <svg viewBox="0 0 500 400" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id="gozgonArea" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(201,168,76,0.1)" />
                  <stop offset="100%" stopColor="rgba(201,168,76,0.05)" />
                </linearGradient>
              </defs>

              <rect width="500" height="400" fill="#0f0f1a" />
              <ellipse cx="250" cy="200" rx="180" ry="140" fill="url(#gozgonArea)" stroke="#c9a84c" strokeWidth="2" strokeDasharray="8,4" opacity="0.6" />

              <text x="250" y="30" textAnchor="middle" fill="#c9a84c" fontSize="14" fontWeight="bold">NAVOIY VILOYATI</text>

              {(mapLayer === 'railway' || mapLayer === 'all') && (
                <g>
                  <line x1="100" y1="280" x2="250" y2="200" stroke="#10b981" strokeWidth="3" strokeDasharray="8,4" opacity="0.8" />
                  <line x1="250" y1="200" x2="400" y2="180" stroke="#10b981" strokeWidth="3" strokeDasharray="8,4" opacity="0.8" />
                  <circle cx="100" cy="280" r="6" fill="#10b981" />
                  <text x="100" y="310" textAnchor="middle" fill="#10b981" fontSize="10">Navoiy</text>
                  <circle cx="400" cy="180" r="6" fill="#10b981" />
                  <text x="400" y="310" textAnchor="middle" fill="#10b981" fontSize="10">Samarqand</text>
                </g>
              )}

              {(mapLayer === 'roads' || mapLayer === 'all') && (
                <g>
                  <line x1="80" y1="250" x2="250" y2="200" stroke="#f59e0b" strokeWidth="3" opacity="0.8" />
                  <line x1="250" y1="200" x2="420" y2="160" stroke="#f59e0b" strokeWidth="3" opacity="0.8" />
                  <text x="420" y="155" textAnchor="middle" fill="#f59e0b" fontSize="9">M-37</text>
                </g>
              )}

              {(mapLayer === 'quarries' || mapLayer === 'all') && (
                <g>
                  {mapData.quarries.map((quarry) => (
                    <g key={quarry.id} onClick={() => setShowInfo(quarry)} className="cursor-pointer">
                      <circle cx={quarry.x} cy={quarry.y} r="16" fill="#ef4444" opacity="0.3" />
                      <circle cx={quarry.x} cy={quarry.y} r="10" fill="#ef4444" opacity="0.9" />
                      <circle cx={quarry.x} cy={quarry.y} r="5" fill="#fff" />
                      <text x={quarry.x} y={quarry.y + 22} textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="bold">{quarry.name}</text>
                    </g>
                  ))}
                </g>
              )}

              {(mapLayer === 'factories' || mapLayer === 'all') && (
                <g>
                  {mapData.factories.map((factory) => (
                    <g key={factory.id} onClick={() => setShowInfo(factory)} className="cursor-pointer">
                      <circle cx={factory.x} cy={factory.y} r="14" fill="#3b82f6" opacity="0.3" />
                      <circle cx={factory.x} cy={factory.y} r="8" fill="#3b82f6" opacity="0.9" />
                      <circle cx={factory.x} cy={factory.y} r="4" fill="#fff" />
                      <text x={factory.x} y={factory.y + 20} textAnchor="middle" fill="#3b82f6" fontSize="9" fontWeight="bold">{factory.name.split(' ')[0]}</text>
                    </g>
                  ))}
                </g>
              )}

              <circle cx="250" cy="200" r="8" fill="#c9a84c" />
              <circle cx="250" cy="200" r="4" fill="#fff" />
              <text x="250" y="185" textAnchor="middle" fill="#c9a84c" fontSize="12" fontWeight="bold">G&apos;ozg&apos;on</text>
            </svg>

            {showInfo && (
              <div className="absolute top-4 right-4 bg-secondary/90 backdrop-blur border border-accent/30 rounded-xl p-4 min-w-[180px]">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-white">{showInfo.name}</h4>
                  <button onClick={() => setShowInfo(null)} className="text-gray-400 hover:text-white ml-2">x</button>
                </div>
                {showInfo.reserves && (
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between"><span className="text-gray-400">Zaxira:</span><span className="text-accent">{showInfo.reserves}</span></div>
                    <div className="flex justify-between"><span className="text-gray-400">Turi:</span><span className="text-white">{showInfo.type}</span></div>
                  </div>
                )}
                {showInfo.capacity && (
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between"><span className="text-gray-400">Quvvat:</span><span className="text-accent">{showInfo.capacity}</span></div>
                    <div className="flex justify-between"><span className="text-gray-400">Turi:</span><span className="text-white">{showInfo.type}</span></div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-4 mt-4 justify-center text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500" />
              <span>Marmar va granit konlari</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-500" />
              <span>Qayta ishlash sexlari</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-green-500" />
              <span>Temir yo&apos;l</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-500" />
              <span>Avtomobil yo&apos;li</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
