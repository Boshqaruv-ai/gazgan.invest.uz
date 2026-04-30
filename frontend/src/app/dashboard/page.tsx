'use client';

import * as React from 'react';
import {
  DashboardStats,
  DashboardProjects,
  DashboardDocuments,
  DashboardChatHistory,
  DashboardNotifications,
  PortfolioChart,
  useDashboard,
} from '@/features/dashboard';

type TabKey = 'overview' | 'projects' | 'documents' | 'chat' | 'notifications';

const tabs: Array<{ key: TabKey; label: string }> = [
  { key: 'overview', label: "Umumiy ko'rinish" },
  { key: 'projects', label: 'Loyihalar' },
  { key: 'documents', label: 'Hujjatlar' },
  { key: 'chat', label: 'AI tarixi' },
  { key: 'notifications', label: 'Bildirishnomalar' },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = React.useState<TabKey>('overview');
  const { data, loading } = useDashboard();

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-20 hero-bg flex items-center justify-center">
        <div className="text-white text-xl">Yuklanmoqda...</div>
      </div>
    );
  }

  const userName = data?.user?.name || 'Demo investor';

  return (
    <div className="min-h-screen pt-24 pb-20 hero-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 rounded-2xl border border-accent/20 bg-accent/10 p-4 text-sm text-accent">
          Demo kabinet: MVP bosqichida login, saqlangan loyihalar va hujjat yuklash backendga ulanmagan.
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Investor kabineti demo</h1>
          <p className="text-gray-400">Xush kelibsiz, {userName}.</p>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${
                activeTab === tab.key
                  ? 'bg-accent text-dark font-semibold'
                  : 'bg-secondary/30 text-gray-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <>
            <DashboardStats />
            <PortfolioChart />
          </>
        )}
        {activeTab === 'projects' && <DashboardProjects />}
        {activeTab === 'documents' && <DashboardDocuments />}
        {activeTab === 'chat' && <DashboardChatHistory />}
        {activeTab === 'notifications' && <DashboardNotifications />}
      </div>
    </div>
  );
}
