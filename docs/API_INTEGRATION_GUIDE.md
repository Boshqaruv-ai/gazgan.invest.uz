# G'ozg'on Investitsion Portali - API va Integratsiya Hujjati

---

## Hozirgi API Holati

### Backend (Flask) - Port 8000

Asosiy fayl: `backend/app.py`

```python
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# ROI Data - Har bir loyiha uchun ROI va payback years
ROI_DATA = {
    "granite-processing": {"roi": 0.25, "payback_years": 4},
    "marble-processing": {"roi": 0.22, "payback_years": 5},
    "quarry-development": {"roi": 0.30, "payback_years": 3},
    "souvenir-factory": {"roi": 0.30, "payback_years": 3},
    "export-line": {"roi": 0.18, "payback_years": 6},
}

# Dashboard mock data
DASHBOARD_DATA = {...}
```

### Frontend (Next.js) - Port 3000

Asosiy fayl: `frontend/src/app/`

API base URL: `http://localhost:8000`

---

## API Endpointlar

### 1. Investment Calculator

```http
POST /api/investments/calculate
```

**Request:**
```json
{
  "amount": 1000000,
  "project_type": "marble-processing",
  "period": 5
}
```

**Response:**
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
    "optimistic": {
      "roi": 29,
      "annual_return": 290000,
      "total_return": 1450000
    },
    "realistic": {
      "roi": 22,
      "annual_return": 220000,
      "total_return": 1100000
    },
    "pessimistic": {
      "roi": 15,
      "annual_return": 150000,
      "total_return": 750000
    }
  }
}
```

---

### 2. Dashboard

```http
GET /api/dashboard
```

**Response:**
```json
{
  "user": {
    "name": "Aziz",
    "role": "investor"
  },
  "stats": {
    "savedProjects": 3,
    "documents": 7,
    "aiConsultations": 12,
    "notifications": 5
  },
  "projects": [
    {
      "id": 1,
      "name": "Yangi granit qayta ishlash sexi",
      "amount": 5000000,
      "roi": 25,
      "payback": 4,
      "status": "Ko'rib chiqilmoqda"
    }
  ],
  "documents": [
    {
      "id": 1,
      "name": "EIZ rezidentligi uchun ariza",
      "date": "2026-01-15",
      "icon": "📄"
    }
  ],
  "chatHistory": [
    {
      "id": 1,
      "question": "G'ozg'on marmarining asosiy turlari qaysilar?",
      "time": "2 soat oldin",
      "answer": "G'ozg'on marmarining asosiy turlari: oq, pushti, kulrang va oltin marmarlar."
    }
  ],
  "notifications": [
    {
      "id": 1,
      "text": "Yangi investitsiya loyihasi qo'shildi",
      "time": "30 daqiqa oldin",
      "icon": "📢"
    }
  ]
}
```

---

### 3. Save Project

```http
POST /api/dashboard/save-project/<project_id>
```

**Response:**
```json
{
  "success": true,
  "message": "Loyiha saqlandi"
}
```

---

### 4. Notifications

```http
GET /api/dashboard/notifications
```

**Response:**
```json
[
  {
    "id": 1,
    "text": "Yangi investitsiya loyihasi qo'shildi",
    "time": "30 daqiqa oldin",
    "icon": "📢"
  }
]
```

---

```http
POST /api/dashboard/notifications/<notification_id>/read
```

**Response:**
```json
{
  "success": true
}
```

---

## Frontend dan Backend ga So'rovlar

### API Client (`frontend/src/lib/api.ts`)

Hozirgi holatda API client mavjud emas. Frontendda to'g'ridan-to'g'ri fetch ishlatiladi.

**Example (ChatWidget.tsx):**
```typescript
const handleSend = () => {
  // Hozirda faqat frontend-side processing
  setTimeout(() => {
    const response = defaultResponses[key];
    setMessages(prev => [...prev, assistantMessage]);
    setLoading(false);
  }, 1000);
};
```

---

## Backendni Kengaytirish Yo'riqnoma

### Yangi Endpoint Qo'shish

1. `backend/app.py` faylini oching
2. Yangi route yarating:
```python
@app.route('/api/new-endpoint', methods=['GET'])
def new_endpoint():
    return jsonify({"data": "value"})
```

3. Frontendda API utility yarating yoki to'g'ridan-to'g'ri fetch ishlatiling

### Database Qo'shish

Hozirda database yo'q. Keyinchalik:

1. PostgreSQL o'rnating
2. SQLAlchemy models yarating (`backend/app/models.py`)
3. Connection o'rnatish (`backend/app/database.py`)
4. Endpointlarni yangilang

### AI Integration

Hozirda AI yo'q. Keyinchalik:

1. OpenAI yoki Google Cloud API ishlatishingiz mumkin
2. `backend/app/services/ai_service.py` yarating
3. Chat endpointni AI ga ulashingiz mumkin

---

## Foydali Ma'lumotlar

### Project Type Options (Investment)

```python
ROI_MAP = {
    "granite-processing": "Granit qayta ishlash",
    "marble-processing": "Marmar qayta ishlash",
    "quarry-development": "Kon ochish",
    "souvenir-factory": "Suvenir ishlab chiqarish",
    "export-line": "Eksport liniyasi",
}
```

### Quick Questions (Chat)

```typescript
const quickQuestions = [
  "Marmar nma?",
  "Investitsiya qanday qilinadi?",
  "Konlar qayerda?",
  "Mahsulotlar narxi qancha?",
];
```

### Default Responses

```typescript
const defaultResponses: Record<string, string> = {
  "marmar": "Marmar - tabiiy tosh bo'lib, ohaktoshdan hosil bo'ladi...",
  "investitsiya": "Investitsiya qilish uchun /investment sahifasiga o'ting...",
  "konlar": "G'ozg'on konlari Navoiy viloyatida joylashgan...",
  "mahsulotlar": "Mahsulotlar narxi turiga qarab $45-$85/m² atrofida...",
};
```

### Map Data

```typescript
const mapData = {
  quarries: [
    { id: 1, name: "G'ozg'on-1", x: 200, y: 180, reserves: "2.5M m³", type: "Marmar" },
    { id: 2, name: "G'ozg'on-2", x: 280, y: 160, reserves: "1.8M m³", type: "Marmar" },
    { id: 3, name: "Ko'kpatas", x: 150, y: 220, reserves: "3.2M m³", type: "Granit" },
    { id: 4, name: "Zarband", x: 320, y: 200, reserves: "1.5M m³", type: "Marmar" },
  ],
  factories: [
    { id: 1, name: "G'ozg'on-1 Zavodi", x: 250, y: 200, capacity: "100,000 m²/yil" },
    { id: 2, name: "Granit sexi", x: 180, y: 240, capacity: "50,000 m²/yil" },
  ]
};
```

---

## Keyingi Qadamlar

1. **FastAPI ga o'tish**: Hozirgi Flask kodini FastAPI ga ko'chiring
2. **Real APIlar yaratish**: Products, Quarries, Investments endpointlari
3. **Database o'rnatish**: PostgreSQL + SQLAlchemy
4. **AI integration**: OpenAI yoki Google Cloud NLP