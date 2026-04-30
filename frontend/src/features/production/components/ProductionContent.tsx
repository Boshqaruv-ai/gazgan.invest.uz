'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { productionData } from '@/lib/production';

const tabs = ['Sexlar', 'Uskunalar', 'Sifat nazorati'];

export function ProductionStats() {
  const stats = [
    { value: productionData.stats.plants, label: 'Qayta ishlash sexlari' },
    { value: productionData.stats.capacity, label: 'm2 yillik quvvat' },
    { value: `${productionData.stats.machines}+`, label: 'Dastgohlar' },
    { value: `${productionData.stats.quality}%`, label: 'Sifat korsatkichi' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-secondary/30 border border-white/5 rounded-2xl p-6 text-center hover:border-accent/30 hover:bg-secondary/50 transition-all"
        >
          <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
          <div className="text-gray-500 text-sm">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}

export function ProductionTabs() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="mb-12">
      <div className="flex flex-wrap gap-2 mb-8 p-1 bg-secondary/30 rounded-xl w-fit">
        {tabs.map((tab, index) => (
          <button
            key={tab}
            onClick={() => setActiveTab(index)}
            className={cn(
              'px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300',
              activeTab === index
                ? 'bg-accent text-dark shadow-lg shadow-accent/25'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="min-h-[360px]">
        {activeTab === 0 && <WorkshopsView />}
        {activeTab === 1 && <EquipmentView />}
        {activeTab === 2 && <QualityView />}
      </div>
    </div>
  );
}

function WorkshopsView() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {productionData.lines.map((line) => (
        <div
          key={line.id}
          className="relative bg-secondary/20 border border-white/5 rounded-2xl p-6 transition-all duration-300 hover:border-accent/30 hover:bg-secondary/40"
        >
          <div className="flex items-start justify-between mb-4 gap-4">
            <div>
              <h3 className="text-lg font-bold text-white">{line.name}</h3>
              <p className="text-accent font-semibold">{line.capacity}/yil</p>
            </div>
          </div>

          <p className="text-gray-400 text-sm mb-4">{line.description}</p>

          <div className="flex flex-wrap gap-2">
            {line.processes.map((process) => (
              <span
                key={process}
                className="px-3 py-1 text-xs font-medium bg-white/5 text-gray-300 rounded-full hover:bg-accent/20 hover:text-accent transition-colors"
              >
                {process}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function EquipmentView() {
  return (
    <div className="bg-secondary/20 border border-white/5 rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-secondary/30">
            <tr>
              <th className="text-left p-4 text-gray-400 font-medium">Uskuna</th>
              <th className="text-left p-4 text-gray-400 font-medium">Ishlab chiqaruvchi</th>
              <th className="text-left p-4 text-gray-400 font-medium">Vazifasi</th>
              <th className="text-center p-4 text-gray-400 font-medium">Soni</th>
            </tr>
          </thead>
          <tbody>
            {productionData.equipment.map((item) => (
              <tr key={item.name} className="border-t border-white/5 hover:bg-white/5 transition-colors">
                <td className="p-4 text-white font-medium">{item.name}</td>
                <td className="p-4 text-gray-400">{item.country}</td>
                <td className="p-4 text-gray-400">{item.task}</td>
                <td className="p-4 text-center">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-accent/20 text-accent font-bold">
                    {item.count}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function QualityView() {
  const quality = productionData.aiQuality;

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="bg-secondary/20 border border-white/5 rounded-2xl p-8">
        <h3 className="text-xl font-bold text-white mb-2">Sifat nazorati</h3>
          <p className="text-gray-400 mb-6">Bu bo&apos;lim ishlab chiqarish sifatini tushuntirish uchun statik MVP ko&apos;rinishida berilgan.</p>
        <div className="space-y-3">
          {['Yoriq va nuqsonlarni aniqlash', 'Rang va tekstura tasnifi', "Olcham aniqligini tekshirish", 'Mahsulotni saralash'].map((feature) => (
            <div key={feature} className="p-3 rounded-xl bg-white/5 text-gray-300">
              {feature}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-secondary/20 border border-white/5 rounded-2xl p-8">
        <h3 className="text-xl font-bold text-white mb-6">Namuna statistikasi</h3>
        <div className="space-y-6">
          {[
            { label: 'Yuqori sifat (A)', value: quality.gradeA, color: 'from-emerald-500 to-green-500' },
            { label: 'Ortacha sifat (B)', value: quality.gradeB, color: 'from-yellow-500 to-amber-500' },
            { label: 'Past sifat (C)', value: quality.gradeC, color: 'from-red-500 to-rose-500' },
          ].map((item) => (
            <div key={item.label}>
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">{item.label}</span>
                <span className="text-accent font-bold">{item.value}%</span>
              </div>
              <div className="h-3 bg-secondary rounded-full overflow-hidden">
                <div
                  className={cn('h-full bg-gradient-to-r rounded-full', item.color)}
                  style={{ width: `${item.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProductionContent() {
  return (
    <>
      <ProductionStats />
      <ProductionTabs />
    </>
  );
}
