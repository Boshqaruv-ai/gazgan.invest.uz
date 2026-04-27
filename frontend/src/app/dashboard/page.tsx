'use client';

import * as React from 'react';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const mockData = {
  user: { name: "Aziz", role: "investor" },
  stats: {
    savedProjects: 3,
    documents: 7,
    aiConsultations: 12,
    notifications: 5
  },
  projects: [
    {
      id: 1,
      name: "Yangi granit qayta ishlash sexi",
      amount: 5000000,
      roi: 25,
      payback: 4,
      status: "Ko'rib chiqilmoqda"
    },
    {
      id: 2,
      name: "Marmar bloklar eksport liniyasi",
      amount: 3000000,
      roi: 22,
      payback: 5,
      status: "Tasdiqlangan"
    },
    {
      id: 3,
      name: "Suvenir ishlab chiqarish fabrikasi",
      amount: 1500000,
      roi: 30,
      payback: 3,
      status: "Yangi"
    }
  ],
  documents: [
    { id: 1, name: "EIZ rezidentligi uchun ariza", date: "2026-01-15", icon: "📄" },
    { id: 2, name: "Biznes-reja namunasi", date: "2026-01-10", icon: "📋" },
    { id: 3, name: "Investitsiya shartnomasi loyihasi", date: "2026-01-08", icon: "📊" },
    { id: 4, name: "Moliyaviy hisobot shabloni", date: "2026-01-05", icon: "📈" },
  ],
  chatHistory: [
    { id: 1, question: "G'ozg'on marmarining asosiy turlari qaysilar?", time: "2 soat oldin", answer: "G'ozg'on marmarining asosiy turlari: oq, pushti, kulrang va oltin marmarlar. Har bir tur o'ziga xos tekstura va fizik xususiyatlarga ega." },
    { id: 2, question: "EIZ rezidenti bo'lish uchun qanday hujjatlar kerak?", time: "1 soat oldin", answer: "EIZ rezidenti bo'lish uchun quyidagi hujjatlar kerak: 1) Ariza, 2) Biznes-reja, 3) Ta'sis hujjatlari, 4) Investitsiya loyihasi tavsifi." },
  ],
  notifications: [
    { id: 1, text: "Yangi investitsiya loyihasi qo'shildi", time: "30 daqiqa oldin", icon: "📢" },
    { id: 2, text: "Hujjatingiz tasdiqlandi", time: "2 soat oldin", icon: "📄" },
    { id: 3, text: "Hujjat topshirish muddati yaqinlashmoqda", time: "1 kun oldin", icon: "⚠️" },
    { id: 4, text: "Yangi xabar AI Konsultantdan", time: "2 kun oldin", icon: "🤖" },
  ]
};

function useDashboardData() {
  const [data, setData] = React.useState<typeof mockData | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchDashboard() {
      try {
        const res = await fetch(`${API_URL}/api/dashboard`);
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.log('Backend not available, using fallback data');
        setData(mockData);
      } finally {
        setLoading(false);
      }
    }
    fetchDashboard();
  }, []);

  return { data, loading };
}

