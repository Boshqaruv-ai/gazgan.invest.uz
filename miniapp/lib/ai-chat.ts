import type { Project } from '@/lib/projects';

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

const SYSTEM_PROMPT = `Siz "G'ozg'on Invest" platformasining AI konsultantisiz. Siz marmar va granit investitsiyalari bo'yicha mutaxassissingiz.

Platforma haqida:
- G'ozg'on Invest - O'zbekistondagi marmar va granit investitsiyalari portali
- Foydalanuvchilar platforma orqali turli investitsiya loyihalarini ko'rishadi va tanlaydi
- Har bir loyiha uchun: ROI (foiz), payback muddati (yil), minimal investitsiya, risk darajasi, joylashuv

Vazifangiz:
1. Foydalanuvchiga loyihalar haqida tushunarli va to'liq ma'lumot berish
2. Investitsiya bo'yicha maslahat berish
3. ROI, payback, risk bo'yicha savollarga javob berish
4. Foydalanuvchini to'g'ri yo'naltirish

Qoidalar - BU JUDA MUHIM:
- Har doim o'zbek tilida javob bering
- Loyiha statuslari: "Yangi", "Ommabop", "Faol", "Moliyalashtirilgan"
- INGLIZCHA SO'ZLARNI (NEW, HOT, ACTIVE, FUNDED, ROI, payback) HECH QACHON ISHLATMANG!
- Faqat o'zbekcha so'zlarni ishlatishingiz mumkin: "daromad foizi", "qoplash muddati"
- Salomlashishda "Assalomu alaykum" deb boshlang
- Loyiha haqida so'raganda, barcha muhim ma'lumotlarni keltiring
- Foydalanuvchi investitsiya summasi haqida so'rasa, mos loyihani tavsiya qiling
- Menejer bilan bog'lanishni taklif qiling agar foydalanuvchi tayyor bo'lsa`;

export async function getAIResponse(
  input: string,
  projects: Project[],
  history: Array<{ role: 'user' | 'assistant'; content: string }> = []
): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey || apiKey === 'your_groq_api_key_here') {
    return "AI xizmati hozir mavjud emas. Iltimos, keyinroq urinib ko'ring.";
  }

  if (projects.length === 0) {
    return "Loyiha ma'lumotlari hozir yuklanmagan. Iltimos, keyinroq urinib ko'ring.";
  }

  const projectsInfo = projects
    .map((p) => `- ${p.title}: ROI ${p.expectedReturn}%, payback ${p.paybackYears} yil, minimal investitsiya ${p.investmentRequired} USD, risk: ${p.riskLevel}, status: ${p.status}`)
    .join('\n');

  const messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
    { role: 'system', content: `${SYSTEM_PROMPT}\n\nMavjud loyihalar:\n${projectsInfo}` },
  ];

  if (history.length === 0) {
    messages.push({
      role: 'user',
      content: `${input}\n\n(E'tibor bering: bu birinchi xabar, konsultant sifatida avval salomlash va platforma haqida qisqa ma'lumot ber)`,
    });
  } else {
    history.forEach((msg) => {
      messages.push({ role: msg.role, content: msg.content });
    });
    messages.push({ role: 'user', content: input });
  }

  try {
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages,
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Groq API error:', error);
      return "Kechirasiz, hozir javob berishda xatolik yuz berdi. Iltimos, keyinroq urinib ko'ring.";
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "Kechirasiz, javob olishda muammo yuz berdi.";
  } catch (error) {
    console.error('AI chat error:', error);
    return "Kechirasiz, hozir javob berishda xatolik yuz berdi. Iltimos, keyinroq urinib ko'ring.";
  }
}

export function getWelcomeMessage(): string {
  return `Assalomu alaykum! 👋

Men G'ozg'on Invest AI konsultantiman. Sizga marmar va granit investitsiyalari bo'yicha yordam berishga tayyorman.

Nima haqida bilmoqchisiz?
- Loyihalar va ularning ROI ko'rsatkichlari
- Investitsiya imkoniyatlari va minimal summa
- Risk darajasi va payback muddatlari
- Muayyan loyiha haqida batafsil ma'lumot

Savolingizni yozing, va men sizga eng mos variantni taklif qilaman!`;
}