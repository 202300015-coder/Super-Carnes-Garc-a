/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
    "./src/*.{js,ts,jsx,tsx,vue}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8B0000',
          50: '#FFE5E5',
          100: '#FFB8B8',
          200: '#FF8A8A',
          300: '#FF5C5C',
          400: '#FF2E2E',
          500: '#FF0000',
          600: '#8B0000',
          700: '#5D0000',
          800: '#2F0000',
          900: '#010000'
        },
        secondary: {
          DEFAULT: '#1a1a1a',
          light: '#4a4a4a',
          dark: '#0a0a0a'
        }
      },
      fontFamily: {
        sans: ['Inter var', 'sans-serif'],
        display: ['Montserrat', 'sans-serif']
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ],
}