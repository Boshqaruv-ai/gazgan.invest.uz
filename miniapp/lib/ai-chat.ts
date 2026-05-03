import type { Project } from '@/lib/projects';
import { formatCurrencyCompact } from '@/lib/utils';

export function getAIResponse(input: string, projects: Project[]): string {
  if (projects.length === 0) {
    return "Loyiha ma'lumotlari hozir yuklanmagan. Menejerga so'rov yuborsangiz, sizga mos variantni Telegram orqali aniqlashtirib beradi.";
  }

  const text = input.toLowerCase();
  const bestProject = projects.reduce((best, project) => project.roi > best.roi ? project : best, projects[0]);
  const minProject = projects.reduce((lowest, project) => project.amount < lowest.amount ? project : lowest, projects[0]);

  if (hasAny(text, ['roi', 'daromad', 'qaytim', 'foyda'])) {
    const rows = projects
      .map((project) => `${project.title}: ${project.expectedReturn}% ROI, payback ${project.paybackYears} yil.`)
      .join('\n');

    return `${rows}\n\nSizga mos loyiha topib beraymi? Investitsiya summangizni yozing.`;
  }

  if (hasAny(text, ['qaysi', 'yaxshi', 'eng yaxshi', 'tavsiya'])) {
    return `${bestProject.title} hozir eng yuqori ROI ko'rsatkichiga ega: ${bestProject.expectedReturn}% ROI va ${bestProject.paybackYears} yil payback. Risk darajasi: ${bestProject.riskLevel}. ${bestProject.spotsLeft ? `Faqat ${bestProject.spotsLeft} ta joy qolgan.` : ''}\n\nAgar xohlasangiz, shu loyiha bo'yicha investitsiya so'rovini hozir yuborishingiz mumkin.`;
  }

  if (hasAny(text, ['minimal', 'minimum', 'kamida', 'qancha'])) {
    return `Minimal ko'rsatilgan loyiha kapitali: ${formatCurrencyCompact(minProject.investmentRequired)}. Bu ${minProject.title} loyihasi bo'yicha. Aniq kirish shartlari menejer bilan tasdiqlanadi.\n\nSiz kiritmoqchi bo'lgan summani yozing, men mos loyihani saralab beraman.`;
  }

  if (hasAny(text, ['payback', 'qoplash', 'muddat'])) {
    return projects
      .map((project) => `${project.title}: qoplash muddati ${project.paybackYears} yil.`)
      .join('\n') + "\n\nTezroq qoplanadigan loyihani tanlashni xohlaysizmi?";
  }

  if (hasAny(text, ['risk', 'xavf', 'tavakkal'])) {
    return projects
      .map((project) => `${project.title}: ${project.riskLevel} risk.`)
      .join('\n');
  }

  if (hasAny(text, ['menejer', 'aloqa', 'bog', 'kontakt'])) {
    return "Menejer bilan bog'lanish uchun pastdagi tugmani bosing. So'rov Telegram profilingizga bog'lanadi va loyiha shartlari bo'yicha closing bosqichini boshlaydi.";
  }

  return "Sizga mos loyiha topib beraymi? Investitsiya summasi, risk darajasi yoki qiziqqan yo'nalishni yozing. Tayyor bo'lsangiz, menejerga investitsiya so'rovi yuboramiz.";
}

function hasAny(text: string, keywords: string[]) {
  return keywords.some((keyword) => text.includes(keyword));
}
