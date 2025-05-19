/** @type {import('tailwindcss').Config} */

// module.exports = {
//   content: [
//     "./src/**/*.{html,js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       colors: {// Add your color here
//         customBlue: '#E4F1F3', 
//         customHeaderBlue:'#C3D4E4',
//         customCardBlue:'#E3F0FF' ,
//         customBlueDoctor: '#28328c'
//       },
//       boxShadow: {
//         '3xl': '0 10px 30px rgba(0, 0, 0, 0.2)',  // Stronger shadow
//       }
//     },
//   },
//   plugins: [],

// }



module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customBlue: '#E4F1F3',
        customHeaderBlue: '#C3D4E4',
        customCardBlue: '#E3F0FF',
        customBlueDoctor: '#28328c',
      },
      boxShadow: {
        '3xl': '0 10px 30px rgba(0, 0, 0, 0.2)', // Stronger shadow
      },
      animation: {
        'bounce-once': 'bounceOnce 1s ease-in-out', // 1s duration, runs once
      },
      keyframes: {
        bounceOnce: {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

