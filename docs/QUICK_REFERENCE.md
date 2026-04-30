# G'ozg'on Investitsion Portali - AI Agentlari Uchun To'liq Qo'llanma

## Loyiha Haqida

**G'ozg'on Investitsion Portali** - bu marmar va granit investitsiyalari uchun mo'ljallangan interaktiv veb-portal. Loyiha investorlarga:
- G'ozg'on konlari haqida ma'lumot beradi
- Investitsiya imkoniyatlarini ko'rsatadi
- AI agentlar orqali yordam ko'rsatadi
- Shaxsiylashtirilgan dashboard taqdim etadi

---

## Tez Kirish

### Loyihani ishga tushirish

```bash
# Frontend
cd frontend
npm run dev
# Port: http://localhost:3000

# Backend
cd backend
python app.py
# Port: http://localhost:8000
```

### Asosiy Sahifalar

| Sahifa | URL | Tavsif |
|--------|-----|--------|
| Bosh sahifa | `/` | Hero, stats, xarita, chatbot |
| Dashboard | `/dashboard` | Investor kabineti |
| Investment | `/investment` | Investitsiya imkoniyatlari |
| Products | `/products` | Mahsulotlar katalogi |
| Quarries | `/quarries` | Konlar ro'yxati |
| Production | `/production` | Ishlab chiqarish sexlari |
| About | `/about` | Biz haqimizda |

---

## AI Agentlari Uchun Qo'llanma

### 1. ChatWidget (AI Konsultant)

**Fayl**: `frontend/src/components/ChatWidget.tsx`

**Holat**: Boshlang'ich versiya - statik javoblar

**Ishlash usuli**:
```typescript
// Oddiy kalit so'zga asosidl javob
const defaultResponses: Record<string, string> = {
  "marmar": "Marmar - tabiiy tosh bo'lib...",
  "investitsiya": "Investitsiya qilish uchun...",
  "konlar": "G'ozg'on konlari Navoiy...",
  "mahsulotlar": "Mahsulotlar narxi...",
};

// Javob berish
const handleSend = () => {
  // Kiruvchi matnni qidiring
  for (const [key, value] of Object.entries(defaultResponses)) {
    if (lowerInput.includes(key)) {
      response = value;
      break;
    }
  }
};
```

**Kelajakda**:
- AI API (Google Cloud NLP / OpenAI) ga ulash
- Strapi CMS dan dinamik ma'lumot olish
- Chat history saqlash

---

### 2. Investitsiya Kalkulyatori

**Backend fayl**: `backend/app.py`

**Endpoint**: `POST /api/investments/calculate`

**Ishlash usuli**:
```python
# ROI ma'lumotlari
ROI_DATA = {
    "granite-processing": {"roi": 0.25, "payback_years": 4},
    "marble-processing": {"roi": 0.22, "payback_years": 5},
    "quarry-development": {"roi": 0.30, "payback_years": 3},
    "souvenir-factory": {"roi": 0.30, "payback_years": 3},
    "export-line": {"roi": 0.18, "payback_years": 6},
}

# Hisoblash
project = ROI_DATA.get(project_type)
annual_return = amount * project["roi"]
```

**Request misol**:
```json
{
  "amount": 1000000,
  "project_type": "marble-processing",
  "period": 5
}
```

**Response misol**:
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
    "optimistic": {"roi": 29, "annual_return": 290000},
    "realistic": {"roi": 22, "annual_return": 220000},
    "pessimistic": {"roi": 15, "annual_return": 150000}
  }
}
```

---

### 3. Dashboard

**Backend endpoint**: `GET /api/dashboard`

**Ma'lumotlar**:
- User info
- Stats (savedProjects, documents, consultations, notifications)
- Saved projects
- Downloaded documents
- Chat history
- Notifications

---

## Interaktiv Elementlar

### MapSection

**Fayl**: `frontend/src/features/home/components/MapSection.tsx`

**Layerlar**:
- `quarries` - Konlar (qizil)
- `factories` - Sexlar (ko'k)
- `railway` - Temir yo'llar (yashil)
- `roads` - Avtomobil yo'llari (sariq)
- `all` - Barchasi

**Ma'lumotlar**:
```typescript
const mapData = {
  quarries: [
    { id: 1, name: "G'ozg'on-1", x: 200, y: 180, reserves: "2.5M m³", type: "Marmar" },
    // ...
  ],
  factories: [
    { id: 1, name: "G'ozg'on-1 Zavodi", x: 250, y: 200, capacity: "100,000 m²/yil" },
    // ...
  ]
};
```

---

## Kod Yozish Qoidalari

### TypeScript

```typescript
// Interface yaratish
interface Product {
  id: number;
  name: string;
  price: number;
  category: 'marble' | 'granit' | 'souvenir';
}

// Function
function calculateROI(amount: number, roi: number): number {
  return amount * roi;
}
```

### React Komponent

```tsx
'use client';

import { useState } from 'react';

interface Props {
  title: string;
}

export function MyComponent({ title }: Props) {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>{title}</h1>
      <button onClick={() => setCount(c => c + 1)}>
        Click me
      </button>
    </div>
  );
}
```

### Python (Backend)

```python
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/endpoint', methods=['POST'])
def endpoint():
    data = request.json
    return jsonify({
        "success": True,
        "data": data
    })
```

---

## Foydali Ma'lumotlar

### Tez So'rovlar (Chat)

```typescript
const quickQuestions = [
  "Marmar nma?",
  "Investitsiya qanday qilinadi?",
  "Konlar qayerda?",
  "Mahsulotlar narxi qancha?",
];
```

### Statik Ma'lumotlar

```typescript
// frontend/src/lib/data.ts
export const heroStats = [
  { value: "50,000 m²", label: "Yillik qazib olish" },
  { value: "2.5M m³", label: "Zaxiralar" },
  { value: "15+", label: "Eksport davlatlari" },
];

export const productCategories = [
  { id: 'marble', name: 'Marmar', icon: '🏛' },
  { id: 'granit', name: 'Granit', icon: '🪨' },
  { id: 'souvenir', name: 'Suvenir', icon: '🎁' },
];
```

---

## Error Handling

### Frontend

```typescript
try {
  const response = await fetch('/api/endpoint');
  const data = await response.json();
} catch (error) {
  console.error('Error:', error);
}
```

### Backend

```python
from flask import jsonify

@app.errorhandler(404)
def not_found(e):
    return jsonify({
        "success": False,
        "error": {"code": "NOT_FOUND", "message": "Resource topilmadi"}
    }), 404
```

---

## Test Qilish

```bash
# Frontend
cd frontend
npm run lint    # ESLint
npm run build  # Build

# Backend
cd backend
python -m pytest  # Test (kelajakda)
```

---

## Kelajakda Qo'shimcha

1. **FastAPI** - Hozirgi Flask ni FastAPI ga almashtirish
2. **PostgreSQL** - Ma'lumotlar bazasi
3. **Strapi CMS** - Content management
4. **AI Integration** - OpenAI / Google Cloud NLP
5. **Telegram Mini App** - Telegram bot
6. **i18n** - Ko'p tillilik