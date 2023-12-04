/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "pins-primary": "#8D66FC",
        "pins-secondary": "#06090D",
        "pins-yellow": "#F6FF82",
        "pins-red": "#FF5C5C",
        "pins-grey-darker": "#757C88",
        "pins-grey-dark": "#AEB5C0",
        "pins-light": "#F1F3F5",
        "pins-menu-hover": "#1D252F",
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
};
