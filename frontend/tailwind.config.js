/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#e6f0ff',
          100: '#b3d1ff',
          200: '#80b3ff',
          300: '#4d94ff',
          400: '#1a75ff',
          500: '#0a5eff',
          600: '#0052cc',
          700: '#003d99',
          800: '#002966',
          900: '#001433',
        },
        surface: {
          0: '#08090a',
          50: '#0f1114',
          100: '#161a1f',
          200: '#1c2128',
          300: '#232930',
          400: '#2a3138',
          500: '#353d45',
        },
        accent: {
          green: '#00d68f',
          blue: '#0a5eff',
          cyan: '#00c8ff',
          gold: '#ffd700',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'data-flow': 'dataFlow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        dataFlow: {
          '0%': { opacity: '0', transform: 'translateX(-10px)' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0', transform: 'translateX(10px)' },
        },
      },
    },
  },
  plugins: [],
}