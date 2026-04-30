# G'ozg'on Investitsion Portali - Texnik Spetsifikatsiyalar

---

## Loyiha Umumiy Ma'lumot

| Xususiyat | Qiymat |
|-----------|---------|
| Loyiha nomi | G'ozg'on Investitsion Portali |
| Platforma | Web + Telegram Mini App |
| Maqsad | Marmar va granit investitsiyalari portalini yaratish |
| Til | O'zbekcha (asosiy) |
| Target user | Investorlar |

---

## Frontend Texnik Spetsifikatsiyalar

### Framework va Toolkit

- **Framework**: Next.js 14.2.3 (App Router)
- **Til**: TypeScript 5.4.5
- **Styling**: Tailwind CSS 3.4.3
- **State Management**: Zustand 4.5.2
- **Icons**: Lucide React 0.378.0

### Loyiha Strukturasi (Frontend)

```
frontend/src/
├── app/                    # Next.js pages (App Router)
│   ├── page.tsx            # Home page
│   ├── layout.tsx         # Root layout
│   ├── globals.css        # Global styles
│   ├── about/           # About page
│   ├── api/            # API utilities
│   ├── chat/           # Chat page
│   ├── dashboard/      # Dashboard page
│   ├── investment/     # Investment page
│   ├── production/     # Production page
│   ├── products/      # Products page
│   └── quarries/       # Quarries page
├── components/            # Reusable components
│   ├── ChatWidget.tsx      # AI chatbot
│   ├── AnimatedCounter.tsx   # Animated counter
│   ├── home/              # Home page components
│   ├── layout/            # Layout components
│   ├── products/          # Product components
│   ├── quarries/          # Quarry components
│   └── ui/               # UI components
├── features/              # Feature modules
│   └── home/              # Home features
│       └── components/      # Feature components
├── lib/                 # Utilities
│   ├── api.ts            # API client
│   └── data.ts          # Static data
└── types/               # TypeScript types
```

### Asosiy Sahifalar

1. **Home** (`/`) - Bosh sahifa
2. **Dashboard** (`/dashboard`) - Investor kabineti
3. **Investment** (`/investment`) - Investitsiya imkoniyatlari
4. **Products** (`/products`) - Mahsulotlar katalogi
5. **Quarries** (`/quarries`) - Konlar
6. **Production** (`/production`) - Ishlab chiqarish
7. **About** (`/about`) - Biz haqimizda

### UI Componentlari

| Komponent | Fayl | Holat |
|----------|------|-------|
| ChatWidget | `components/ChatWidget.tsx` | ✅ Bajarilgan |
| HeroSection | `features/home/components/HeroSection.tsx` | ✅ Bajarilgan |
| StatsSection | `features/home/components/StatsSection.tsx` | ✅ Bajarilgan |
| AdvantagesSection | `features/home/components/AdvantagesSection.tsx` | ✅ Bajarilgan |
| MapSection | `features/home/components/MapSection.tsx` | ✅ Bajarilgan |
| CTASection | `features/home/components/CTASection.tsx` | ✅ Bajarilgan |
| AnimatedCounter | `components/AnimatedCounter.tsx` | ✅ Bajarilgan |
| Button | `components/ui/Button.tsx` | ✅ Bajarilgan |

### Styling (Tailwind)

```javascript
// tailwind.config.js
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0f0f1a',
        secondary: '#1a1a2e',
        accent: '#c9a84c',
        accentLight: '#e8d5a3',
        dark: '#0a0a14',
      },
    },
  },
  plugins: [],
}
```

### Global Styles

```css
/* globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --primary: #0f0f1a;
  --secondary: #1a1a2e;
  --accent: #c9a84c;
}

body {
  background: var(--primary);
  color: white;
}
```

---

## Backend Texnik Spetsifikatsiyalar

### Hozirgi Holat (Flask)

```python
# backend/requirements.txt
flask>=3.0.0
flask-cors>=5.0.0
```

### Rejalashtirilgan (FastAPI)

```python
# backend/requirements.txt (kelajakda)
fastapi>=0.100.0
uvicorn>=0.23.0
sqlalchemy>=2.0.0
pydantic>=2.0.0
python-jose>=3.3.0
passlib>=1.7.4
python-multipart>=0.0.6
psycopg2-binary>=2.9.0
openai>=1.0.0
google-cloud-language>=2.0.0
```

