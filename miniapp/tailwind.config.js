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
    },
  },
  plugins: [],
};
