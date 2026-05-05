# CLAUDE.md

## Bu loyiha haqida
Gazgan Investitsion Portali — marmar va granit investitsiyalari.

## Platformalar
1. frontend/  — Asosiy veb-portal (gazgan-invest.vercel.app)
2. admin/    — Admin panel (gazgan-invest-admin.vercel.app)
3. miniapp/  — Telegram Mini App
4. mobil/    — Flutter mobil ilova
5. backend/  — Python FastAPI

## Muhim qoidalar
- UI matnlar O'zbekcha
- frontend/ va miniapp/ mustaqil
- Supabase service role faqat server-side
- APK build --dart-define orqali
- APK saqlash: apk_builds/Gazgan Invest.apk
- Git commit faqat soraganda

## APK build komandasi
cd mobil
flutter build apk --release --dart-define SUPABASE_URL=... --dart-define SUPABASE_PUBLISHABLE_KEY=...
cp build/app/outputs/flutter-apk/app-release.apk ../apk_builds/Gazgan Invest.apk

Batafsil: AGENTS.md