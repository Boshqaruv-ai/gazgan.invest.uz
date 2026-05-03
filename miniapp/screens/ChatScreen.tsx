'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, Send } from 'lucide-react';
import { LeadModal } from '@/components/leads/LeadModal';
import { PremiumButton } from '@/components/ui/PremiumButton';
import { useTelegramWebApp } from '@/hooks/useTelegramWebApp';
import { triggerTelegramHaptic } from '@/lib/telegram';
import { cn } from '@/lib/utils';
import { sendChatMessage } from '@/services/chat';

interface ChatMessage {
  id: number;
  role: 'assistant' | 'user';
  text: string;
  time: string;
}

const suggestions = ['Marmar turlari', 'ROI haqida', 'Imtiyozlar', 'Loyihalar'];

export function ChatScreen() {
  useTelegramWebApp();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      role: 'assistant',
      text: "Assalomu alaykum. Sizga mos loyiha topib beraymi? Investitsiya summangiz yoki qiziqqan yo'nalishni yozing.",
      time: '14:30',
    },
  ]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [leadOpen, setLeadOpen] = useState(false);
  const nextId = useRef(2);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || sending) return;

    triggerTelegramHaptic('light');
    setInput('');
    setSending(true);
    const userMessage: ChatMessage = {
      id: nextId.current++,
      role: 'user',
      text: trimmed,
      time: currentTime(),
    };
    setMessages((current) => [...current, userMessage]);

    try {
      const assistant = await sendChatMessage(trimmed);
      setMessages((current) => [
        ...current,
        {
          id: nextId.current++,
          role: 'assistant',
          text: assistant.text,
          time: currentTime(),
        },
      ]);
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          id: nextId.current++,
          role: 'assistant',
          text: error instanceof Error ? error.message : 'Xabar yuborilmadi. Menejer bilan aloqa qiling.',
          time: currentTime(),
        },
      ]);
    } finally {
      setSending(false);
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void send(input);
  }

  return (
    <div className="screen-shell flex min-h-full flex-col pb-[calc(154px+env(safe-area-inset-bottom,0px))]">
      <header className="flex items-center gap-3">
        <div className="relative flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-full bg-[radial-gradient(circle_at_30%_20%,#FFF0A3,#C9A84C_38%,#2B210A_76%)] shadow-[0_0_26px_rgba(201,168,76,0.35)]">
          <div className="flex h-[39px] w-[39px] items-center justify-center rounded-full bg-[#0B0F1A]">
            <Bot className="h-6 w-6 text-gold" />
          </div>
        </div>
        <div>
          <h1 className="text-[18px] font-extrabold text-copy">AI Konsultant</h1>
          <p className="mt-0.5 text-[12px] text-muted">24/7 sizga yordam beraman</p>
        </div>
      </header>

      <section className="mt-5 flex-1 space-y-3">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn('flex', message.role === 'user' ? 'justify-end' : 'justify-start')}
          >
            <div
              className={cn(
                'max-w-[82%] rounded-[16px] border px-4 py-3 text-[14px] leading-[1.45] shadow-premium',
                message.role === 'user'
                  ? 'border-white/8 bg-white/[0.08] text-copy'
                  : 'border-white/10 bg-card text-copy'
              )}
            >
              <p className="whitespace-pre-line">{message.text}</p>
              <p className="mt-2 text-right text-[10px] text-muted">{message.time}</p>
            </div>
          </motion.div>
        ))}
        {sending ? (
          <div className="flex justify-start">
            <div className="rounded-[16px] border border-white/10 bg-card px-4 py-3 text-[13px] text-muted">
              Yozmoqda...
            </div>
          </div>
        ) : null}
        <div ref={endRef} />
      </section>

      <div className="fixed bottom-[calc(78px+env(safe-area-inset-bottom,0px))] left-1/2 z-40 w-full max-w-[390px] -translate-x-1/2 border-t border-white/10 bg-[#0B0F1A]/96 px-3 pb-3 pt-3 backdrop-blur-xl">
        <form onSubmit={submit} className="flex items-center gap-2 rounded-full border border-white/10 bg-card px-3 py-2">
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Savolingizni yozing..."
            maxLength={700}
            className="h-[36px] min-w-0 flex-1 bg-transparent text-[14px] text-copy outline-none placeholder:text-muted"
          />
          <button
            type="submit"
            disabled={sending}
            aria-label="Yuborish"
            className="gold-surface flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full text-[#0B0F1A] shadow-gold disabled:opacity-60"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
        <div className="miniapp-scrollbar mt-2 flex gap-2 overflow-x-auto">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => void send(suggestion)}
              className="shrink-0 rounded-full border border-white/10 bg-white/[0.05] px-3 py-2 text-[12px] font-semibold text-copy"
            >
              {suggestion}
            </button>
          ))}
        </div>
        <PremiumButton onClick={() => setLeadOpen(true)} variant="ghost" trailingIcon={false} className="mt-2 h-[42px] min-h-[42px]">
          Menejer bilan aloqa
        </PremiumButton>
      </div>

      <LeadModal
        open={leadOpen}
        onClose={() => setLeadOpen(false)}
        projectId="general-consultation"
        projectTitle="AI investor konsultatsiyasi"
        intent="contact"
      />
    </div>
  );
}

function currentTime() {
  return new Intl.DateTimeFormat('uz-UZ', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date());
}
