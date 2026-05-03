import { getTelegramInitData, getTelegramUser } from '@/lib/telegram';

export async function sendChatMessage(message: string) {
  const response = await fetch('/api/chat/message', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      initData: getTelegramInitData(),
      user: getTelegramUser(),
      message,
    }),
  });
  const payload = await response.json() as { message?: { role: 'assistant'; text: string }; error?: string };

  if (!response.ok || !payload.message) {
    throw new Error(payload.error || 'Xabar yuborilmadi.');
  }

  return payload.message;
}
