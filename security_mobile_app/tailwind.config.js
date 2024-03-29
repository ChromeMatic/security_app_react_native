/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        Kode:"'Kode Mono', monospace;"
      },
      colors:{
        'main':'#1A1710',
        'secondary':''
      }
    },
  },
  plugins: [],
}

