/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html','./src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito Sans','sans-serif']
      },
      width: {
        '1/10': '10%',
        '2/10': '20%',
        '3/10': '30%',
        '7/10': '70%',
      },
      margin: {
        '1/10': '10%',
      },
      gridTemplateColumns: {
        '80/20': '80% 18%'
      }
    },
  },
  plugins: [],
}

