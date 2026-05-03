'use client';

import * as React from 'react';
import { Package, Folder, Users, TrendingUp, DollarSign, Activity } from 'lucide-react';

interface Stats {
  totalProducts: number;
  activeProducts: number;
  totalProjects: number;
  activeProjects: number;
  totalUsers: number;
  newUsersToday: number;
  totalInvestment: number;
}

export default function StatsPage() {
  const [stats, setStats] = React.useState<Stats | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/admin/stats');
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading) {
    return <div className="p-4 text-white">Yuklanmoqda...</div>;
  }

  const statCards = [
    { label: 'Mahsulotlar (jami)', value: stats?.totalProducts || 0, icon: <Package size={24} />, color: 'bg-blue-500' },
    { label: 'Faol mahsulotlar', value: stats?.activeProducts || 0, icon: <Activity size={24} />, color: 'bg-green-500' },
    { label: 'Loyihalar (jami)', value: stats?.totalProjects || 0, icon: <Folder size={24} />, color: 'bg-purple-500' },
    { label: 'Faol loyihalar', value: stats?.activeProjects || 0, icon: <TrendingUp size={24} />, color: 'bg-orange-500' },
    { label: 'Foydalanuvchilar', value: stats?.totalUsers || 0, icon: <Users size={24} />, color: 'bg-cyan-500' },
    { label: 'Jami investitsiya', value: `$${((stats?.totalInvestment || 0) / 1000).toFixed(0)}K`, icon: <DollarSign size={24} />, color: 'bg-yellow-500' },
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-white mb-6">Statistika</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {statCards.map((card, index) => (
          <div key={index} className="bg-secondary/30 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className={`p-2 rounded-lg ${card.color}`}>
                {card.icon}
              </div>
              <span className="text-gray-400 text-sm">{card.label}</span>
            </div>
            <p className="text-2xl font-bold text-white">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-secondary/30 rounded-xl p-4">
          <h3 className="text-white font-semibold mb-4">Holat bo'yicha</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Ommabop loyihalar</span>
              <span className="text-white">{(stats?.activeProjects || 0) > 0 ? 'Mavjud' : 'Yo‘q'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Yangi loyihalar</span>
              <span className="text-white">{(stats?.totalProjects || 0) > 0 ? 'Mavjud' : 'Yo‘q'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Moliyalashtirilgan</span>
              <span className="text-green-400">0</span>
            </div>
          </div>
        </div>

        <div className="bg-secondary/30 rounded-xl p-4">
          <h3 className="text-white font-semibold mb-4">Mahsulotlar</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Tanlangan (Featured)</span>
              <span className="text-accent">{(stats?.activeProducts || 0) > 0 ? 'Mavjud' : 'Yo‘q'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Faol mahsulotlar</span>
              <span className="text-white">{stats?.activeProducts || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Nofaol mahsulotlar</span>
              <span className="text-gray-500">{(stats?.totalProducts || 0) - (stats?.activeProducts || 0)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}