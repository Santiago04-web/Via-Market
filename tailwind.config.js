/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#0866FF',
          deep: '#071A35',
          dark: '#080D18',
          light: '#F4F7FC',
          glow: '#00D2FF',
          accent: '#2563EB',
          surface: '#0F1E36',
          card: '#0c1626',
          border: '#1E2D4A'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 25px -5px rgba(8, 102, 255, 0.4)',
        'glow-lg': '0 0 50px -10px rgba(8, 102, 255, 0.35)',
        'premium': '0 20px 40px -15px rgba(7, 26, 53, 0.5)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
