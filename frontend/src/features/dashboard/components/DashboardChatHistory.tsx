import Link from 'next/link';
import { useDashboard } from '../hooks/useDashboard';

export function DashboardChatHistory() {
  const { data } = useDashboard();
  const chatHistory = data?.chatHistory || [];

  return (
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
              <div className="text-gray-400 text-sm mb-2">AI Konsultant / {chat.time}</div>
              <div className="text-gray-300">{chat.answer}</div>
              <button className="text-accent text-sm mt-2 hover:underline">
                Batafsil -&gt;
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
  );
}
