/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#0d0d0d",
        "dark-accent": "#111111",
        "room-bg": "#1c1c1c",
      },
      fontFamily: {
        mono: ["Monaco", "Consolas", "Liberation Mono", "Courier New", "monospace"],
        orbitron: ["Orbitron", "sans-serif"],
        space: ["Space Grotesk", "sans-serif"],
      },
    },
  },
  plugins: [],
}
