/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {// Add your color here
        customBlue: '#E4F1F3', 
        customHeaderBlue:'#C3D4E4',
        customCardBlue:'#E3F0FF' ,
        customBlueDoctor: '#28328c'
      },
      boxShadow: {
        '3xl': '0 10px 30px rgba(0, 0, 0, 0.2)',  // Stronger shadow
      }
    },
  },
  plugins: [],

}
