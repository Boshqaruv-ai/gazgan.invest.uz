# G'ozg'on Investitsion Portali: Interaktiv Elementlar va AI Agentlari Muloqot Ssenariylari

## Kirish

Ushbu hujjat G'ozg'on marmar va granit investitsion portalida investorlar bilan o'zaro aloqani kuchaytiruvchi interaktiv elementlar va sun'iy intellekt (AI) agentlarining muloqot ssenariylarini batafsil yoritadi. Maqsad, investorlarga maksimal darajada qulaylik yaratish, ularning savollariga tezkor javob berish va investitsiya qarorlarini qabul qilishda yordam berishdir. Senyor dasturchi sifatida, bu ssenariylar AI xizmatlarini (Google Cloud AI / OpenAI API) backendga (FastAPI) va frontendga (Next.js, Telegram Mini App) integratsiya qilish uchun asos bo'lib xizmat qiladi.

## 1. AI Agentlari Muloqot Ssenariylari

AI agentlari portalning asosiy qismi bo'lib, investorlarga shaxsiylashtirilgan va aqlli yordam beradi.

### 1.1. Aqlli Konsultant (Chatbot)

**Maqsad:** Investorlarning umumiy savollariga tezkor va aniq javob berish, ularni kerakli ma'lumotlarga yo'naltirish.

**Ssenariy:**
1.  **Investor savoli:** Investor portalning istalgan sahifasida chatbot vidjetini ochadi va savol beradi: "G'ozg'on marmarining asosiy turlari qaysilar?" yoki "O'zbekistonda investitsiya qilish uchun qanday imtiyozlar bor?"
2.  **AI tahlili:** Chatbot (Google Cloud Natural Language API yoki OpenAI GPT asosida) savolni tahlil qiladi va tegishli ma'lumotlar bazasidan (Strapi CMS, PostgreSQL) javobni qidiradi.
3.  **Javob berish:** Chatbot qisqa va aniq javob beradi, masalan: "G'ozg'on marmarining asosiy turlari oq, pushti va kulrang marmarlardir. Batafsil ma'lumotni 'Konlar va Zaxiralar' sahifasida topishingiz mumkin." va shu sahifaga havola beradi.
4.  **Murakkab savollar:** Agar savol murakkab bo'lsa va chatbot javob bera olmasa, u investorga aloqa formasini to'ldirishni yoki menejer bilan bog'lanishni taklif qiladi.

### 1.2. Investitsiya Kalkulyatori Agenti

**Maqsad:** Investorlarga potentsial investitsiya daromadliligi va qaytish muddatini hisoblashda yordam berish.

**Ssenariy:**
1.  **Investor ma'lumot kiritadi:** Investor "Investitsiya Imkoniyatlari" sahifasidagi interaktiv kalkulyatorga o'zining investitsiya miqdorini (masalan, 1 000 000 USD) va qiziqish sohasini (masalan, "granitni qayta ishlash sexini qurish") kiritadi.
2.  **AI hisob-kitobi:** Kalkulyator agenti (backendda FastAPI orqali ishlaydi) mavjud ma'lumotlar (o'rtacha ishlab chiqarish xarajatlari, bozor narxlari, soliq imtiyozlari) asosida taxminiy ROI (Return on Investment) va investitsiyaning qaytish muddatini hisoblaydi.
3.  **Natijani taqdim etish:** Kalkulyator natijalarni grafiklar va jadvallar ko'rinishida taqdim etadi, masalan: "Sizning 1 000 000 USD miqdoridagi investitsiyangizdan kutilayotgan yillik daromad 20% ni tashkil etadi va investitsiya 5 yilda qoplanadi." Natijalar turli ssenariylar (optimistik, realist, pessimistik) bo'yicha ham ko'rsatilishi mumkin.

### 1.3. Hujjatlar Agenti

**Maqsad:** Investorlarga kerakli huquqiy va rasmiy hujjatlar bo'yicha yo'l-yo'riq ko'rsatish, ularni tayyorlashda yordam berish.

