export const colors = {
  navy: "#1B365D",
  navyLight: "#2A4A7A",
  navyDark: "#0F2240",
  copper: "#B87333",
  copperLight: "#D4935A",
  copperDark: "#8F5A28",
  fieldGreen: "#3D5A3E",
  fieldGreenLight: "#4E7350",
  parchment: "#F7F4EF",
  cream: "#FAFAF7",
  white: "#FFFFFF",
  charcoal: "#2D3436",
  steel: "#4A5568",
  muted: "#6B7C8F",
  amber: "#D97706",
  success: "#2D8659",
  danger: "#C75A3B",
  successBg: "#eaf5ee",
  infoBg: "#e8edf4",
  warningBg: "#fef3e2",
  dangerBg: "#fceaea",
  border: "#E2DDD5",
  borderLight: "#EDEAD4",
} as const;

export const darkSurface = {
  textPrimary: "#FFFFFF",
  textSecondary: "rgba(255,255,255,0.7)",
  textMuted: "rgba(255,255,255,0.45)",
  textHint: "rgba(255,255,255,0.25)",
  border: "rgba(255,255,255,0.12)",
  accentLabel: "#D4935A",
} as const;

export const typeScale = {
  "3xl": { size: 56, lineHeight: 1.1, letterSpacing: 0, weight: 700 },
  "2xl": { size: 36, lineHeight: 1.15, letterSpacing: 0, weight: 700 },
  xl: { size: 24, lineHeight: 1.25, letterSpacing: 0, weight: 600 },
  lg: { size: 20, lineHeight: 1.3, letterSpacing: 0, weight: 600 },
  md: { size: 18, lineHeight: 1.35, letterSpacing: 0, weight: 600 },
  base: { size: 16, lineHeight: 1.7, letterSpacing: 0, weight: 400 },
  sm: { size: 14, lineHeight: 1.6, letterSpacing: 0, weight: 400 },
  xs: { size: 12, lineHeight: 1.5, letterSpacing: 0.5, weight: 500 },
  "2xs": { size: 11, lineHeight: 1.4, letterSpacing: 1, weight: 600 },
  data: { size: 22, lineHeight: 1.3, letterSpacing: 0, weight: 500 },
  dataSm: { size: 14, lineHeight: 1.4, letterSpacing: 0, weight: 400 },
  label: { size: 12, lineHeight: 1.5, letterSpacing: 1, weight: 600 },
} as const;

export const space = {
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  10: 40,
  12: 48,
  14: 56,
  16: 64,
  20: 80,
  24: 96,
} as const;

export const radius = {
  sm: 4,
  md: 6,
  lg: 8,
  xl: 12,
  full: 9999,
} as const;

export const motion = {
  fast: "0.1s",
  normal: "0.2s",
  slow: "0.35s",
  ease: "cubic-bezier(0.4, 0, 0.2, 1)",
} as const;
