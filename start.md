# G'ozg'on Investitsiya Kalkulyatori (2026)

**Dastur Mulalifi**: Nurmurodov Damir

---

## Ishga tushirish buyruqlari

### Backend (Flask)

```bash
cd backend

# Virtual muhit yaratish (birinchi marta)
python -m venv venv

# Virtual muhitni faollashtirish
venv\Scripts\activate

# Bog'liqlarni o'rnatish
pip install -r requirements.txt

# Serverni ishga tushirish
python app.py
```

**Backend**: http://localhost:8000

---

### Frontend (Next.js)

```bash
cd frontend

# Bog'liqlarni o'rnatish
npm install

# Render qilish rejimida ishlash
npm run dev
```

**Frontend**: http://localhost:3000
**Kalkulyator sahifasi**: http://localhost:3000/investment

---

### Muhit o'zgaruvchilari

**.env.local** fayli yarating (frontend papkasida):

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```