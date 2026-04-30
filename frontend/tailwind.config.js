/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0B0F1A',
        secondary: '#111827',
        accent: '#F5C044',
        accentLight: '#FFE29A',
        dark: '#0B0F1A',
        card: 'rgba(255,255,255,0.03)',
        line: 'rgba(255,255,255,0.08)',
        copy: '#EAEAF0',
        muted: '#A0A4B8',
        marble: '#f5f0e8',
        granite: '#4a4a5a',
      },
      boxShadow: {
        premium: '0 24px 80px rgba(0,0,0,0.34)',
        gold: '0 18px 45px rgba(245,192,68,0.18)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-gold': 'pulseGold 2s infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
      },
      keyframes: {
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(201,168,76,0.4)' },
          '50%': { boxShadow: '0 0 0 15px rgba(201,168,76,0)' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
