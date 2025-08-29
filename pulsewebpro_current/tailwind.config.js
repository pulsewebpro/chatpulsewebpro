/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        pulse: {
          bg: "#0b0f14",
          card: "#0f1620",
          neon: "#38bdf8"
        }
      },
      boxShadow: {
        pulse: "0 0 30px rgba(56,189,248,0.35)"
      }
    },
  },
  plugins: [],
};
