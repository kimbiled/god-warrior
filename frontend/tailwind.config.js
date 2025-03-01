/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'sm20': '320px',  // Экраны шириной от 320px
        'sm75': '375px',  // Экраны шириной от 375px
        'sm25': '425px',  // Экраны шириной от 425px
        'sm60': '360px',  // Экраны шириной от 375px
        'sm80': '380px',
        'sm00': '400px',  // Экраны шириной от 375px
        'sm10': '410px', 
        'xl40': '1440px', // Экраны шириной от 1440px
      },
    },
  },
  plugins: [],
}

