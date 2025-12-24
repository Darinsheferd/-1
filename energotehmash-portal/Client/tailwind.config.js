/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#ecf8ff',
          100: '#d4edff',
          200: '#a8d9ff',
          300: '#74c1ff',
          400: '#3ba5ff',
          500: '#0d82e6',
          600: '#0065b4',
          700: '#005094',
          800: '#003b6b',
          900: '#022848',
        },
      },
      boxShadow: {
        soft: '0 18px 45px rgba(15,23,42,0.45)',
      },
    },
  },
  plugins: [],
};
