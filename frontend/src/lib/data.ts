export const statistics = [
  { value: 6, suffix: '', label: 'katalogdagi mahsulotlar' },
  { value: 6, suffix: '', label: "kon yo'nalishlari" },
  { value: 4, suffix: '', label: 'investitsiya ssenariylari' },
  { value: 1, suffix: '', label: 'AI konsultant' },
];

export const heroStats = [
  { value: '6', label: 'katalog mahsuloti' },
  { value: '4', label: "investitsiya yo'nalishi" },
  { value: '24/7', label: 'chat yordamchisi' },
];

export const advantages = [
  {
    icon: 'gem',
    title: "Tosh yo'nalishlari katalogi",
    description: "Marmar va granit bo'yicha asosiy mahsulotlar, o'lchamlar va ishlov turlari bir joyda.",
  },
  {
    icon: 'shield',
    title: 'Aniq tijoriy chegaralar',
    description: "Portal tijoriy takliflarni oshirib ko'rsatmaydi; yakuniy shartlar kontakt orqali tasdiqlanadi.",
  },
  {
    icon: 'lightning',
    title: 'Tez aloqa',
    description: "Investor yoki xaridor so'rovi email/kontakt formasi orqali oddiy va arzon yo'l bilan qabul qilinadi.",
  },
  {
    icon: 'cpu',
    title: 'Yengil AI yordamchi',
    description: "Chat savollarga tez javob beradi va API kaliti bo'lmasa ham deterministik fallback bilan ishlaydi.",
  },
  {
    icon: 'trending-up',
    title: 'Taxminiy ROI kalkulyatori',
    description: "Loyiha turiga qarab ssenariylarni solishtirish mumkin; natijalar moliyaviy kafolat emas.",
  },
  {
    icon: 'users',
    title: 'Investor uchun sodda oqim',
    description: "Ro'yxatdan o'tishsiz katalog, kalkulyator, chat va kontakt oqimi ishlaydi.",
  },
];

export const mapData = {
  quarries: [
    { id: 1, name: "G'ozg'on-1", x: 250, y: 200, reserves: '85 mln m3', type: 'Marmar' },
    { id: 2, name: "G'ozg'on-2", x: 220, y: 180, reserves: '42 mln m3', type: 'Marmar' },
    { id: 3, name: "G'ozg'on Granit", x: 280, y: 220, reserves: '120 mln m3', type: 'Granit' },
    { id: 4, name: 'Kulrang marmar', x: 230, y: 250, reserves: '35 mln m3', type: 'Marmar' },
  ],
  factories: [
    { id: 1, name: 'Kesish sexi', x: 250, y: 215, capacity: '800 ming m2/yil', type: 'Qayta ishlash' },
    { id: 2, name: 'Jilolash liniyasi', x: 190, y: 230, capacity: '600 ming m2/yil', type: 'Qayta ishlash' },
    { id: 3, name: 'Blok ombori', x: 270, y: 190, capacity: '400 ming m3/yil', type: 'Xom bloklar' },
    { id: 4, name: 'Suvenir sexi', x: 240, y: 240, capacity: '100 ming dona/yil', type: 'Hunarmandchilik' },
  ],
};
