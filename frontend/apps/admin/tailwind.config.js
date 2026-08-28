/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1570EF",
        background: "#09090b",
        foreground: "#fafafa",
        card: "#18181b",
        cardForeground: "#fafafa",
        border: "#27272a",
        muted: "#27272a",
        mutedForeground: "#a1a1aa",
        accent: "#1570EF",
        accentForeground: "#ffffff",
      },
      borderRadius: {
        lg: "0.75rem",
        md: "0.5rem",
        sm: "0.25rem",
      },
    },
  },
  plugins: [],
}
