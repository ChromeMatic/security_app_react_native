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
        'main':'#020717',
        'secondary':''
      }
    },
  },
  plugins: [],
}

