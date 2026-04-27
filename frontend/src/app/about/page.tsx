'use client';

import * as React from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';

const timeline = [
  { year: '1965', title: "Birinchi marmar koni ochildi", description: "Birinchi marmar koni ochildi" },
  { year: '1992', title: "Mustaqillikdan keyin yangi rivojlanish", description: "Mustaqillikdan keyin yangi rivojlanish bosqichi" },
  { year: '2010', title: "Zamonaviy Italiya uskunalari", description: "Zamonaviy Italiya uskunalari joriy etildi" },
  { year: '2024', title: "Investitsion portal", description: "Investitsion portal ishga tushirildi" },
];

const team = [
  { name: 'A. Karimov', position: 'Bosh direktor', experience: '20 yillik tajriba' },
  { name: 'N. Rahimova', position: 'Bosh muhandis', experience: '15 yillik tajriba' },
  { name: 'S. Toshmatov', position: 'Investitsiya bo\'limi', experience: '10 yillik tajriba' },
  { name: 'D. Aliyeva', position: 'Marketing direktori', experience: '8 yillik tajriba' },
];

export default function AboutPage() {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    topic: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen pt-24 pb-20 hero-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 pt-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Biz Haqimizda</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            G&apos;ozg&apos;on marmar va granit sanoatining tarixi va kelajagi
          </p>
        </div>

        {/* History */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">G&apos;ozg&apos;on tarixi</h2>
            <div className="space-y-4 text-gray-400">
              <p>G&apos;ozg&apos;on — O&apos;zbekistonning Navoiy viloyatida joylashgan, marmar va granit konlari bilan dunyoga mashhur bo&apos;lgan hudud. Bu yerda tosh qazib olish an&apos;analari ming yillik tarixga ega.</p>
              <p>G&apos;ozg&apos;on marmari O&apos;rta Osiyodagi eng qadimiy va nufuzli binolarda ishlatilgan. Toshkent, Samarqand va Buxorodagi tarixiy yodgorliklarda G&apos;ozg&apos;on marmarining izlarini topish mumkin.</p>
              <p>Bugungi kunda G&apos;ozg&apos;on zamonaviy texnologiyalar va an&apos;anaviy hunarmandchilikni birlashtirgan holda, dunyo bozoriga yuqori sifatli marmar va granit mahsulotlarini yetkazib bermoqda.</p>
            </div>
          </div>
          <div className="bg-secondary/30 border border-accent/10 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-white mb-6">Muhim sanalar</h3>
            <div className="space-y-6 relative">
              <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-accent/30"></div>
              {timeline.map((item, index) => (
                <div key={index} className="relative pl-10">
                  <div className="absolute left-0 top-1 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                  </div>
                  <div className="text-accent font-bold">{item.year}</div>
                  <p className="text-gray-400 text-sm">{item.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mission */}
        <div className="bg-gradient-to-r from-accent/10 to-transparent border border-accent/20 rounded-2xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-white mb-4">Bizning missiya</h2>
          <p className="text-gray-400 text-lg">
            G&apos;ozg&apos;oning boy tabiiy resurslarini zamonaviy texnologiyalar bilan qayta ishlab, dunyo bozorida O&apos;zbekiston marmar va granitining obro&apos;sini oshirish va investorlar uchun eng qulay sharoitlar yaratish.
          </p>
        </div>

        {/* Team */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8">Rahbariyat</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <Card key={index} hover className="p-6 text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-accent/10 rounded-full flex items-center justify-center">
                  <span className="text-3xl">👤</span>
                </div>
                <h3 className="font-bold text-white">{member.name}</h3>
                <p className="text-accent text-sm mb-2">{member.position}</p>
                <p className="text-gray-500 text-xs">{member.experience}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-8">Aloqa</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">Manzil</h3>
                  <p className="text-gray-400">Navoiy viloyati, G&apos;ozg&apos;on shahri, Sanoat ko&apos;chasi, 1-uy</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLineJoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">Telefon</h3>
                  <p className="text-gray-400">+998 79 123 45 67</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLineJoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">Email</h3>
                  <p className="text-gray-400">info@gazgan.uz</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-secondary/30 border border-accent/10 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-6">So&apos;rov qoldirish</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Ismingiz"
                  className="input-field"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
                <input
                  type="email"
                  placeholder="Email manzilingiz"
                  className="input-field"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
                <input
                  type="tel"
                  placeholder="Telefon raqamingiz"
                  className="input-field"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
                <select
                  className="input-field"
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
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
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
                <Button type="submit" className="w-full py-3">Yuborish</Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}