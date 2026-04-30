# G'ozg'on Investitsion Portali - AI Agentlari Uchun Loyiha Hujjati

## Loyiha Haqida Umumiy Ma'lumot

**Loyiha nomi**: G'ozg'on Investitsion Portali  
**Maqsad**: Investorlarga marmar va granit investitsiyalari bo'yicha ma'lumot berish, AI agentlar orqali shaxsiylashtirilgan yordam ko'rsatish  
**Til**: O'zbekcha (asosiy), Inglizcha, Ruscha (qo'llab-quvvatlash)  
**Platforma**: Veb-sayt, Telegram Mini App (kelajakda)

---

## Texnologiyalar Stack

### Hozirgi Holat
- **Backend**: Python Flask
- **Frontend**: Next.js 14 + TypeScript + Tailwind CSS
- **Ma'lumotlar bazasi**: Loyihalangan (PostgreSQL)
- **CMS**: Loyihalangan (Strapi)

### Rejalashtirilgan
- **Backend**: FastAPI ( Flask dan o'tish)
- **AI xizmatlari**: Google Cloud AI / OpenAI API

---

## Project Structure

```
gazgan.invest.uz/
├── backend/
│   ├── app.py              # API endpointlari
│   ├── requirements.txt   # Python dependencies
│   ├── app/
│   │   ├── main.py        # FastAPI app
│   │   ├── config.py     # Configuration
│   │   ├── database.py   # Database setup
│   │   ├── models.py    # SQLAlchemy models
│   │   ├── schemas.py   # Pydantic schemas
│   │   ├── routers/    # API routers
│   │   └── services/   # Business logic
│   └── venv/            # Virtual environment
├── frontend/
│   ├── src/
│   │   ├── app/         # Next.js pages
│   │   │   ├── page.tsx           # Home page
│   │   │   ├── layout.tsx         # Root layout
│   │   │   ├── globals.css        # Global styles
│   │   │   ├── about/            # About page
│   │   │   ├── dashboard/        # Investor dashboard
│   │   │   ├── investment/       # Investment page
│   │   │   ├── products/         # Products catalog
│   │   │   ├── quarries/         # Quarries page
│   │   │   ├── production/       # Production page
│   │   │   ├── chat/             # Chat page
│   │   │   └── api/               # API utilities
│   │   ├── components/          # Reusable components
│   │   │   ├── ChatWidget.tsx    # AI Chat widget
│   │   │   ├── AnimatedCounter.tsx
│   │   │   ├── layout/           # Layout components
│   │   │   ├── home/            # Home components
│   │   │   ├── products/       # Product components
│   │   │   ├── quarries/       # Quarry components
│   │   │   └── ui/              # UI components (Button, etc)
│   │   ├── features/            # Feature modules
│   │   │   └── home/
│   │   │       └── components/
│   │   │           ├── HeroSection.tsx
│   │   │           ├── StatsSection.tsx
│   │   │           ├── AdvantagesSection.tsx
│   │   │           ├── MapSection.tsx
│   │   │           └── CTASection.tsx
│   │   ├── lib/                 # Utilities and data
│   │   │   ├── data.ts          # Static data
│   │   │   └── api.ts          # API client
│   │   └── types/              # TypeScript types
│   ├── package.json             # Dependencies
│   ├── tailwind.config.js     # Tailwind config
│   └── tsconfig.json         # TypeScript config
└── docs/                      # Project documentation
```

---

## API Endpoints

### Hozirgi Backend (Flask)

```python
# Investment Calculator
POST /api/investments/calculate
Request: { "amount": number, "project_type": string, "period": number }
Response: { "annual_return_percent": number, "annual_return_amount": number, "payback_years": number, "scenarios": {...} }

# Dashboard
GET /api/dashboard
Response: { "user": {...}, "stats": {...}, "projects": [...], "documents": [...], "chatHistory": [...], "notifications": [...] }

POST /api/dashboard/save-project/<project_id>
Response: { "success": boolean }

GET /api/dashboard/notifications
Response: [...notifications]

POST /api/dashboard/notifications/<notif_id>/read
Response: { "success": boolean }
```

### Rejalashtirilgan FastAPI Endpoints

```python
# Products
GET /api/products
GET /api/products/{id}

# Quarries
GET /api/quarries
GET /api/quarries/{id}

# Investments
GET /api/investments
GET /api/investments/{id}

# AI Chat
POST /api/chat
POST /api/chat/stream

# Documents
GET /api/documents
GET /api/documents/{id}

# User
POST /api/auth/register
POST /api/auth/login
GET /api/auth/me
```

---

## AI Agentlari Hujjati

### 1. Aqlli Konsultant (Chatbot)

**Maqsad**: Investorlarning umumiy savollariga tezkor va aniq javob berish

**Hozirgi Holat**: 
- Frontendda ChatWidget.tsx komponenti mavjud
- Statik javoblar (defaultResponses) ishlatiladi
- Asosiy kalit so'zlar bo'yicha javob beradi

**Javoblar Bazasi**:
```typescript
const defaultResponses: Record<string, string> = {
  "marmar": "Marmar - tabiiy tosh bo'lib, ohaktoshdan hosil bo'ladi. G'ozg'onda yuqori sifatli marmar konlari mavjud. Asosiy turlari: oq, pushti, kulrang va oltin.",
  "investitsiya": "Investitsiya qilish uchun /investment sahifasiga o'ting va kerakli loyihani taning. Minimal investitsiya miqdori $1.5M dan boshlanadi. ROI 20-30% atrofida.",
  "konlar": "G'ozg'on konlari Navoiy viloyatida joylashgan. Asosiy konlar: G'ozg'on-1, G'ozg'on-2, Ko'kpatas, Zarband, Granit va Qizil konlari.",
  "mahsulotlar": "Mahsulotlar narxi turiga qarab $45-$85/m² atrofida. Plitkalar, bloklar va xom materiallar mavjud. Batafsil ma'lumot /products sahifasida.",
};
```

**Kelajakda** (AI integration):
- Google Cloud Natural Language API yoki OpenAI GPT modellari
- Strapi CMS dan dinamik ma'lumot olish
- Murakkab savollar uchun escalate qilish

**Chat Widget Foydalanuvchi Flow**:
1. Foydalanuvchi chatbot vidjetini ochadi
2. Savol yozadi yoki tez savollardan birini bosadi
3. AI javobni qayta ishlaydi va ko'rsatadi
4. Qo'shimcha ma'lumot uchun sahifalarga yo'naltiradi

---

### 2. Investitsiya Kalkulyatori Agenti

**Maqsad**: Potentsial investitsiya daromadliligi va qaytish muddatini hisoblash

**Hozirgi Holat**:
- Backend /api/investments/calculate endpointi ishlaaydi
- Statik ROI ma'lumotlari ishlatiladi

**ROI Ma'lumotlari**:
```python
ROI_DATA = {
    "granite-processing": {"roi": 0.25, "payback_years": 4},
    "marble-processing": {"roi": 0.22, "payback_years": 5},
    "quarry-development": {"roi": 0.30, "payback_years": 3},
    "souvenir-factory": {"roi": 0.30, "payback_years": 3},
    "export-line": {"roi": 0.18, "payback_years": 6},
}
```

**Hisoblash Natijasi**:
```json
{
  "invested_amount": 1000000,
  "project_name": "Marmar qayta ishlash",
  "period": 5,
  "annual_return_percent": 22,
  "annual_return_amount": 220000,
  "payback_years": 5,
  "total_return": 1100000,
  "scenarios": {
    "optimistic": { "roi": 29, "annual_return": 290000, "total_return": 1450000 },
    "realistic": { "roi": 22, "annual_return": 220000, "total_return": 1100000 },
    "pessimistic": { "roi": 15, "annual_return": 150000, "total_return": 750000 }
  }
}
```

**Kelajakda**:
- Dynamic market data olish
- AI-powered risk assessment
- Personalized recommendations

---

### 3. Hujjatlar Agenti

**Maqsad**: Kerakli huquqiy va rasmiy hujjatlar bo'yicha yo'l-yo'riq ko'rsatish

**Kelajakda (AI integration)**:
- EIZ rezidenti hujjatlari ro'yxati
- Namuna shakllarini yuklab olish
- Hujjatlarni to'ldirish bo'yicha qo'llanma
- Muddatlar va davlat organlari haqida ma'lumot

---

## Interaktiv Elementlar Hujjati

### 1. Interaktiv Xarita (MapSection.tsx)

**Maqsad**: G'ozg'onning geografik joylashuvi, konlar, sexlar va logistika infratuzilmasini vizual ko'rsatish

**Funksionallik**:
- **Layerlar**: quarries, factories, railway, roads, all
- **Pop-up ma'lumotlar**: Har bir ob'ekt uchun batafsil ma'lumot
- **SVG asosida**: Real xarita o'rniga SVG vizualizatsiya

**Xarita Ma'lumotlari**:
```typescript
const mapData = {
  quarries: [
    { id: 1, name: "G'ozg'on-1", x: 200, y: 180, reserves: "2.5M m³", type: "Marmar" },
    { id: 2, name: "G'ozg'on-2", x: 280, y: 160, reserves: "1.8M m³", type: "Marmar" },
    { id: 3, name: "Ko'kpatas", x: 150, y: 220, reserves: "3.2M m³", type: "Granit" },
    { id: 4, name: "Zarband", x: 320, y: 200, reserves: "1.5M m³", type: "Marmar" },
  ],
  factories: [
    { id: 1, name: "G'ozg'on-1 Zavodi", x: 250, y: 200, capacity: "100,000 m²/yil", type: "Qayta ishlash" },
    { id: 2, name: "Granit sexi", x: 180, y: 240, capacity: "50,000 m²/yil", type: "Granit ishlab chiqarish" },
  ]
};
```

---

### 2. Dashboard (Investor Kabineti)

**Maqsad**: Ro'yxatdan o'tgan investorlar uchun shaxsiylashtirilgan ma'lumotlar

**Funksionallik**:
- **Saqlangan Loyihalar**: Investor qiziqqan loyihalarni saqlashi
- **Yuklab Olingan Hujjatlar**: Hujjatlar ro'yxati
- **Chat Tarixi**: AI chatbot bilan suhbatlar
- **Bildirishnomalar**: Yangi imkoniyatlar haqida

**Dashboard Ma'lumotlari**:
```json
{
  "user": { "name": "Aziz", "role": "investor" },
  "stats": {
    "savedProjects": 3,
    "documents": 7,
    "aiConsultations": 12,
    "notifications": 5
  },
  "projects": [
    { "id": 1, "name": "Yangi granit qayta ishlash sexi", "amount": 5000000, "roi": 25, "payback": 4, "status": "Ko'rib chiqilmoqda" },
  ],
  "documents": [...],
  "chatHistory": [...],
  "notifications": [...]
}
```

---

### 3. Mahsulotlar Katalogi

**Maqsad**: Investorlarga kerakli mahsulotlarni tez topish

**Filtrlar**:
- Rangi (oq, pushti, kulrang, oltin)
- O'lchami
- Qalinligi
- Ishlov berish turi
- Koni bo'yicha

---

## Foydalanuvchi Rollari

1. **Mehmon** (Guest): Saytni ko'rish, chatbot, kalkulyator
2. **Investor** (Investor): Dashboard, saqlangan loyihalar, hujjatlar
3. **Admin** (Administrator): Barcha ma'muriy funksiyalar

---

## Xavfsizlik Talablari

1. **Autentifikatsiya**: JWT tokenlar
2. **Ma'lumotlar shifrlash**: SSL/TLS
3. **Rate limiting**: API so'rovlari uchun
4. **Input validation**: Pydantic schemas

---

## Development Roadmap

### 1. Hozirgi bosqich (Bajarilgan)
- [x] Frontend tuzilishi
- [x] ChatWidget (boshlang'ich)
- [x] Investitsiya kalkulyatori
- [x] Interaktiv xarita
- [x] Dashboard (mock data)

### 2. Keyingi bosqich
- [ ] FastAPI ga o'tish
- [ ] Ma'lumotlar bazasi integratsiyasi
- [ ] AI chatbotni rivojlantirish
- [ ] Autentifikatsiya va avtorizatsiya

### 3. Uchinchi bosqich
- [ ] Strapi CMS o'rnatish
- [ ] AI xizmatlari integratsiyasi
- [ ] Telegram Mini App

### 4. To'rtinchi bosqich
- [ ] Ko'p tillilik (i18n)
- [ ] Mobil ilova
- [ ] Advanced AI features