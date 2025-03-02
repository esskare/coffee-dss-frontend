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
      colors:{
        'secondary-400-main':'#85B654',
        'primary-800-main':'#1E4938',
        'primary-500-neutral':'#222222',
        'accent-pastel-green':'#E7F9F5',
        'accent-pastel-tangerine':'#FFEFE8',
        'accent-pastel-violet':'#F7EBFD',
        'accent-pastel-violet1':'#F7EBFD',
        'custom-grey':'#F7F7F7',
        'custom-grey2':'#E7E7E7'
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

