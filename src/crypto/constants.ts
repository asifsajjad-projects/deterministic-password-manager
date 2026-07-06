export const CHARSETS = {
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lower: "abcdefghijklmnopqrstuvwxyz",
  digits: "0123456789",
  symbols: "!@#$%^&*()-_=+[]{}<>?",
} as const;

export const ALL_CHARACTERS =
  CHARSETS.upper +
  CHARSETS.lower +
  CHARSETS.digits +
  CHARSETS.symbols;