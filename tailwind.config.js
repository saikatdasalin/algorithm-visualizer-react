/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "hsl(var(--primary) / <alpha-value>)",
        secondary: "hsl(var(--secondary) / <alpha-value>)",
        accent: "hsl(var(--accent) / <alpha-value>)",
        info: "hsl(var(--info) / <alpha-value>)",
        success: "hsl(var(--success) / <alpha-value>)",
        warning: "hsl(var(--warning) / <alpha-value>)",
        error: "hsl(var(--error) / <alpha-value>)",
        "base-100": "hsl(var(--base-100) / <alpha-value>)",
        "base-200": "hsl(var(--base-200) / <alpha-value>)",
        "base-300": "hsl(var(--base-300) / <alpha-value>)",
        "base-content": "hsl(var(--base-content) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["Manrope", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 45px rgba(45, 212, 191, 0.25)",
      },
      backgroundImage: {
        "mesh-light": "radial-gradient(circle at 10% 20%, rgba(20, 184, 166, 0.15), transparent 40%), radial-gradient(circle at 80% 0%, rgba(6, 182, 212, 0.18), transparent 30%), radial-gradient(circle at 80% 90%, rgba(59, 130, 246, 0.16), transparent 36%)",
        "mesh-dark": "radial-gradient(circle at 10% 20%, rgba(20, 184, 166, 0.22), transparent 45%), radial-gradient(circle at 80% 0%, rgba(6, 182, 212, 0.20), transparent 35%), radial-gradient(circle at 80% 90%, rgba(59, 130, 246, 0.24), transparent 40%)",
      },
    },
  },
  plugins: [],
};
