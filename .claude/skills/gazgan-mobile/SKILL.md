---
name: gazgan-mobile
description: Work on the Gazgan Flutter mobile app. Use when asked about the mobile/native app, Flutter, Dart, Android/iOS build, APK, Supabase mobile data, mobile reports, or anything under mobil/.
allowed-tools: Bash(flutter *) Bash(dart *) Bash(cd mobil *) Bash(cp *) Bash(mkdir *) Bash(python *) Read Edit Glob Grep
---

# Gazgan Mobile Flutter

Treat mobil/ as a standalone Flutter app. Do not import code from frontend/, miniapp/, admin/, or backend/.

## Quick Reference

| What | Where |
|---|---|
| Entry point | mobil/lib/main.dart |
| Theme | mobil/lib/app/app_theme.dart (GazganColors) |
| Router | mobil/lib/app/ (go_router) |
| Supabase | mobil/lib/core/supabase_bootstrap.dart |
| Repositories | mobil/lib/repositories/ |
| Home screen | mobil/lib/features/home/home_screen.dart |
| AI Chat | mobil/lib/features/chat/ai_chat_sheet.dart |
| Products | mobil/lib/screens/products_screen.dart |
| Projects | mobil/lib/screens/projects_screen.dart |

## APK Build

Build command:

    cd mobil
    flutter build apk --release --dart-define SUPABASE_URL=https://ynkzcezrohjwirapxkeq.supabase.co --dart-define SUPABASE_PUBLISHABLE_KEY=eyJhbGciOi...
    cp build/app/outputs/flutter-apk/app-release.apk ../apk_builds/Gazgan Invest.apk

## AI Chat

Connects to https://gazgan-invest.vercel.app/api/chat via dart:io HttpClient.
Floating button is _FloatingAiButton (Icons.smart_toy_rounded + bolt badge).
If chat fails, check:
1. Vercel frontend deploy (GROQ_API_KEY must be set)
2. Network connectivity on device
3. API response format: { response, source }

## Verification

    cd mobil && flutter analyze
