/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './lib/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0B0F1A',
        panel: '#111827',
        card: '#151B2B',
        gold: '#D4AF37',
        goldSoft: '#F0D875',
        copy: '#F6F7FB',
        muted: '#98A2B3',
        line: 'rgba(255,255,255,0.1)',
      },
      boxShadow: {
        premium: '0 24px 70px rgba(0,0,0,0.38)',
        gold: '0 14px 34px rgba(212,175,55,0.2)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
      },
      fontSize: {
        'title-lg': ['30px', { lineHeight: '1.35', fontWeight: '700' }],
        'title-md': ['28px', { lineHeight: '1.4', fontWeight: '600' }],
        'title-sm': ['24px', { lineHeight: '1.4', fontWeight: '600' }],
        'subtitle-lg': ['18px', { lineHeight: '1.5', fontWeight: '400' }],
        'subtitle-md': ['16px', { lineHeight: '1.5', fontWeight: '400' }],
        'subtitle-sm': ['14px', { lineHeight: '1.6', fontWeight: '400' }],
      },
      borderRadius: {
        'ios-lg': '16px',
        'ios-md': '14px',
        'ios-sm': '12px',
      },
      minHeight: {
        'cta': '52px',
        'cta-lg': '56px',
      },
    },
  },
  plugins: [],
};