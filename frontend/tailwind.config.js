/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        cigar: {
          bg: '#1a1410',
          card: '#2a2118',
          'card-hover': '#342a20',
          accent: '#d4a574',
          'accent-light': '#e8c49a',
          text: '#f5f0eb',
          'text-secondary': '#a89888',
          success: '#6b8e4e',
          star: '#e8b84b',
          danger: '#c45c4a',
          border: '#3a3028',
        },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0, 0, 0, 0.3)',
        'card-hover': '0 4px 16px rgba(0, 0, 0, 0.4)',
      },
    },
  },
  plugins: [],
};
