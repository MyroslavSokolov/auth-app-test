export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const passwordRegex = {
  minLength: 8,
  maxLength: 64,
  uppercase: /[A-Z]/,
  lowercase: /[a-z]/,
  number: /\d/,
  noSpaces: /^\S*$/,
};