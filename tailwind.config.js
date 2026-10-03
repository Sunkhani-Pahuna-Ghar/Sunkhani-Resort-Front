/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        pine: { DEFAULT: '#2F4A3B', dark: '#20332A', light: '#3E6350' },
        clay: { DEFAULT: '#B5651D', dark: '#8F4F16' },
        marigold: { DEFAULT: '#D9A441', light: '#E6BE6E' },
        stone: { DEFAULT: '#EDE6D6', dark: '#E3DAC5' },
        ink: { DEFAULT: '#2A2420', light: '#514738' },
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
