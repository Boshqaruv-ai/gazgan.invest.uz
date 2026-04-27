# G'ozg'on Investitsion Portali: Strukturalangan Kontent Rejasi va Sahifalar Xaritasi (Sitemap)

## Kirish

Ushbu hujjat G'ozg'on marmar va granit investitsion portalining to'liq strukturasini, har bir sahifada joylashadigan ma'lumotlarni va investorlarning platformadagi harakatlanish yo'lini (User Journey) belgilab beradi. Senyor dasturchi va arxitektor sifatida, bu hujjat sizga ma'lumotlar bazasi modellarini (Strapi CMS da) to'g'ri qurish va frontend komponentlarini (Next.js da) aniq rejalashtirish imkonini beradi.

## 1. Sahifalar Xaritasi (Sitemap)

Portalning umumiy tuzilishi quyidagi asosiy bo'limlardan iborat bo'ladi:

1.  **Bosh Sahifa (Home)**
2.  **Konlar va Zaxiralar (Quarries & Reserves)**
    *   Marmar konlari
    *   Granit konlari
3.  **Ishlab Chiqarish va Texnologiyalar (Production & Technology)**
    *   Qayta ishlash sexlari
    *   Uskunalar va texnologiyalar
4.  **Mahsulotlar Katalogi (Products Catalog)**
    *   Marmar plitalar va bloklar
    *   Granit plitalar va bloklar
    *   Suvenir va hunarmandchilik buyumlari
5.  **Investitsiya Imkoniyatlari (Investment Opportunities)**
    *   Soliq va bojxona imtiyozlari
    *   Logistika va infratuzilma
    *   Investitsiya loyihalari (Kalkulyator bilan)
6.  **Biz Haqimizda (About Us)**
    *   G'ozg'on tarixi va salohiyati
    *   Aloqa va manzillar
7.  **Investor Kabineti (Investor Dashboard - Auth Required)**
    *   Saqlangan loyihalar
    *   Hujjatlar va shartnomalar
    *   AI Konsultant bilan yozishmalar tarixi

## 2. Har Bir Sahifa Uchun Kontent Rejasi

Quyida har bir sahifada qanday ma'lumotlar va elementlar bo'lishi kerakligi batafsil keltirilgan. Bu ma'lumotlar Strapi CMS da yaratiladigan modellarga to'g'ridan-to'g'ri mos keladi.

### 2.1. Bosh Sahifa (Home)

Bosh sahifa investorning birinchi taassurotini shakllantiradi. U vizual jihatdan boy va ma'lumotga to'la bo'lishi kerak.

*   **Hero Section (Asosiy qism):** G'ozg'on konlarining yuqori sifatli, to'liq ekranli videosi (background video). Qisqa va ta'sirchan sarlavha (masalan, "G'ozg'on: O'zbekistonning Marmar va Granit Yuragi"). "Investitsiya qilish" va "Katalogni ko'rish" kabi asosiy harakatga chorlovchi (CTA) tugmalar.
*   **Raqamlarda G'ozg'on (Statistika):** Yillik qazib olish hajmi, tasdiqlangan zaxiralar miqdori, eksport qilinadigan davlatlar soni kabi ishonch uyg'otuvchi raqamlar (animatsiya bilan).
*   **Nima uchun G'ozg'on? (Afzalliklar):** Noyob ranglar va teksturalar, davlat tomonidan qo'llab-quvvatlash (imtiyozlar), qulay logistika kabi asosiy afzalliklarning qisqacha tavsifi (ikonkalar bilan).
*   **Interaktiv Xarita:** O'zbekiston xaritasida G'ozg'onning joylashuvi, temir yo'l va avtomobil yo'llari tugunlari ko'rsatilgan interaktiv xarita.
*   **AI Konsultant Vidjeti:** Ekranning pastki o'ng burchagida doimiy ko'rinib turuvchi, investor savollariga javob berishga tayyor AI chatbot vidjeti.

### 2.2. Konlar va Zaxiralar (Quarries & Reserves)

Bu sahifa xomashyo manbalari haqida to'liq texnik ma'lumot beradi.

