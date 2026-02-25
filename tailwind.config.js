/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        petpooja: {
          orange: '#FF6B35',
          'orange-light': '#FF8F66',
          'orange-dark': '#E55A2B',
        }
      }
    },
  },
  plugins: [],
}
