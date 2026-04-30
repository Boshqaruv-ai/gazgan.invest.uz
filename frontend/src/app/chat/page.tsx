'use client';

import { useEffect, useRef, useState } from 'react';
import { BriefcaseBusiness, Gem, Handshake, MessageCircle, Send } from 'lucide-react';
import { LeadForm, Reveal } from '@/components/marketing';
import { Button } from '@/components/ui/Button';
import { sendChatMessage, type ChatMessage } from '@/lib/chat';

interface Message extends ChatMessage {
  id: number;
}

const intents = [
  {
    label: 'Investitsiya',
    icon: BriefcaseBusiness,
    prompt: 'Investitsiya loyihalari, ROI va payback haqida ma’lumot kerak.',
    interest: 'Investitsiya loyihasi',
  },
  {
    label: 'Mahsulot',
    icon: Gem,
    prompt: 'Marmar va granit mahsulotlari, narx va bulk buyurtma haqida ma’lumot kerak.',
    interest: 'Mahsulot xaridi',
  },
  {
    label: 'Hamkorlik',
    icon: Handshake,
    prompt: 'Hamkorlik, eksport yoki distribyutorlik bo‘yicha bog‘lanmoqchiman.',
    interest: 'Hamkorlik',
  },
];

const initialMessage: Message = {
  id: 0,
  role: 'assistant',
  content: 'Nima qiziqtiradi?',
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [input, setInput] = useState('');
  const [selectedInterest, setSelectedInterest] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const nextMessageId = useRef(1);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMessage: Message = {
      id: nextMessageId.current++,
      role: 'user',
      content: trimmed,
    };

    setMessages((current) => [...current, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const history = messages.map(({ role, content }) => ({ role, content }));
      const response = await sendChatMessage(trimmed, history);
      setMessages((current) => [
        ...current,
        {
          id: nextMessageId.current++,
          role: 'assistant',
          content: `${response}\n\nKontakt ma’lumotlaringizni qoldirsangiz, mutaxassis siz bilan bog‘lanadi.`,
        },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          id: nextMessageId.current++,
          role: 'assistant',
          content: 'Savol qabul qilindi. Kontakt ma’lumotlaringizni qoldiring, jamoa siz bilan bog‘lanadi.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const chooseIntent = (intent: typeof intents[number]) => {
    setSelectedInterest(intent.interest);
    void send(intent.prompt);
  };

  return (
    <main className="min-h-screen bg-dark pt-28">
      <section className="section-shell pb-20 pt-10">
        <Reveal className="mx-auto mb-10 max-w-3xl text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10 text-accent">
            <MessageCircle className="h-8 w-8" />
          </div>
          <h1 className="text-5xl font-bold tracking-tight text-copy md:text-6xl">AI investor konsultant</h1>
          <p className="mt-5 text-lg leading-8 text-muted">Savol bering yoki qiziqish yo‘nalishini tanlang.</p>
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="glass-card overflow-hidden rounded-2xl">
            <div className="h-[520px] space-y-4 overflow-y-auto p-5 sm:p-6">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[86%] whitespace-pre-line rounded-2xl px-4 py-3 text-sm leading-6 ${
                    msg.role === 'user'
                      ? 'bg-accent text-dark font-semibold'
                      : 'border border-white/10 bg-white/[0.04] text-copy'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}

              {messages.length === 1 && (
                <div className="grid gap-3 sm:grid-cols-3">
                  {intents.map((intent) => (
                    <button
                      key={intent.label}
                      onClick={() => chooseIntent(intent)}
                      className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-left transition-all hover:-translate-y-1 hover:border-accent/35"
                    >
                      <intent.icon className="mb-3 h-5 w-5 text-accent" />
                      <div className="font-semibold text-copy">{intent.label}</div>
                    </button>
                  ))}
                </div>
              )}

              {loading && (
                <div className="flex justify-start">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-muted">
                    Javob tayyorlanmoqda...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-white/10 p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={(event) => event.key === 'Enter' && send(input)}
                  placeholder="Savol yozing..."
                  className="input-field flex-1"
                  maxLength={1200}
                />
                <Button onClick={() => send(input)} disabled={loading || !input.trim()} aria-label="Yuborish">
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          <LeadForm
            key={selectedInterest || 'default'}
            defaultInterest={selectedInterest || 'Investitsiya loyihasi'}
            title="Mutaxassis bilan bog‘lanish"
            subtitle="Tanlangan yo‘nalish bo‘yicha aloqa ma’lumotlaringizni qoldiring."
          />
        </div>
      </section>
    </main>
  );
}
