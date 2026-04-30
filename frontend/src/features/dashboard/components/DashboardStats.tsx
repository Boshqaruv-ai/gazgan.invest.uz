'use client';

import { useEffect, useState } from 'react';
import { useDashboard, formatAmount } from '../hooks/useDashboard';

function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 900;
    const steps = 24;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{displayValue}{suffix}</span>;
}

export function DashboardStats() {
  const { data } = useDashboard();
  const stats = data?.stats || { savedProjects: 0, documents: 0, aiConsultations: 0, notifications: 0 };

  const statCards = [
    { key: 'savedProjects', label: 'Demo loyihalar' },
    { key: 'documents', label: 'Demo hujjatlar' },
    { key: 'aiConsultations', label: 'AI maslahatlar' },
    { key: 'notifications', label: 'Bildirishnomalar' },
  ] as const;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {statCards.map((stat) => (
        <div
          key={stat.key}
          className="bg-secondary/20 border border-white/5 rounded-2xl p-5 hover:border-accent/30 transition-all"
        >
          <div className="text-3xl font-bold text-white mb-1">
            <AnimatedNumber value={stats[stat.key]} />
          </div>
          <div className="text-gray-500 text-sm">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}

export function PortfolioChart() {
  const { data } = useDashboard();
  const projects = data?.projects || [];

  const totalInvestment = projects.reduce((sum, project) => sum + project.amount, 0);
  const avgROI = projects.length > 0 ? projects.reduce((sum, project) => sum + project.roi, 0) / projects.length : 0;

  return (
    <div className="grid lg:grid-cols-3 gap-6 mb-8">
      <div className="lg:col-span-2 bg-secondary/20 border border-white/5 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-white">Demo portfel tahlili</h3>
          <span className="text-accent text-sm">Statik</span>
        </div>

        <div className="space-y-4">
          {projects.map((project) => (
            <div key={project.id} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">{project.name}</span>
                <span className="text-white font-medium">{formatAmount(project.amount)}</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-accent to-accent/70 rounded-full"
                  style={{ width: `${totalInvestment ? (project.amount / totalInvestment) * 100 : 0}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/5">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{formatAmount(totalInvestment)}</div>
            <div className="text-gray-500 text-xs mt-1">Jami miqdor</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">{avgROI.toFixed(0)}%</div>
            <div className="text-gray-500 text-xs mt-1">Ortacha ROI</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">{projects.length}</div>
            <div className="text-gray-500 text-xs mt-1">Ssenariylar</div>
          </div>
        </div>
      </div>

      <div className="bg-secondary/20 border border-white/5 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">ROI namunasi</h3>
        <div className="space-y-3">
          {[
            { label: '1 yil', value: 22 },
            { label: '2 yil', value: 25 },
            { label: '3 yil', value: 28 },
            { label: '5 yil', value: 35 },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <span className="text-gray-500 text-sm w-12">{item.label}</span>
              <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full"
                  style={{ width: `${(item.value / 40) * 100}%` }}
                />
              </div>
              <span className="text-green-400 text-sm font-medium w-10">+{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
