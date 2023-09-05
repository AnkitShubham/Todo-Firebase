/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        telma: ["Telma", "cursive"],
        jetbrains: ["JetBrains Mono", "sans-serif"],
      },
    },
  },
  plugins: [],
};
