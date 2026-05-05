import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const MAX_MESSAGE_LENGTH = 1200;
const MAX_HISTORY_ITEMS = 6;
const GROQ_MODEL = 'llama-3.3-70b-versatile';
const GROQ_BASE = 'https://api.groq.com/openai/v1/chat/completions';

const fallbackResponses: Record<string, string> = {
  marmar: "Marmar - tabiiy bezak toshi. G'ozg'on hududi oq, kulrang va pushti marmar yo'nalishlari bilan tanilgan. Mahsulotlar sahifasida asosiy turlar va narx birliklarini ko'rishingiz mumkin.",
  granit: "Granit - qattiq va chidamli tabiiy tosh. U fasad, pol, zinapoya va yodgorlik ishlari uchun mos. Katalogda granit plitka va blok namunalarini ko'rishingiz mumkin.",
  investitsiya: "Investitsiya bo'yicha arizalar kontakt formasi orqali qabul qilinadi. Kalkulyator taxminiy ROI ssenariylarini ko'rsatadi, yakuniy shartlar alohida kelishiladi.",
  narx: "Narx mahsulot turi, o'lcham, ishlov berish va hajmga bog'liq. Katalogda taxminiy birlik narxlar berilgan; aniq tijoriy taklif uchun aloqa formasini yuboring.",
  roi: "ROI kalkulyatordagi ssenariylar asosida taxminiy ko'rsatiladi. Bu moliyaviy kafolat emas; yakuniy baholash loyiha, muddat, logistika va shartnomaga bog'liq.",
  eiz: "EIZ bo'yicha talablar loyiha turi va hujjatlarga qarab tekshiriladi. Portal hujjatlar ro'yxati va kontakt so'rovi bilan yordam beradi.",
  default: "Savolingizni marmar, granit, mahsulot, narx yoki investitsiya bo'yicha aniqroq yozing. Tezkor aloqa uchun About sahifasidagi kontakt formasidan foydalanishingiz mumkin.",
};

function getFallbackResponse(message: string): string {
  const msg = message.toLowerCase();
  for (const [key, response] of Object.entries(fallbackResponses)) {
    if (msg.includes(key)) return response;
  }
  return fallbackResponses.default;
}

function sanitizeHistory(history: unknown): Array<{ role: 'user' | 'assistant'; content: string }> {
  if (!Array.isArray(history)) return [];
  return history
    .slice(-MAX_HISTORY_ITEMS)
    .map((item: any) => {
      const role = item.role === 'model' || item.role === 'assistant' ? 'assistant' : 'user';
      const content = typeof item.content === 'string' ? item.content.slice(0, MAX_MESSAGE_LENGTH) : '';
      return content ? { role, content } : null;
    })
    .filter(Boolean) as Array<{ role: 'user' | 'assistant'; content: string }>;
}

async function getGroqResponse(message: string, history: unknown, apiKey: string): Promise<string | null> {
  const systemPrompt = [
    "Siz G'ozg'on Investitsion Portali uchun qisqa va aniq AI konsultantsiz.",
    "O'zbek tilida javob bering.",
    "Investitsiya, narx va ROI bo'yicha yakuniy shartlar kontakt orqali tasdiqlanishini ayting.",
    "Agar javob noaniq bo'lsa, foydalanuvchini kontakt formasiga yo'naltiring.",
  ].join(' ');

  const messages = [
    { role: 'system', content: systemPrompt },
    ...sanitizeHistory(history),
    { role: 'user', content: message },
  ];

  const body = JSON.stringify({
    model: GROQ_MODEL,
    messages,
    max_tokens: 500,
    temperature: 0.4,
  });

  for (let attempt = 0; attempt < 2; attempt += 1) {
    const response = await fetch(GROQ_BASE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body,
    });

    if (response.ok) {
      const data = await response.json();
      return data?.choices?.[0]?.message?.content || null;
    }

    const retryable = [429, 500, 502, 503, 504].includes(response.status);
    console.warn('Groq chat request failed', { status: response.status, attempt: attempt + 1 });
    if (!retryable || attempt === 1) return null;
    await new Promise((resolve) => setTimeout(resolve, 300));
  }
  return null;
}

export async function GET() {
  return NextResponse.json({ status: 'ok', message: 'Chat API is working (Groq)' });
}

export async function POST(req: NextRequest) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const message = typeof body?.message === 'string' ? body.message.trim() : '';
  if (!message) {
    return NextResponse.json({ error: 'Message is required' }, { status: 400 });
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json({ error: `Message must be ${MAX_MESSAGE_LENGTH} characters or less` }, { status: 413 });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (apiKey) {
    try {
      const reply = await getGroqResponse(message, body?.history, apiKey);
      if (reply) {
        return NextResponse.json({ response: reply, source: 'groq' });
      }
    } catch (error) {
      console.warn('Groq chat request errored', error instanceof Error ? error.message : 'Unknown error');
    }
  }

  return NextResponse.json({ response: getFallbackResponse(message), source: 'fallback' });
}
