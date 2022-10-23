/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/layout/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Nunito", ...defaultTheme.fontFamily.sans],
      },
      screens: {
        xs: "300px",
      },
      colors: {
        spotify: "#1db954",
        light: "#fff",
        dark: "#000",
      },
      gridTemplateColumns: {
        track: "max-content minmax(0, 1fr) 1fr max-content",
      },
    },
  },

  plugins: [],
};