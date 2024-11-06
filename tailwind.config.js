/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        green: "hsl(159, 69%, 38%)",
        red: "hsl(14, 86%, 42%)",
        "customrose-50": "hsl(20, 50%, 98%)",
        "customrose-100": "hsl(13, 31%, 94%)",
        "customrose-300": "hsl(14, 25%, 72%)",
        "customrose-400": "hsl(7, 20%, 60%)",
        "customrose-500": "hsl(12, 20%, 44%)",
        "customrose-900": "hsl(14, 65%, 9%)",
      },
    },
  },
  plugins: [],
};
