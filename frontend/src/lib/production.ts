export const productionData = {
  stats: {
    plants: 4,
    capacity: '2M+',
    machines: 45,
    quality: 99,
  },
  lines: [
    {
      id: 1,
      name: 'Sex 1 - katta plitalar',
      capacity: '800,000 m2',
      description: "Katta o'lchamdagi marmar va granit plitalarni ishlab chiqarish liniyasi.",
      processes: ['Kesish', 'Silliqlash', 'Jilolash'],
    },
    {
      id: 2,
      name: 'Sex 2 - plitkalar',
      capacity: '600,000 m2',
      description: 'Standart plitkalar uchun kesish va qadoqlash liniyasi.',
      processes: ['Kesish', 'Qadoqlash', 'Nazorat'],
    },
    {
      id: 3,
      name: 'Sex 3 - bloklar',
      capacity: '400,000 m3',
      description: "Marmar va granit bloklarni tayyorlash va jo'natish zonasi.",
      processes: ['Bloklash', 'Yuklash'],
    },
    {
      id: 4,
      name: 'Sex 4 - suvenirlar',
      capacity: '200,000 dona',
      description: 'Marmar va granitdan dekorativ buyumlar ishlab chiqarish.',
      processes: ['CNC', "Qo'l ishi", 'Dizayn'],
    },
  ],
  equipment: [
    { name: 'Breton Bretonmax', country: 'Italiya', task: 'Katta plitalarni kesish', count: 4 },
    { name: 'SIMEC Multiwire', country: 'Italiya', task: 'Simli arralash', count: 6 },
    { name: 'Keda KD-1200', country: 'Xitoy', task: 'Plitkalar kesish', count: 12 },
    { name: 'CMS Brembana CNC', country: 'Italiya', task: 'CNC ishlov berish', count: 3 },
    { name: 'Donatoni POL-600', country: 'Italiya', task: 'Jilolash va silliqlash', count: 8 },
  ],
  aiQuality: {
    accuracy: '99%',
    gradeA: 78,
    gradeB: 18,
    gradeC: 4,
  },
};
