/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "'DM Sans'",
          "'Noto Sans SC'",
          "'Segoe UI'",
          "system-ui",
          "sans-serif",
        ],
        display: [
          "'Spline Sans'",
          "Inter",
          "'DM Sans'",
          "'Noto Sans SC'",
          "system-ui",
          "sans-serif",
        ],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      colors: {
        border: "#E1E7EC",
        input: "#E1E7EC",
        ring: "#007EBB",
        background: "#F5F8FA",
        foreground: "#303640",
        primary: {
          DEFAULT: "#007EBB",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#EAF7FE",
          foreground: "#263440",
        },
        accent: {
          DEFAULT: "#EEF5FA",
          foreground: "#263440",
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#303640",
        },
        lavender: "#D8EFFB",
        mist: "#F5F8FA",
        glow: "#007EBB",
        blush: "#EEF5FA",
        midnight: "#303640",
        skyveil: "#EAF7FE",
        oceanic: "#009FE8",
        moss: "#24735e",
      },
      boxShadow: {
        glow: "0 10px 40px -20px rgba(174, 187, 249, 0.55)",
        glass: "0 20px 45px -25px rgba(68, 79, 140, 0.35)",
      },
      backdropBlur: {
        glass: "18px",
      },
      backgroundImage: {
        "zen-sheen":
          "linear-gradient(135deg, rgba(249,247,244,0.75) 0%, rgba(200,194,243,0.55) 50%, rgba(239,215,247,0.45) 100%)",
        "zen-gradient":
          "radial-gradient(120% 120% at 85% 15%, rgba(200,194,243,0.75) 0%, rgba(249,247,244,0.5) 42%, rgba(174,187,249,0.2) 100%)",
        "zen-card":
          "linear-gradient(140deg, rgba(255,255,255,0.92) 0%, rgba(233,236,255,0.72) 45%, rgba(250,240,255,0.64) 100%)",
      },
      animation: {
        "float-slow": "float 12s ease-in-out infinite",
        "pulse-soft": "pulseSoft 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(6px, -12px, 0)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: 0.45 },
          "50%": { opacity: 0.9 },
        },
      },
    }
  },
  plugins: [],
}
