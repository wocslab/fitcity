/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#E8192C",
          "red-dark": "#B8101E",
          "red-light": "#FF2D42",
          dark: "#0A0A0A",
          "dark-2": "#111111",
          "dark-3": "#1A1A1A",
          "dark-4": "#222222",
          gray: "#888888",
          "gray-light": "#CCCCCC",
        },
      },
      fontFamily: {
        sans: ["Gotham", "Inter", "sans-serif"],
        display: ["Gotham Black", "Impact", "sans-serif"],
        accent: ["Gotham Medium", "Inter", "sans-serif"],
      },
      animation: {
        "fade-up": "fadeUp 0.7s ease forwards",
        "fade-in": "fadeIn 0.5s ease forwards",
        "slide-left": "slideLeft 0.6s ease forwards",
        "slide-right": "slideRight 0.6s ease forwards",
        "pulse-red": "pulseRed 2s ease-in-out infinite",
        "marquee": "marquee 25s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideLeft: {
          "0%": { opacity: "0", transform: "translateX(40px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideRight: {
          "0%": { opacity: "0", transform: "translateX(-40px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        pulseRed: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(232, 25, 44, 0.4)" },
          "50%": { boxShadow: "0 0 0 12px rgba(232, 25, 44, 0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};
