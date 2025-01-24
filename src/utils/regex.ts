export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const passwordRegex = {
  minLength: 8,
  maxLength: 64,
  uppercase: /[A-Z]/,
  number: /\d/,
  noSpaces: /^\S*$/,
};