'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { LogOut, Folder, FileText, MessageSquare, Bell, BarChart3 } from 'lucide-react';

type TabKey = 'overview' | 'projects' | 'documents' | 'chat' | 'notifications';

const tabs: Array<{ key: TabKey; label: string; icon: React.ReactNode }> = [
  { key: 'overview', label: "Umumiy ko'rinish", icon: <BarChart3 size={18} /> },
  { key: 'projects', label: 'Loyihalar', icon: <Folder size={18} /> },
  { key: 'documents', label: 'Hujjatlar', icon: <FileText size={18} /> },
  { key: 'chat', label: 'AI tarixi', icon: <MessageSquare size={18} /> },
  { key: 'notifications', label: 'Bildirishnomalar', icon: <Bell size={18} /> },
];

export const dynamic = 'force-dynamic';

export default function InvestorPage() {
  const [activeTab, setActiveTab] = React.useState<TabKey>('overview');
  const { data: session } = useSession() || { data: null };
  const pathname = usePathname();

  const getTabFromPath = (pathname: string): TabKey => {
    const tab = pathname.split('/')[2] as TabKey;
    if (tabs.find((t) => t.key === tab)) return tab;
    return 'overview';
  };

  React.useEffect(() => {
    setActiveTab(getTabFromPath(pathname));
  }, [pathname]);

  return (
    <div className="min-h-screen pt-24 pb-20 hero-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Investor Kabinet</h1>
            <p className="text-gray-400">Xush kelibsiz, {session?.user?.name || 'Investor'}</p>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/investor/login' })}
            className="flex items-center gap-2 px-4 py-2 bg-secondary/30 text-gray-400 hover:text-white rounded-lg"
          >
            <LogOut size={18} /> Chiqish
          </button>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto">
          {tabs.map((tab) => (
            <Link
              key={tab.key}
              href={`/investor/${tab.key}`}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${
                pathname === `/investor/${tab.key}`
                  ? 'bg-accent text-dark font-semibold'
                  : 'bg-secondary/30 text-gray-400 hover:text-white'
              }`}
            >
              {tab.icon}
              {tab.label}
            </Link>
          ))}
        </div>

        {activeTab === 'overview' && <InvestorOverview />}
        {activeTab === 'projects' && <InvestorProjects />}
        {activeTab === 'documents' && <InvestorDocuments />}
        {activeTab === 'chat' && <InvestorChat />}
        {activeTab === 'notifications' && <InvestorNotifications />}
      </div>
    </div>
  );
}

function InvestorOverview() {
  const stats = {
    savedProjects: 3,
    documents: 4,
    aiConsultations: 2,
    notifications: 3,
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-secondary/30 border border-accent/10 rounded-xl p-4">
        <div className="text-2xl font-bold text-accent">{stats.savedProjects}</div>
        <div className="text-sm text-gray-400">Saqlangan loyihalar</div>
      </div>
      <div className="bg-secondary/30 border border-accent/10 rounded-xl p-4">
        <div className="text-2xl font-bold text-accent">{stats.documents}</div>
        <div className="text-sm text-gray-400">Hujjatlar</div>
      </div>
      <div className="bg-secondary/30 border border-accent/10 rounded-xl p-4">
        <div className="text-2xl font-bold text-accent">{stats.aiConsultations}</div>
        <div className="text-sm text-gray-400">AI konsultatsiyalar</div>
      </div>
      <div className="bg-secondary/30 border border-accent/10 rounded-xl p-4">
        <div className="text-2xl font-bold text-accent">{stats.notifications}</div>
        <div className="text-sm text-gray-400">Bildirishnomalar</div>
      </div>
    </div>
  );
}

function InvestorProjects() {
  const projects = [
    { id: 1, name: 'Granit qayta ishlash sexi', amount: 5000000, roi: 25, payback: 4, status: "Ko'rib chiqilmoqda" },
    { id: 2, name: 'Marmar bloklar eksport liniyasi', amount: 3000000, roi: 22, payback: 5, status: 'Faol' },
    { id: 3, name: 'Suvenir ishlab chiqarish fabrikasi', amount: 1500000, roi: 30, payback: 3, status: 'Yangi' },
  ];

  const formatAmount = (amount: number) => {
    if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
    return `$${(amount / 1000).toFixed(0)}K`;
  };

  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <div key={project.id} className="bg-secondary/30 border border-accent/10 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-bold text-white">{project.name}</h3>
            <span className="px-3 py-1 rounded-full text-xs bg-blue-500/20 text-blue-400">{project.status}</span>
          </div>
          <div className="flex gap-4 text-sm text-gray-400">
            <span>{formatAmount(project.amount)}</span>
            <span>/</span>
            <span>{project.roi}% ROI</span>
            <span>/</span>
            <span>{project.payback} yil</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function InvestorDocuments() {
  const documents = [
    { id: 1, name: 'Ariza namunasi', date: '2026-04-30' },
    { id: 2, name: 'Biznes-reja talablari', date: '2026-04-30' },
    { id: 3, name: 'Tijoriy taklif shabloni', date: '2026-04-30' },
    { id: 4, name: 'Kontakt malumotlari', date: '2026-04-30' },
  ];

  return (
    <div className="space-y-2">
      {documents.map((doc) => (
        <div key={doc.id} className="flex items-center justify-between bg-secondary/30 border border-accent/10 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <FileText className="text-gray-400" size={20} />
            <div>
              <h3 className="text-white">{doc.name}</h3>
              <p className="text-sm text-gray-500">{doc.date}</p>
            </div>
          </div>
          <button className="text-accent hover:underline text-sm">Yuklab olish</button>
        </div>
      ))}
    </div>
  );
}

function InvestorChat() {
  const messages = [
    { id: 1, question: "G'ozg'on marmarining asosiy turlari qaysilar?", answer: "Oq, kulrang va pushti marmar yo'nalishlari katalogda berilgan." },
    { id: 2, question: "Investitsiya qilish uchun nima kerak?", answer: "Avval kontakt so'rovi yuboriladi, keyin hujjatlar alohida aniqlanadi." },
  ];

  return (
    <div className="space-y-4">
      {messages.map((msg) => (
        <div key={msg.id} className="bg-secondary/30 border border-accent/10 rounded-xl p-4">
          <p className="text-gray-400 text-sm mb-2">Siz: {msg.question}</p>
          <p className="text-white">AI: {msg.answer}</p>
        </div>
      ))}
    </div>
  );
}

function InvestorNotifications() {
  const notifications = [
    { id: 1, text: "Bu kabinet demo ma'lumotlar bilan ishlaydi", time: 'Hozir' },
    { id: 2, text: "Login va saqlash hozircha yoqilmagan", time: 'Hozir' },
    { id: 3, text: "Kontakt so'rovlari email orqali yuboriladi", time: 'Hozir' },
  ];

  return (
    <div className="space-y-2">
      {notifications.map((notif) => (
        <div key={notif.id} className="bg-secondary/30 border border-accent/10 rounded-xl p-4 flex items-center justify-between">
          <p className="text-white">{notif.text}</p>
          <span className="text-gray-500 text-sm">{notif.time}</span>
        </div>
      ))}
    </div>
  );
}