**Ssenariy:**
1.  **Investor so'rovi:** Investor "Investor Kabineti" dan yoki chatbot orqali "EIZ (Erkin Iqtisodiy Zona) rezidenti bo'lish uchun qanday hujjatlar kerak?" deb so'raydi.
2.  **AI javobi:** Hujjatlar agenti (backendda ishlaydi) EIZ rezidenti bo'lish uchun zarur bo'lgan hujjatlar ro'yxatini (masalan, ariza, biznes-reja, ta'sis hujjatlari) taqdim etadi.
3.  **Namuna va yo'riqnoma:** Agent har bir hujjat uchun namuna shakllarini yuklab olish havolasini beradi va ularni to'ldirish bo'yicha qisqa yo'riqnoma (masalan, "Biznes-rejada quyidagilar aks etishi kerak...") beradi.
4.  **Eslatmalar:** Agent hujjatlarni topshirish muddatlari va tegishli davlat organlari haqida ham ma'lumot beradi.

## 2. Interaktiv Elementlar

AI agentlaridan tashqari, portalda investorlarning tajribasini boyituvchi boshqa interaktiv elementlar ham bo'ladi.

### 2.1. Interaktiv Xarita

**Maqsad:** G'ozg'onning geografik joylashuvi, konlar, ishlab chiqarish sexlari va logistika infratuzilmasini vizual tarzda ko'rsatish.

**Funksionallik:**
*   **Zoom va Pan:** Foydalanuvchi xaritani kattalashtirishi, kichraytirishi va harakatlantirishi mumkin.
*   **Layerlar:** Konlar, sexlar, temir yo'l stansiyalari, avtomobil yo'llari kabi turli qatlamlarni yoqish/o'chirish imkoniyati.
*   **Pop-up ma'lumotlar:** Xaritadagi ob'ekt ustiga bosilganda, uning haqida qisqa ma'lumot (nomi, manzili, asosiy xususiyatlari) ko'rsatiladi.

### 2.2. 360-Darajali Virtual Tur

**Maqsad:** Investorlarga konlar va sexlar bo'ylab realistik virtual ekskursiya qilish imkonini berish.

**Funksionallik:**
*   **Navigatsiya:** Foydalanuvchi virtual tur ichida harakatlanishi, turli nuqtalarga o'tishi mumkin.
*   **Informatsion nuqtalar (Hotspots):** Muhim joylarda (masalan, marmar bloki, kesish dastgohi) informatsion nuqtalar joylashtiriladi. Ularga bosilganda, ob'ekt haqida matnli ma'lumot, rasm yoki qisqa video ko'rsatiladi.
*   **Ovozli yo'riqnoma:** AI Virtual Ekskursiya Agenti tomonidan ovozli yo'riqnoma beriladi.

### 2.3. Mahsulotlar Katalogi (Filtrlar va Qidiruv)

**Maqsad:** Investorlarga kerakli mahsulotlarni tez va oson topish imkonini berish.

**Funksionallik:**
*   **Kengaytirilgan Filtrlar:** Rangi, o'lchami, qalinligi, ishlov berish turi, koni bo'yicha filtrlash.
*   **Matnli Qidiruv:** Mahsulot nomi yoki tavsifi bo'yicha qidiruv.
*   **Natijalarni Saralash:** Narxi, nomi, yangiligi bo'yicha saralash.

### 2.4. Shaxsiylashtirilgan Dashboard (Investor Kabineti)

**Maqsad:** Ro'yxatdan o'tgan investorlar uchun shaxsiylashtirilgan ma'lumotlar va funksiyalarni taqdim etish.

**Funksionallik:**
*   **Saqlangan Loyihalar:** Investor qiziqqan investitsiya loyihalarini saqlashi va ularning holatini kuzatishi mumkin.
*   **Yuklab Olingan Hujjatlar:** Investor yuklab olgan barcha hujjatlar ro'yxati.
*   **AI Konsultant bilan Muloqot Tarixi:** Chatbot bilan bo'lgan barcha yozishmalar saqlanadi.
*   **Bildirishnomalar:** Yangi investitsiya imkoniyatlari, mahsulotlar yoki muhim yangiliklar haqida shaxsiylashtirilgan bildirishnomalar.

## Xulosa

Ushbu interaktiv elementlar va AI agentlari muloqot ssenariylari G'ozg'on investitsion portalini oddiy ma'lumot saytidan investorlar uchun aqlli va qimmatli vositaga aylantiradi. Senyor dasturchi sifatida siz ushbu ssenariylarni amalga oshirishda AI xizmatlari, backend API va frontend komponentlari o'rtasidagi uzluksiz integratsiyani ta'minlashingiz kerak. Bu investorlarning portal bilan o'zaro aloqasini sezilarli darajada yaxshilaydi va ularning investitsiya qarorlarini qabul qilish jarayonini soddalashtiradi.
