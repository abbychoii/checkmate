/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        shrikhand: ["shrikhand", "cursive"],
        fanwood: ["fanwood text", "serif"],
        space: ["space mono", "monospace"],
        groteskreg: ["space grotesk", "serif", "regular"],
      },
      backgroundImage: {
        "checkered-tetris": "url(./tetris.svg)",
        tetris2: "url(./tetris2.svg)",
      },
      animation: {
        "spin-slow": "spin 1000s linear infinite",
      },
    },
  },
  plugins: [],
};