*   **Konlar Ro'yxati:** Har bir kon (marmar va granit) uchun alohida kartochkalar. Kartochkada konning nomi, joylashuvi va asosiy xususiyatlari.
*   **Batafsil Kon Sahifasi (Dynamic Route):**
    *   **Geologik ma'lumotlar:** Tasdiqlangan zaxiralar hajmi, toshning yoshi, qatlamlar qalinligi.
    *   **Fizik-mexanik xususiyatlar:** Zichlik, suv shimuvchanlik, sovuqqa chidamlilik, nurashga bardoshlilik (jadvallar ko'rinishida).
    *   **Media:** Konning 4K rasmlari, dron orqali olingan videolar va **360-darajali virtual tur**.
    *   **Qazib olish texnologiyasi:** Qanday uskunalar (masalan, simli arralar) ishlatilishi haqida ma'lumot.

### 2.3. Ishlab Chiqarish va Texnologiyalar (Production & Technology)

Investorlar xomashyo qanday qayta ishlanishini ko'rishlari kerak.

*   **Sexlar haqida ma'lumot:** Mavjud qayta ishlash zavodlari, ularning yillik quvvati (kvadrat metr hisobida).
*   **Uskunalar Parki:** Italiya, Xitoy yoki boshqa davlatlardan keltirilgan zamonaviy dastgohlar (kesish, silliqlash, jilolash) ro'yxati va ularning texnik imkoniyatlari.
*   **Sifat Nazorati:** Mahsulot sifatini tekshirish jarayonlari (AI yordamida sifat nazorati haqida eslatma).
*   **Video Ekskursiya:** Sexlar ichidagi ish jarayonini ko'rsatuvchi professional videolar.

### 2.4. Mahsulotlar Katalogi (Products Catalog)

Bu sahifa e-commerce saytlariga o'xshash, qulay qidiruv va filtrlash tizimiga ega bo'lishi kerak.

*   **Kategoriyalar:** Marmar, Granit, Suvenir buyumlar.
*   **Filtrlar:** Rangi (oq, pushti, kulrang, qora), o'lchami (blok, slaby, plitka), qalinligi, ishlov berish turi (jilolangan, kuydirilgan).
*   **Mahsulot Kartochkasi:** Yuqori sifatli rasm (zoom imkoniyati bilan), nomi, qisqacha tavsifi.
*   **Batafsil Mahsulot Sahifasi:**
    *   Katta rasmlar galereyasi.
    *   Texnik xususiyatlar (kon sahifasidan olingan ma'lumotlar bilan bog'langan).
    *   Qo'llanilish sohalari (fasad, interyer, landshaft dizayni) bo'yicha tavsiyalar va namunaviy rasmlar.
    *   "Narxni hisoblash" yoki "Namuna buyurtma qilish" tugmalari.

### 2.5. Investitsiya Imkoniyatlari (Investment Opportunities)

Bu sahifa bevosita investorlarni jalb qilishga qaratilgan.

*   **Davlat Imtiyozlari:** Erkin iqtisodiy zonalar (EIZ) maqomi, soliq (foyda, mulk, yer soliqlari) va bojxona to'lovlaridan ozod qilish shartlari va muddatlari.
*   **Logistika va Infratuzilma:** Temir yo'l stansiyalarigacha masofa, elektr energiyasi, gaz va suv ta'minoti quvvatlari haqida aniq ma'lumotlar.
*   **Tayyor Investitsiya Loyihalari:** Taklif etilayotgan aniq loyihalar (masalan, "Yangi granit qayta ishlash sexini qurish"). Har bir loyiha uchun talab etiladigan summa, kutilayotgan ROI (daromadlilik) va qoplash muddati.
*   **Interaktiv Investitsiya Kalkulyatori:** Investor o'z mablag'ini kiritib, turli ssenariylar bo'yicha taxminiy foydani hisoblab ko'rishi mumkin bo'lgan AI-ga asoslangan vosita.

### 2.6. Biz Haqimizda va Aloqa (About Us & Contact)

*   **Tarix va Missiya:** G'ozg'on toshlarining tarixi (masalan, qaysi mashhur binolarda ishlatilgani) va kelajakdagi maqsadlar.
*   **Rahbariyat/Jamoa:** Loyiha tashabbuskorlari yoki mahalliy hokimiyat vakillari haqida ma'lumot (ishonch uyg'otish uchun).
*   **Aloqa Ma'lumotlari:** Manzil, telefon raqamlari, elektron pochta, ijtimoiy tarmoqlar.
*   **Qayta Aloqa Formasi:** Investorlar o'z so'rovlarini qoldirishlari uchun qulay forma.

## Xulosa

Ushbu strukturalangan kontent rejasi G'ozg'on investitsion portalining "skeleti" hisoblanadi. Senyor dasturchi sifatida siz ushbu strukturani Strapi CMS da modellar (Collection Types va Single Types) sifatida yaratishingiz va Next.js da har bir sahifa uchun mos keluvchi komponentlarni (pages/app router) ishlab chiqishingiz kerak bo'ladi. Keyingi bosqichda ushbu sahifalarga AI agentlarini qanday integratsiya qilish ssenariylarini ko'rib chiqamiz.
