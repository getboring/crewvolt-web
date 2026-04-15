import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./workers/**/*.{js,ts}"],
  theme: {
    extend: {
      colors: {
        cv: {
          navy: {
            DEFAULT: "#1B365D",
            light: "#2A4A7A",
            dark: "#0F2240",
          },
          copper: {
            DEFAULT: "#B87333",
            light: "#D4935A",
            dark: "#8F5A28",
          },
          "field-green": {
            DEFAULT: "#3D5A3E",
            light: "#4E7350",
          },
          parchment: "#F7F4EF",
          cream: "#FAFAF7",
          charcoal: "#2D3436",
          steel: "#4A5568",
          muted: "#6B7C8F",
          amber: "#D97706",
          success: {
            DEFAULT: "#2D8659",
            bg: "#eaf5ee",
          },
          info: {
            bg: "#e8edf4",
          },
          warning: {
            bg: "#fef3e2",
          },
          danger: {
            DEFAULT: "#C75A3B",
            bg: "#fceaea",
          },
          border: {
            DEFAULT: "#E2DDD5",
            light: "#EDEAD4",
          },
        },
      },
      fontFamily: {
        logo: ["Barlow Condensed", "Arial Narrow", "sans-serif"],
        headline: ["Playfair Display", "Georgia", "serif"],
        body: ["Source Sans 3", "system-ui", "sans-serif"],
        data: ["IBM Plex Mono", "Courier New", "monospace"],
      },
      borderRadius: {
        sm: "4px",
        md: "6px",
        lg: "8px",
        xl: "12px",
      },
      boxShadow: {
        sm: "0 1px 3px rgba(27,54,93,0.06)",
        md: "0 4px 12px rgba(27,54,93,0.08)",
        lg: "0 8px 24px rgba(27,54,93,0.12)",
      },
      spacing: {
        "4.5": "18px",
        "7": "28px",
        "18": "72px",
        "22": "88px",
      },
      transitionDuration: {
        fast: "100ms",
        normal: "200ms",
        slow: "350ms",
      },
    },
  },
};

export default config;
