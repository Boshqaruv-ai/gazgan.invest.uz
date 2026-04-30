'use client';

import { useState } from 'react';
import { MessageCircle, RotateCcw, Send } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { sendChatMessage, type ChatMessage } from '@/lib/chat';

interface Message extends ChatMessage {
  id: number;
}

const quickQuestions = [
  "Marmar nima?",
  "Investitsiya qanday qilinadi?",
  "Konlar qayerda?",
  "Mahsulotlar narxi qancha?",
];

const initialMessage: Message = {
  id: 0,
  role: 'assistant',
  content: "Salom! Men G'ozg'on AI Konsultantiman. Marmar, granit va investitsiya bo'yicha savollaringizga javob beraman.",
};

export function ChatWidget() {
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

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
          content: "Kechirasiz, hozir javob olishda xatolik yuz berdi. Iltimos, keyinroq urinib ko'ring yoki kontakt formasidan foydalaning.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96 max-w-[calc(100vw-2rem)]">
      <div className="bg-secondary border border-accent/20 rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-accent px-4 py-3 flex items-center justify-between">
          <h3 className="font-bold text-dark">AI Konsultant</h3>
          <button
            onClick={() => setMessages([initialMessage])}
            className="text-dark/70 hover:text-dark"
            aria-label="Chatni tozalash"
            title="Chatni tozalash"
          >
            <RotateCcw className="h-5 w-5" />
          </button>
        </div>

        <div className="h-80 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] px-4 py-2 rounded-2xl ${
                msg.role === 'user'
                  ? 'bg-accent text-dark'
                  : 'bg-primary/50 text-gray-200'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-primary/50 text-gray-400 px-4 py-2 rounded-2xl">
                Javob tayyorlanmoqda...
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-accent/10 p-3">
          <div className="flex gap-2 mb-2 flex-wrap">
            {quickQuestions.map((q) => (
              <button
                key={q}
                onClick={() => setInput(q)}
                className="text-xs bg-primary/30 text-gray-400 px-2 py-1 rounded-full hover:text-accent"
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
  );
}

export function ChatFloatingButton({ onClick }: { onClick?: () => void }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed bottom-4 right-4 z-40 bg-accent text-dark w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
      aria-label="AI Konsultant"
    >
      <MessageCircle className="h-7 w-7" />
      {isHovered && (
        <span className="absolute right-16 bg-dark text-white text-sm px-3 py-1 rounded-lg whitespace-nowrap">
          AI Konsultant
        </span>
      )}
    </button>
  );
}
