import type { Project } from '@/lib/projects';
import { formatCurrencyCompact } from '@/lib/utils';

export function getAIResponse(input: string, projects: Project[]): string {
  if (projects.length === 0) {
    return "Loyiha ma'lumotlari hozir yuklanmagan. Birozdan keyin qayta urinib ko'ring yoki menejerga so'rov yuboring.";
  }

  const text = input.toLowerCase();
  const bestProject = projects.reduce((best, project) => project.roi > best.roi ? project : best, projects[0]);
  const minProject = projects.reduce((lowest, project) => project.amount < lowest.amount ? project : lowest, projects[0]);

  if (hasAny(text, ['roi', 'daromad', 'qaytim', 'foyda'])) {
    return projects
      .map((project) => `${project.title}: ${project.roi}% ROI, payback ${project.payback} yil.`)
      .join('\n');
  }

  if (hasAny(text, ['qaysi', 'yaxshi', 'eng yaxshi', 'tavsiya'])) {
    return `${bestProject.title} hozir eng yuqori ROI ko'rsatkichiga ega: ${bestProject.roi}% ROI va ${bestProject.payback} yil payback. Risk darajasi: ${bestProject.riskLevel}.`;
  }

  if (hasAny(text, ['minimal', 'minimum', 'kamida', 'qancha'])) {
    return `Minimal ko'rsatilgan loyiha kapitali: ${formatCurrencyCompact(minProject.amount)}. Bu ${minProject.title} loyihasi bo'yicha. Aniq kirish shartlari menejer bilan tasdiqlanadi.`;
  }

  if (hasAny(text, ['payback', 'qoplash', 'muddat'])) {
    return projects
      .map((project) => `${project.title}: qoplash muddati ${project.payback} yil.`)
      .join('\n');
  }

  if (hasAny(text, ['risk', 'xavf', 'tavakkal'])) {
    return projects
      .map((project) => `${project.title}: ${project.riskLevel} risk.`)
      .join('\n');
  }

  if (hasAny(text, ['menejer', 'aloqa', 'bog', 'kontakt'])) {
    return "Menejer bilan bog'lanish uchun pastdagi tugmani bosing. So'rov Telegram profilingizga bog'lanadi.";
  }

  return "Savolingiz investitsiya, ROI, payback yoki loyiha tanlash bo'yicha bo'lsa, qisqaroq yozing. Murakkab savol uchun menejerga so'rov yuborishingiz mumkin.";
}

function hasAny(text: string, keywords: string[]) {
  return keywords.some((keyword) => text.includes(keyword));
}
