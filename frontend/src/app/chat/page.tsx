'use client';

import { useEffect, useRef, useState } from 'react';
import { MessageCircle, Send } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { sendChatMessage, type ChatMessage } from '@/lib/chat';

interface Message extends ChatMessage {
  id: number;
}

const quickQuestions = [
  "Marmar nima?",
  "Investitsiya qanday qilinadi?",
  "EIZ rezidenti bo'lish uchun nima kerak?",
  "Mahsulotlar narxi qancha?",
  "ROI nima?",
  "Qancha investitsiya kerak?",
];

const initialMessage: Message = {
  id: 0,
  role: 'assistant',
  content: "Salom! Men G'ozg'on AI Konsultantiman. Marmar, granit va investitsiya bo'yicha savollaringizga yordam beraman.",
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMessage: Message = {
      id: Date.now(),
      role: 'user',
      content: text,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const history = messages.map(({ role, content }) => ({ role, content }));
      const response = await sendChatMessage(text, history);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: 'assistant',
          content: response,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: 'assistant',
          content: "Kechirasiz, xatolik yuz berdi. Iltimos, keyinroq urinib ko'ring yoki kontakt formasidan foydalaning.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 hero-bg">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 bg-accent/20 rounded-full flex items-center justify-center">
            <MessageCircle className="h-10 w-10 text-accent" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">AI Konsultant</h1>
          <p className="text-gray-400">G&apos;ozg&apos;on marmar va granit haqida savollar bering</p>
        </div>

        <div className="bg-secondary border border-accent/10 rounded-2xl overflow-hidden">
          <div className="h-[500px] overflow-y-auto p-6 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-4 py-3 rounded-2xl ${
                  msg.role === 'user'
                    ? 'bg-accent text-dark font-medium'
                    : 'bg-primary/50 text-gray-200'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-primary/50 px-4 py-3 rounded-2xl text-gray-400">
                  Javob tayyorlanmoqda...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-accent/10 p-4">
            <div className="flex gap-2 mb-3 flex-wrap">
              {quickQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => setInput(q)}
                  className="text-sm bg-primary/30 text-gray-400 px-3 py-2 rounded-full hover:text-accent hover:bg-accent/10 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Savol yozing..."
                className="input-field flex-1"
                maxLength={1200}
              />
              <Button onClick={handleSend} disabled={loading || !input.trim()} aria-label="Yuborish">
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
