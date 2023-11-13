const animations = require("./src/theme/animations.js");

module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    colors: {
      black: '#121212',
      white: '#FFFFFC',
      altBlack: '#0C0F0A',
      altWhite: '#F8F8FF',
      red: '#BC3326',
      altRed: '#D54134',
      yellow: '#FFD633',
      green: '#5BAF5A',
      altGreen: '#9ABB53',
      purple: '#7400B8',
      darkBlue: '#5390D9',
      lightBlue: '#56CFE1',
      teal: '#80FFDB',
      pastelPink: '#FFE3E5',
      pastelYellow: '#FBF8CC',
      pastelGreen: '#B9FBC0',
      pastelBlue: '#8EECF5',
      pastelPurple: '#CFBAF0',
    },
    extend: {
      ...animations,
      fontFamily: {
        "radio-canada": ['"Radio Canada"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
