# G'ozg'on Investitsion Portali: Senyor Dasturchi va Software Architect Uchun Texnik Yo'l Xaritasi

## Kirish

Ushbu hujjat G'ozg'on marmar va granit investitsion portali loyihasini amalga oshirish uchun senyor dasturchi va dasturiy ta'minot arxitektori (Software Architect) uchun batafsil texnik yo'l xaritasini taqdim etadi. Loyiha avvalgi tahlillarga asoslanib, Next.js (Frontend), Python/FastAPI (Backend), PostgreSQL (Database), Strapi (Headless CMS) va AI xizmatlari (Google Cloud AI/OpenAI API) kabi texnologiyalarni o'z ichiga oladi. Ishlab chiqish bosqichma-bosqich, ya'ni avval veb-sayt va Telegram Mini App, so'ngra mobil ilova (keyingi bosqichda) shaklida amalga oshiriladi.

## 1. Loyihani Rejalashtirish va Arxitektura Dizayni (1-2 hafta)

### 1.1. Talablarni Yakuniy Tasdiqlash va Hujjatlashtirish

*   **Investor talablari:** Investorlar bilan yakuniy uchrashuvlar o'tkazib, barcha funksional va funksional bo'lmagan talablarni (xavfsizlik, ishlash, miqyoslilik, ko'p tillilik) tasdiqlash.
*   **Foydalanuvchi hikoyalari (User Stories):** Har bir funksiya uchun batafsil foydalanuvchi hikoyalarini yozish.
*   **Texnik spetsifikatsiyalar:** Har bir modul va komponent uchun texnik spetsifikatsiyalarni tayyorlash.

### 1.2. Yuqori Darajadagi Arxitektura Dizaynini Yakunlash

*   **Komponentlar diagrammasi:** Loyihaning asosiy komponentlari (Frontend, Backend, DB, CMS, AI Services) va ularning o'zaro aloqalarini aniq belgilash (Mermaid diagrammasi). [1]
*   **Ma'lumotlar oqimi diagrammasi (Data Flow Diagram):** Foydalanuvchi so'rovidan ma'lumotlar bazasiga va qaytib kelishigacha bo'lgan ma'lumotlar oqimini tasvirlash.
*   **Xavfsizlik arxitekturasi:** Autentifikatsiya, avtorizatsiya, ma'lumotlar shifrlash va boshqa xavfsizlik mexanizmlarini loyihalash.

### 1.3. Texnologik Stekni Yakuniy Tasdiqlash

*   **Freymvorklar va kutubxonalar:** Next.js, FastAPI, PostgreSQL, Strapi, Tailwind CSS, TypeScript kabi asosiy texnologiyalarni tasdiqlash.
*   **AI xizmatlari:** Google Cloud AI Platform va OpenAI API integratsiyasi bo'yicha qaror qabul qilish.

## 2. Infratuzilmani Sozlash va DevOps (2-3 hafta)

### 2.1. Bulut Infratuzilmasini Sozlash (AWS)

*   **AWS Account:** AWS hisobini sozlash va kerakli xizmatlarni (EC2, RDS, S3, CloudFront, IAM) faollashtirish.
*   **VPC (Virtual Private Cloud):** Xavfsiz va izolyatsiya qilingan tarmoq muhitini yaratish.
*   **RDS (Relational Database Service):** PostgreSQL ma'lumotlar bazasini AWS RDS da sozlash (replikatsiya va zaxiralash bilan).
*   **S3 (Simple Storage Service):** Media fayllar (rasmlar, videolar) uchun S3 bucketlarini yaratish.
*   **CloudFront (CDN):** Statik kontentni tez yetkazib berish uchun CDN ni sozlash.

### 2.2. CI/CD Quvurlarini Sozlash

*   **Kod ombori:** GitHub yoki GitLab da loyiha uchun kod omborini yaratish.
*   **GitHub Actions/GitLab CI:** Avtomatik testlash, qurish (build) va joylashtirish (deploy) quvurlarini sozlash.
    *   Frontend (Next.js) uchun Vercel ga avtomatik deploy.
    *   Backend (FastAPI) uchun AWS EC2/Lambda ga avtomatik deploy.
    *   Strapi CMS uchun AWS EC2 ga avtomatik deploy.

### 2.3. Monitoring va Loglash

*   **Prometheus va Grafana:** Server va ilova ishlashini kuzatish uchun sozlash.
*   **Sentry:** Xatolarni kuzatish va ogohlantirishlar yuborish uchun integratsiya qilish.
*   **Markazlashgan loglash:** ELK Stack (Elasticsearch, Logstash, Kibana) yoki AWS CloudWatch kabi yechimlarni sozlash.

## 3. Backend Ishlab Chiqish (4-6 hafta)

### 3.1. FastAPI Backendni Ishlab Chiqish

*   **Loyihani sozlash:** FastAPI loyihasini yaratish, asosiy konfiguratsiyalarni sozlash.
*   **Ma'lumotlar bazasi integratsiyasi:** SQLAlchemy (ORM) yordamida PostgreSQL bilan aloqani o'rnatish.
*   **API endpointlarini yaratish:** Investorlar, mahsulotlar, konlar, sexlar, suvenir buyumlar va boshqa resurslar uchun RESTful API endpointlarini ishlab chiqish.
*   **Autentifikatsiya va Avtorizatsiya:** JWT asosidagi autentifikatsiya va avtorizatsiya mexanizmlarini amalga oshirish.
*   **Xavfsizlik choralari:** Rate limiting, CORS, XSS/CSRF himoyasini integratsiya qilish.

### 3.2. Strapi Headless CMS ni Sozlash

*   **O'rnatish va konfiguratsiya:** Strapi ni AWS EC2 ga o'rnatish va PostgreSQL bilan bog'lash.
*   **Kontent modellari:** Mahsulotlar, konlar, sexlar, suvenir buyumlar, yangiliklar, sahifalar kabi kontent turlari uchun modellarni yaratish.
*   **Ko'p tillilikni sozlash:** Strapi da ko'p tillilik funksiyasini faollashtirish va har bir kontent modeli uchun tarjima maydonlarini qo'shish.
*   **API ruxsatnomalari:** Frontend va mini ilova uchun Strapi API ga kirish ruxsatnomalarini sozlash.

### 3.3. AI Xizmatlari Integratsiyasi

*   **Aqlli Konsultant:** Google Cloud Natural Language API yoki OpenAI GPT modellari yordamida chatbot funksiyasini backendga integratsiya qilish.
*   **Avtomatik tarjima:** Google Cloud Translation API ni integratsiya qilish.
*   **Sifat tahlili:** Konlardan olingan rasmlarni tahlil qilish uchun AI modelini (masalan, TensorFlow/PyTorch asosida) ishlab chiqish yoki mavjud API dan foydalanish.
*   **Dinamik bozor tahlili:** Tashqi API lardan (agar mavjud bo'lsa) marmar/granit narxlari ma'lumotlarini olish va AI yordamida tahlil qilish.

## 4. Frontend (Veb-portal) Ishlab Chiqish (5-7 hafta)

### 4.1. Next.js Loyihasini Sozlash

*   **Loyihani yaratish:** Next.js loyihasini TypeScript va Tailwind CSS bilan sozlash.
*   **Asosiy sahifalar:** Bosh sahifa, mahsulotlar, konlar, sexlar, suvenir buyumlar, investorlar uchun sahifalar, aloqa sahifasini yaratish.
*   **Navigatsiya va marshrutlash:** Next.js router yordamida navigatsiyani amalga oshirish.

### 4.2. UI/UX Dizaynini Amalga Oshirish

*   **Komponentlarni yaratish:** Tailwind CSS yordamida qayta ishlatiladigan UI komponentlarini (tugmalar, kartochkalar, formalar, navigatsiya elementlari) yaratish.
*   **Responsive dizayn:** Barcha sahifalarni mobil, planshet va desktop qurilmalariga moslashuvchan qilish.
*   **Interaktiv elementlar:** Mahsulotlar katalogi (filtrlar, qidiruv), narxlar kalkulyatori, qayta aloqa formalarini ishlab chiqish.
*   **Media galereya:** Yuqori sifatli rasmlar va videolar uchun galereya, 360-darajali video-ekskursiya pleerini integratsiya qilish.

### 4.3. Backend API bilan Integratsiya

*   **Ma'lumotlarni olish:** Backend API dan ma'lumotlarni (mahsulotlar, konlar, yangiliklar) asinxron tarzda olish va sahifalarda ko'rsatish.
*   **Ma'lumotlarni yuborish:** Qayta aloqa formalaridan ma'lumotlarni backendga yuborish.
*   **AI agentlari bilan muloqot:** Frontenddan AI chatbotga so'rovlar yuborish va javoblarni ko'rsatish.

### 4.4. Ko'p Tillilikni Amalga Oshirish

*   **next-i18n:** Next.js da ko'p tillilikni qo'llab-quvvatlash uchun kutubxonani integratsiya qilish.
*   **Tarjima fayllari:** Har bir til uchun tarjima fayllarini yaratish va Strapi dan dinamik tarjimalarni olish.

## 5. Telegram Mini App Ishlab Chiqish (3-4 hafta)

### 5.1. Telegram Mini App Loyihasini Sozlash

*   **Loyihani yaratish:** Telegram Mini App uchun loyihani sozlash (masalan, React/Vue asosida).
*   **Telegram API integratsiyasi:** Telegramning o'z API va SDK'laridan foydalanish.

### 5.2. Asosiy Funksionallikni Amalga Oshirish

*   **AI Chatbot:** Telegram Mini App ichida AI chatbot bilan muloqot funksiyasini yaratish.
*   **Qisqa ma'lumotlar:** Narxlar, yangiliklar, muhim e'lonlar kabi qisqa ma'lumotlarni ko'rsatish.
*   **Mahsulot katalogining soddalashtirilgan ko'rinishi:** Asosiy mahsulotlar haqida ma'lumot berish.
*   **Backend API bilan aloqa:** Veb-sayt bilan umumiy backend API dan foydalanish.

## 6. Testlash va Sifat Nazorati (3-4 hafta)

### 6.1. Testlash Strategiyasi

*   **Unit Testlar:** Frontend (Jest, React Testing Library) va Backend (Pytest) uchun unit testlarni yozish.
*   **Integratsiya Testlar:** Backend API va Strapi o'rtasidagi, shuningdek, frontend va backend o'rtasidagi integratsiyani testlash.
*   **E2E (End-to-End) Testlar:** Cypress yoki Playwright yordamida butun ilovaning ishlashini testlash.
*   **Performance Testlar:** Saytning yuklanish tezligi va ishlashini (Lighthouse, Core Web Vitals) tekshirish va optimallashtirish.

### 6.2. Xavfsizlik Auditlari

*   **Penetration Testing:** Potentsial zaifliklarni aniqlash uchun xavfsizlik auditlarini o'tkazish.
*   **Kod reviziyasi:** Xavfsizlik bo'yicha eng yaxshi amaliyotlarga rioya qilinganligini tekshirish.

### 6.3. Ko'p Tillilik Testi

*   Har bir tilda kontentning to'g'ri ko'rsatilishini va AI tarjima xizmatlarining aniqligini tekshirish.

## 7. Deployment va Ishga Tushirish (1 hafta)

### 7.1. Yakuniy Deployment

*   Veb-saytni Vercel ga, backend va Strapi ni AWS ga to'liq joylashtirish.
*   Telegram Mini App ni Telegram platformasida ishga tushirish.

### 7.2. Monitoringni Faollashtirish

*   Prometheus, Grafana va Sentry kabi monitoring vositalarini faollashtirish va ogohlantirishlarni sozlash.

### 7.3. Domen va SSL Konfiguratsiyasi

*   Domen nomini sozlash va SSL sertifikatlarini o'rnatish.

## 8. Loyihani Qo'llab-quvvatlash va Kengaytirish (Doimiy)

### 8.1. Doimiy Monitoring va Optimallashtirish

*   Tizim ishlashini doimiy kuzatish va kerakli optimallashtirishlarni amalga oshirish.

### 8.2. Yangi Funksiyalar va Mobil Ilova

*   Foydalanuvchi fikr-mulohazalari asosida yangi funksiyalarni qo'shish.
*   Ikkinchi bosqichda mobil ilovani (iOS/Android) ishlab chiqishni boshlash.

## Xulosa

Ushbu texnik yo'l xaritasi G'ozg'on investitsion portalini muvaffaqiyatli ishlab chiqish va ishga tushirish uchun Software Architect va senyor dasturchiga aniq ko'rsatmalar beradi. Har bir bosqichda puxta rejalashtirish, zamonaviy texnologiyalardan foydalanish va sifat nazoratiga e'tibor qaratish loyihaning uzoq muddatli muvaffaqiyatini ta'minlaydi. AI agentlarining integratsiyasi esa portalni investorlar uchun yanada jozibador va samarali vositaga aylantiradi.