### API Endpoints (Hozirgi)

```python
# backend/app.py

# Investment Calculator
POST /api/investments/calculate
# Dashboard
GET /api/dashboard
POST /api/dashboard/save-project/<id>
GET /api/dashboard/notifications
POST /api/dashboard/notifications/<id>/read
```

### Rejalashtirilgan API

```python
# Products
GET    /api/products
GET    /api/products/{id}
POST   /api/products (admin only)

# Quarries
GET    /api/quarries
GET    /api/quarries/{id}

# Investments
GET    /api/investments
GET    /api/investments/{id}

# AI Chat
POST   /api/chat
POST   /api/chat/stream

# Documents
GET    /api/documents
GET    /api/documents/{id}

# Auth
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me
```

---

## Database Spetsifikatsiyalar

### Rejalashtirilgan (PostgreSQL)

```sql
-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    role VARCHAR(50) DEFAULT 'investor',
    created_at TIMESTAMP DEFAULT NOW()
);

-- Products table
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    name_uz VARCHAR(255),
    name_en VARCHAR(255),
    name_ru VARCHAR(255),
    description TEXT,
    price DECIMAL(10, 2),
    category VARCHAR(50),
    color VARCHAR(50),
    size VARCHAR(50),
    thickness VARCHAR(50),
    quarry_id INTEGER,
    image_url TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Quarries table
CREATE TABLE quarries (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    name_uz VARCHAR(255),
    name_en VARCHAR(255),
    name_ru VARCHAR(255),
    location VARCHAR(255),
    reserves VARCHAR(100),
    stone_type VARCHAR(50),
    coordinates JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Investments table
CREATE TABLE investments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    amount DECIMAL(15, 2),
    roi DECIMAL(5, 2),
    payback_years INTEGER,
    status VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Documents table
CREATE TABLE documents (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    title_uz VARCHAR(255),
    title_en VARCHAR(255),
    description TEXT,
    file_url TEXT,
    category VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Chat History table
CREATE TABLE chat_history (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    question TEXT NOT NULL,
    answer TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);
```

---

## Strapi CMS Spetsifikatsiyalar

### Rejalashtirilgan Content Types

1. **Products** - Mahsulotlar
2. **Quarries** - Konlar
3. **Factories** - Sexlar
4. **Investments** - Investitsiya loyihalari
5. **Documents** - Hujjatlar
6. **News** - Yangiliklar
7. **Pages** - Sahifalar
8. **Translations** - Tarjimalar

### Media

- S3 yoki CloudFront dan foydalanish
- Image optimization

---

## AI Integration Spetsifikatsiyalar

### Google Cloud NLP

```python
from google.cloud import language_v1

def analyze_text(text):
    client = language_v1.LanguageServiceClient()
    document = language_v1.Document(content=text, type_=language_v1.Document.Type.PLAIN_TEXT)
    response = client.analyze_sentiment(request={"document": document})
    return response
```

### OpenAI GPT

```python
import openai

openai.api_key = "your-api-key"

def chat_with_ai(prompt):
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}]
    )
    return response.choices[0].message.content
```

---

## Deployment Spetsifikatsiyalar

### Frontend (Vercel)

```
# vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs"
}
```

### Backend (AWS EC2)

- Instance: t3.medium
- OS: Ubuntu 22.04
- Python 3.11
- Nginx
- PM2

### Database (AWS RDS)

- PostgreSQL 15
- Instance: db.t3.micro
- Multi-AZ: false (boshlang'ich)

---

## Xavfsizlik Spetsifikatsiyalar

### Hozirgi

- CORS enabled (flask-cors)

### Rejalashtirilgan

- JWT authentication
- Rate limiting (100 req/min)
- Input validation (Pydantic)
- SQL injection prevention (SQLAlchemy)
- XSS prevention
- CSRF protection
- SSL/TLS

---

## Performance Targets

| Metric | Target |
|--------|-------|
| First Contentful Paint | < 1.5s |
| Time to Interactive | < 3s |
| Lighthouse Score | > 80 |
| API Response Time | < 200ms |
| Uptime | > 99.9% |

---

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)