
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#FF0000",
          dark: "#CC0000",
          light: "#FF3333",
          soft: "#FFF5F5"
        },
        accent: "#111827",
        surface: "#FFFFFF",
        background: "#F8FAFC"
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "sans-serif"],
        display: ["Poppins", "sans-serif"],
      },
      boxShadow: {
        'premium': '0 10px 30px -5px rgba(255, 0, 0, 0.1), 0 4px 12px -3px rgba(0, 0, 0, 0.03)',
        'card': '0 2px 15px -3px rgba(0, 0, 0, 0.04), 0 4px 6px -2px rgba(0, 0, 0, 0.02)',
        'inner-soft': 'inset 0 2px 4px 0 rgba(0,0,0,0.06)'
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
