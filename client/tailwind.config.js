export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        blobFloat: {
          "0%, 100%": { transform: "translate(0,0) scale(1)" },
          "33%": { transform: "translate(10px,-8px) scale(1.04)" },
          "66%": { transform: "translate(-12px,6px) scale(0.98)" },
        },
        blobOrbit: {
          "0%": { transform: "rotate(0deg) translateX(14px) rotate(0deg)" },
          "100%": {
            transform: "rotate(360deg) translateX(14px) rotate(-360deg)",
          },
        },
        pulseSoft: {
          "0%, 100%": { transform: "scale(1)", opacity: 1 },
          "50%": { transform: "scale(0.98)", opacity: 0.85 },
        },
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        fadeOut: { from: { opacity: 1 }, to: { opacity: 0 } },
        spinSlow: { to: { transform: "rotate(360deg)" } },
      },
      animation: {
        blobFloat: "blobFloat 4s ease-in-out infinite",
        blobOrbit: "blobOrbit 3.4s linear infinite",
        pulseSoft: "pulseSoft 1.8s ease-in-out infinite",
        fadeIn: "fadeIn .18s ease-out both",
        fadeOut: "fadeOut .18s ease-in both",
        spinSlow: "spinSlow 2.6s linear infinite",
      },
      fontFamily: {
        display: ["VelvetDisplay", "serif"],
        body: ["VelvetSans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
