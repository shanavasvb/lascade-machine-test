import type { Config } from "tailwindcss";
const config: Config = {
  content: [
    "./src/pages/**/*. {js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0A8A61",
        primaryHover: "#06704F",
        bgPage: "#F5F7F6",
        bgCard: "#FFFFFF",
        textMain: "#042521",
        textMuted: "#647583",
        borderInput: "#D8E3DF",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      borderRadius: {
        card: "24px",
        input: "12px",
      },
      boxShadow: {
        card: "0 12px 40px rgba(0, 0, 0, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;