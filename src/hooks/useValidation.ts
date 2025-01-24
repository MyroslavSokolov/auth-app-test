import { passwordRegex } from '../utils/regex.ts';

export const validatePassword = (password: string): string[] => {
  const errors: string[] = [];
  if (password.length < passwordRegex.minLength) errors.push('Password is too short');
  if (password.length > passwordRegex.maxLength) errors.push('Password is too long');
  if (!passwordRegex.uppercase.test(password)) errors.push('Password must contain at least one uppercase letter');
  if (!passwordRegex.number.test(password)) errors.push('Password must contain at least one number');
  if (!passwordRegex.noSpaces.test(password)) errors.push('Password cannot contain spaces');
  return errors;
};