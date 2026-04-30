export const requiredDocuments = [
  {
    id: 1,
    name: 'Ariza',
    description: "Investitsiya yoki hamkorlik so'rovi uchun asosiy ariza",
    required: true,
    icon: 'file',
    template: null,
  },
  {
    id: 2,
    name: 'Biznes-reja',
    description: 'Investitsiya loyihasi biznes-rejasi',
    required: true,
    icon: 'chart',
    template: null,
  },
  {
    id: 3,
    name: 'Pasport yoki kompaniya hujjatlari',
    description: 'Shaxs yoki tashkilot identifikatsiyasi uchun hujjatlar',
    required: true,
    icon: 'id',
    template: null,
  },
  {
    id: 4,
    name: "Ta'sis hujjatlari",
    description: "Kompaniya ta'sis hujjatlari",
    required: true,
    icon: 'building',
    template: null,
  },
  {
    id: 5,
    name: 'Bank rekvizitlari',
    description: "Hisob raqami va bank ma'lumotlari",
    required: true,
    icon: 'bank',
    template: null,
  },
  {
    id: 6,
    name: 'Sertifikatlar',
    description: "Mahsulot yoki faoliyat bo'yicha mavjud sertifikatlar",
    required: false,
    icon: 'certificate',
    template: null,
  },
];

export const investmentSteps = [
  {
    step: 1,
    title: "So'rov qoldirish",
    description: 'Kontakt formasida loyiha, mahsulot yoki hamkorlik turini yozing',
    duration: '5 daqiqa',
  },
  {
    step: 2,
    title: 'Dastlabki aloqa',
    description: "Jamoa so'rovingizni tekshiradi va aniqlashtiruvchi savollar beradi",
    duration: '1-2 ish kuni',
  },
  {
    step: 3,
    title: 'Loyihani tanlash',
    description: "Katalog va kalkulyatordagi variantlar asosida yo'nalish tanlanadi",
    duration: '1 kun',
  },
  {
    step: 4,
    title: 'Hujjatlarni tayyorlash',
    description: "Kerakli hujjatlar ro'yxati alohida tasdiqlanadi",
    duration: '1-3 kun',
  },
  {
    step: 5,
    title: 'Tijoriy taklif',
    description: 'Narx, muddat va shartlar yozma ravishda kelishiladi',
    duration: 'kelishuvga qarab',
  },
];
