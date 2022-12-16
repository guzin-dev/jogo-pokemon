/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    screens: {
      'md': {'max': '767px'},
      'sm': {'max': '510px'}
    },
    extend: {},
  },
  plugins: [],
}
