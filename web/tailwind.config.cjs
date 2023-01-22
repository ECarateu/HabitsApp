/** @type {import('tailwindcss').Config} */
module.exports = {
  jit:true,
  content: [
    './scr/**/*.tsx',
    './index.html',
    './pages/**/*.tsx',
    './components/**/*.tsx',
    './**/*.{html,js}'
  ],
  theme: {
    extend: {
      colors:{
        background: '#09090A'
      },
      gridTemplateRows:{
        7: 'repeat(7,minmax(0,1fr)'

      }
    },
  },
  plugins: [],
}
