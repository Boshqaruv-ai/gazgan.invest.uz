'use client';

import * as React from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

interface TimelineItem {
  year: string;
  title: string;
}

interface TeamMember {
  name: string;
  position: string;
  experience: string;
}

const timeline: TimelineItem[] = [
  { year: 'Portal', title: 'Mahsulot, kon va investitsiya sahifalari jamlandi' },
  { year: 'Aloqa', title: "So'rovlar email orqali qabul qilinadi" },
  { year: 'Chat', title: 'AI yordamchi va fallback javoblar ishga tushirildi' },
  { year: 'Keyin', title: "Real talab bo'lsa, lead tracking va admin oqimi qo'shiladi" },
];

const team: TeamMember[] = [
  { name: 'Investitsiya', position: "Loyiha so'rovlari", experience: "Ssenariy va hujjatlar bo'yicha aloqa" },
  { name: 'Mahsulotlar', position: 'Katalog va narx', experience: "Aniq o'lcham, hajm va tijoriy taklif" },
  { name: 'Hamkorlik', position: "B2B yo'nalish", experience: "Distribyutor, eksport va ishlab chiqarish so'rovlari" },
  { name: 'Texnik maslahat', position: 'Kon va ishlab chiqarish', experience: 'Texnik talablar alohida aniqlanadi' },
];

export function useContactForm() {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    topic: '',
    message: '',
  });
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const subject = encodeURIComponent(`Gazgan Invest: ${formData.topic || "yangi so'rov"}`);
    const body = encodeURIComponent([
      `Ism: ${formData.name}`,
      `Email: ${formData.email}`,
      `Telefon: ${formData.phone || '-'}`,
      `Mavzu: ${formData.topic || '-'}`,
      '',
      formData.message,
    ].join('\n'));

    window.location.href = `mailto:info@gazgan.uz?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return { formData, setFormData, handleSubmit, submitted };
}

export function AboutHistory() {
  return (
    <div className="grid lg:grid-cols-2 gap-12 mb-16">
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Portal haqida</h2>
        <div className="space-y-4 text-gray-400">
          <p>G&apos;ozg&apos;on O&apos;zbekistonning Navoiy viloyatida joylashgan, marmar va granit konlari bilan tanilgan hudud.</p>
          <p>G&apos;ozg&apos;on marmari O&apos;rta Osiyodagi tarixiy va zamonaviy arxitektura loyihalarida ishlatilgan.</p>
          <p>Ushbu portal mahsulot katalogi, konlar, taxminiy investitsiya ssenariylari va kontakt oqimini bir joyga jamlaydi.</p>
        </div>
      </div>
      <div className="bg-secondary/30 border border-accent/10 rounded-2xl p-8">
        <h3 className="text-xl font-bold text-white mb-6">Platforma holati</h3>
        <div className="space-y-6 relative">
          <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-accent/30" />
          {timeline.map((item) => (
            <div key={item.year} className="relative pl-10">
              <div className="absolute left-0 top-1 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-primary rounded-full" />
              </div>
              <div className="text-accent font-bold">{item.year}</div>
              <p className="text-gray-400 text-sm">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AboutMission() {
  return (
    <div className="border border-accent/20 rounded-2xl p-8 mb-16 bg-secondary/30">
      <h2 className="text-2xl font-bold text-white mb-4">Bizning maqsad</h2>
      <p className="text-gray-400 text-lg">
        G&apos;ozg&apos;on marmar va granit yo&apos;nalishlari bo&apos;yicha investor, xaridor va hamkorlar uchun sodda, ishonchli va premium portal yaratish.
      </p>
    </div>
  );
}

export function AboutTeam() {
  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold text-white mb-8">Aloqa yo&apos;nalishlari</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {team.map((member) => (
          <Card key={member.name} hover className="p-6 text-center">
            <div className="w-24 h-24 mx-auto mb-4 bg-accent/10 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-accent">{member.name.split(' ').map((part) => part[0]).join('')}</span>
            </div>
            <h3 className="font-bold text-white">{member.name}</h3>
            <p className="text-accent text-sm mb-2">{member.position}</p>
            <p className="text-gray-500 text-xs">{member.experience}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function AboutContact() {
  const { formData, setFormData, handleSubmit, submitted } = useContactForm();

  return (
    <div id="contact">
      <h2 className="text-2xl font-bold text-white mb-8">Aloqa</h2>
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-accent font-bold">M</span>
            </div>
            <div>
              <h3 className="font-bold text-white mb-1">Manzil</h3>
              <p className="text-gray-400">Navoiy viloyati, G&apos;ozg&apos;on shahri</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-accent font-bold">T</span>
            </div>
            <div>
              <h3 className="font-bold text-white mb-1">Telefon</h3>
              <p className="text-gray-400">+998 79 123 45 67</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-accent font-bold">@</span>
            </div>
            <div>
              <h3 className="font-bold text-white mb-1">Email</h3>
              <p className="text-gray-400">info@gazgan.uz</p>
            </div>
          </div>
        </div>

        <div className="bg-secondary/30 border border-accent/10 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-white mb-6">So&apos;rov qoldirish</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Ismingiz"
              className="input-field"
              value={formData.name}
              onChange={(event) => setFormData({ ...formData, name: event.target.value })}
              required
            />
            <input
              type="email"
              placeholder="Email manzilingiz"
              className="input-field"
              value={formData.email}
              onChange={(event) => setFormData({ ...formData, email: event.target.value })}
              required
            />
            <input
              type="tel"
              placeholder="Telefon raqamingiz"
              className="input-field"
              value={formData.phone}
              onChange={(event) => setFormData({ ...formData, phone: event.target.value })}
            />
            <select
              className="input-field"
              value={formData.topic}
              onChange={(event) => setFormData({ ...formData, topic: event.target.value })}
              required
            >
              <option value="">Mavzuni tanlang</option>
              <option value="investment">Investitsiya</option>
              <option value="products">Mahsulotlar</option>
              <option value="partnership">Hamkorlik</option>
              <option value="other">Boshqa</option>
            </select>
            <textarea
              placeholder="Xabaringiz..."
              className="input-field h-32 resize-none"
              value={formData.message}
              onChange={(event) => setFormData({ ...formData, message: event.target.value })}
              required
            />
            <Button type="submit" className="w-full py-3">Email orqali yuborish</Button>
            {submitted && (
              <p className="text-accent text-sm text-center">Email ilovasi ochildi. Xabarni yuborishdan oldin matnni tekshiring.</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
