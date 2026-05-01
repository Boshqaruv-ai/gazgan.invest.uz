'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { MessageCircle, Send, Sparkles } from 'lucide-react';
import { LeadModal } from '@/components/leads/LeadModal';
import { ErrorState } from '@/components/ui/ScreenState';
import { getAIResponse } from '@/lib/ai-chat';
import type { Project } from '@/lib/projects';
import { cn } from '@/lib/utils';

interface ChatMessage {
  id: number;
  role: 'assistant' | 'user';
  text: string;
}

const suggestions = [
  'ROI qanday?',
  'Qaysi loyiha yaxshi?',
  'Minimal investitsiya qancha?',
];

export default function ChatPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [projectsError, setProjectsError] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      role: 'assistant',
      text: "Assalomu alaykum. Gazgan Invest loyihalari bo'yicha ROI, payback va minimal kapital haqida so'rashingiz mumkin.",
    },
  ]);
  const [input, setInput] = useState('');
  const [leadOpen, setLeadOpen] = useState(false);
  const nextId = useRef(2);
  const endRef = useRef<HTMLDivElement>(null);

  async function loadProjects() {
    setProjectsLoading(true);
    setProjectsError(null);

    try {
      const response = await fetch('/api/projects', { cache: 'no-store' });
      const payload = await response.json() as { projects?: Project[]; error?: string };
      if (!response.ok || !payload.projects) {
        throw new Error(payload.error || "Loyiha ma'lumotlari yuklanmadi.");
      }

      setProjects(payload.projects);
    } catch (loadError) {
      setProjectsError(loadError instanceof Error ? loadError.message : "Loyiha ma'lumotlari yuklanmadi.");
    } finally {
      setProjectsLoading(false);
    }
  }

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadProjects();
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages]);

  function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMessage: ChatMessage = {
      id: nextId.current++,
      role: 'user',
      text: trimmed,
    };
    const assistantMessage: ChatMessage = {
      id: nextId.current++,
      role: 'assistant',
      text: getAIResponse(trimmed, projects),
    };

    setMessages((current) => [...current, userMessage, assistantMessage]);
    setInput('');
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    sendMessage(input);
  }

  return (
    <main className="flex min-h-screen flex-col px-5 pb-6 pt-5">
      <section className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-gold">AI chat</p>
          <h1 className="mt-2 text-[28px] font-bold leading-[1.35] text-copy">Investor konsultant</h1>
        </div>
        <div className="flex h-[48px] w-[48px] items-center justify-center rounded-[14px] bg-gold/10 text-gold">
          <Sparkles className="h-6 w-6" />
        </div>
      </section>

      {projectsError ? (
        <div className="mt-4">
          <ErrorState message={projectsError} onRetry={() => void loadProjects()} />
        </div>
      ) : null}

      <section className="miniapp-scrollbar mt-5 flex-1 space-y-3 overflow-y-auto rounded-[20px] border border-white/10 bg-card p-4">
        {messages.map((message) => (
          <div key={message.id} className={cn('flex', message.role === 'user' ? 'justify-end' : 'justify-start')}>
            <div
              className={cn(
                'max-w-[86%] whitespace-pre-line rounded-[18px] px-4 py-3 text-[15px] leading-[1.5]',
                message.role === 'user'
                  ? 'bg-gold font-semibold text-ink'
                  : 'border border-white/10 bg-white/[0.04] text-copy'
              )}
            >
              {message.text}
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </section>

      <section className="mt-4">
        <div className="miniapp-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-2">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => sendMessage(suggestion)}
              disabled={projectsLoading}
              className="shrink-0 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[14px] font-semibold text-copy disabled:opacity-50"
            >
              {suggestion}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setLeadOpen(true)}
          className="mt-2 flex h-[48px] w-full items-center justify-center gap-2 rounded-[14px] border border-gold/30 bg-gold/10 text-[14px] font-bold text-gold transition-all hover:bg-gold/15 active:scale-95"
        >
          <MessageCircle className="h-4 w-4" />
          Menejer bilan aloqa
        </button>

        <form onSubmit={submit} className="mt-3 flex gap-2">
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Savol yozing..."
            maxLength={500}
            className="h-[48px] min-w-0 flex-1 rounded-[14px] border border-white/10 bg-white/[0.04] px-4 text-[15px] text-copy outline-none placeholder:text-muted focus:border-gold/50"
          />
          <button
            type="submit"
            aria-label="Yuborish"
            className="gold-surface flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-[14px] text-ink shadow-gold transition-all active:scale-95"
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
      </section>

      <LeadModal
        open={leadOpen}
        onClose={() => setLeadOpen(false)}
        projectId="general-consultation"
        projectTitle="Investor konsultatsiyasi"
        intent="contact"
      />
    </main>
  );
}