const formatAmount = (amount: number) => {
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M`;
  }
  return `$${(amount / 1000).toFixed(0)}K`;
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Ko'rib chiqilmoqda": return "bg-yellow-500/20 text-yellow-400";
    case "Tasdiqlangan": return "bg-green-500/20 text-green-400";
    case "Yangi": return "bg-blue-500/20 text-blue-400";
    default: return "bg-gray-500/20 text-gray-400";
  }
};

export default function DashboardPage() {
  const [activeTab, setActiveTab] = React.useState<'projects' | 'documents' | 'chat' | 'notifications'>('projects');
  const { data, loading } = useDashboardData();

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-20 hero-bg flex items-center justify-center">
        <div className="text-white text-xl">Yuklanmoqda...</div>
      </div>
    );
  }

  const userName = data?.user?.name || "Aziz";
  const stats = data?.stats || mockData.stats;
  const projects = data?.projects || mockData.projects;
  const documents = data?.documents || mockData.documents;
  const chatHistory = data?.chatHistory || mockData.chatHistory;
  const notifications = data?.notifications || mockData.notifications;

  return (
    <div className="min-h-screen pt-24 pb-20 hero-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Investor Kabineti
          </h1>
          <p className="text-gray-400">
            Xush kelibsiz, {userName} investor!
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-secondary/30 border border-accent/10 rounded-xl p-4">
            <div className="text-3xl font-bold text-accent">{stats.savedProjects}</div>
            <div className="text-gray-400 text-sm">Saqlangan loyihalar</div>
          </div>
          <div className="bg-secondary/30 border border-accent/10 rounded-xl p-4">
            <div className="text-3xl font-bold text-accent">{stats.documents}</div>
            <div className="text-gray-400 text-sm">Yuklangan hujjatlar</div>
          </div>
          <div className="bg-secondary/30 border border-accent/10 rounded-xl p-4">
            <div className="text-3xl font-bold text-accent">{stats.aiConsultations}</div>
            <div className="text-gray-400 text-sm">AI maslahatlar</div>
          </div>
          <div className="bg-secondary/30 border border-accent/10 rounded-xl p-4">
            <div className="text-3xl font-bold text-accent">{stats.notifications}</div>
            <div className="text-gray-400 text-sm">Bildirishnomalar</div>
          </div>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto">
          {[
            { key: 'projects', label: 'Saqlangan loyihalar', icon: '📁' },
            { key: 'documents', label: 'Hujjatlar', icon: '📄' },
            { key: 'chat', label: 'AI Konsultant tarixi', icon: '💬' },
            { key: 'notifications', label: 'Bildirishnomalar', icon: '🔔' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${
                activeTab === tab.key
                  ? 'bg-accent text-dark font-semibold'
                  : 'bg-secondary/30 text-gray-400 hover:text-white'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'projects' && (
          <div className="space-y-4">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-secondary/30 border border-accent/10 rounded-xl p-6"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-white">{project.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                    </div>
                    <div className="flex gap-4 text-sm text-gray-400">
                      <span>{formatAmount(project.amount)}</span>
                      <span>•</span>
                      <span>{project.roi}% ROI</span>
                      <span>•</span>
                      <span>{project.payback} yil</span>
                    </div>
                  </div>
                  <button className="btn-primary text-sm py-2 px-4">
                    Batafsil →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="bg-secondary/30 border border-accent/10 rounded-xl p-6">
            <div className="space-y-3">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-4 bg-dark/50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{doc.icon}</span>
                    <div>
                      <div className="text-white font-medium">{doc.name}</div>
                      <div className="text-gray-500 text-sm">Yuklangan: {doc.date}</div>
                    </div>
                  </div>
                  <button className="text-accent hover:text-accent/80 text-sm">
                    Yuklab olish
                  </button>
                </div>
              ))}
            </div>
            <button className="mt-4 w-full py-3 border-2 border-dashed border-accent/30 rounded-lg text-gray-400 hover:border-accent hover:text-accent transition-colors">
              + Yangi hujjat yuklash
            </button>
          </div>
        )}

        {activeTab === 'chat' && (
          <div className="space-y-4">
            {chatHistory.map((chat) => (
              <div
                key={chat.id}
                className="bg-secondary/30 border border-accent/10 rounded-xl p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center text-accent font-bold">
                    S
                  </div>
                  <div className="flex-1">
                    <div className="text-gray-400 text-sm mb-2">{chat.time}</div>
                    <div className="text-white mb-3">{chat.question}</div>
                  </div>
                </div>
                <div className="flex items-start gap-4 mt-4">
                  <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-dark font-bold">
                    AI
                  </div>
                  <div className="flex-1">
                    <div className="text-gray-400 text-sm mb-2">AI Konsultant • {chat.time}</div>
                    <div className="text-gray-300">{chat.answer}</div>
                    <button className="text-accent text-sm mt-2 hover:underline">
                      Batafsil →
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <Link
              href="/chat"
              className="block text-center py-4 bg-accent text-dark font-semibold rounded-xl hover:bg-accent/90 transition-colors"
            >
              Yangi savol berish
            </Link>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-3">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                className="bg-secondary/30 border border-accent/10 rounded-xl p-4 flex items-center gap-4"
              >
                <span className="text-2xl">{notif.icon}</span>
                <div className="flex-1">
                  <div className="text-white">{notif.text}</div>
                  <div className="text-gray-500 text-sm">{notif.time}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}