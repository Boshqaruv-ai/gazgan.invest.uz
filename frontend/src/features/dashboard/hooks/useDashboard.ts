'use client';

import { useState } from 'react';

export interface Project {
  id: number;
  name: string;
  amount: number;
  roi: number;
  payback: number;
  status: string;
}

export interface Document {
  id: number;
  name: string;
  date: string;
  icon: string;
}

export interface ChatItem {
  id: number;
  question: string;
  time: string;
  answer: string;
}

export interface Notification {
  id: number;
  text: string;
  time: string;
  icon: string;
}

export interface DashboardData {
  user: { name: string; role: string };
  stats: {
    savedProjects: number;
    documents: number;
    aiConsultations: number;
    notifications: number;
  };
  projects: Project[];
  documents: Document[];
  chatHistory: ChatItem[];
  notifications: Notification[];
}

const mockData: DashboardData = {
  user: { name: 'Demo investor', role: 'investor' },
  stats: {
    savedProjects: 3,
    documents: 4,
    aiConsultations: 2,
    notifications: 3,
  },
  projects: [
    {
      id: 1,
      name: 'Granit qayta ishlash sexi',
      amount: 5000000,
      roi: 25,
      payback: 4,
      status: "Ko'rib chiqilmoqda",
    },
    {
      id: 2,
      name: 'Marmar bloklar eksport liniyasi',
      amount: 3000000,
      roi: 22,
      payback: 5,
      status: 'Demo',
    },
    {
      id: 3,
      name: 'Suvenir ishlab chiqarish fabrikasi',
      amount: 1500000,
      roi: 30,
      payback: 3,
      status: 'Yangi',
    },
  ],
  documents: [
    { id: 1, name: 'Ariza namunasi', date: '2026-04-30', icon: 'DOC' },
    { id: 2, name: 'Biznes-reja talablari', date: '2026-04-30', icon: 'PLAN' },
    { id: 3, name: 'Tijoriy taklif shabloni', date: '2026-04-30', icon: 'PDF' },
    { id: 4, name: 'Kontakt malumotlari', date: '2026-04-30', icon: 'INFO' },
  ],
  chatHistory: [
    { id: 1, question: "G'ozg'on marmarining asosiy turlari qaysilar?", time: 'Demo', answer: "Oq, kulrang va pushti marmar yo'nalishlari katalogda berilgan." },
    { id: 2, question: "Investitsiya qilish uchun nima kerak?", time: 'Demo', answer: "Avval kontakt so'rovi yuboriladi, keyin hujjatlar alohida aniqlanadi." },
  ],
  notifications: [
    { id: 1, text: "Bu kabinet demo ma'lumotlar bilan ishlaydi", time: 'Hozir', icon: 'INFO' },
    { id: 2, text: "Login va saqlash hozircha yoqilmagan", time: 'Hozir', icon: 'INFO' },
    { id: 3, text: "Kontakt so'rovlari email orqali yuboriladi", time: 'Hozir', icon: 'MAIL' },
  ],
};

export function useDashboard() {
  const [data] = useState<DashboardData>(mockData);
  const [loading] = useState(false);

  return { data, loading };
}

export function formatAmount(amount: number) {
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M`;
  }
  return `$${(amount / 1000).toFixed(0)}K`;
}

export function getStatusColor(status: string) {
  switch (status) {
    case "Ko'rib chiqilmoqda": return 'bg-yellow-500/20 text-yellow-400';
    case 'Demo': return 'bg-purple-500/20 text-purple-300';
    case 'Yangi': return 'bg-blue-500/20 text-blue-400';
    default: return 'bg-gray-500/20 text-gray-400';
  }
}
