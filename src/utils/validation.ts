
// Input validation and sanitization utilities
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

export const validatePassword = (password: string): { isValid: boolean; message?: string } => {
  if (password.length < 8) {
    return { isValid: false, message: "Password must be at least 8 characters long" };
  }
  
  if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
    return { isValid: false, message: "Password must contain uppercase, lowercase, and number" };
  }
  
  return { isValid: true };
};

export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>\"'&]/g, '');
};

export const validateRequired = (value: string, fieldName: string): string | null => {
  if (!value || value.trim().length === 0) {
    return `${fieldName} is required`;
  }
  return null;
};

export const validateLength = (value: string, min: number, max: number, fieldName: string): string | null => {
  const length = value.trim().length;
  if (length < min) {
    return `${fieldName} must be at least ${min} characters`;
  }
  if (length > max) {
    return `${fieldName} must not exceed ${max} characters`;
  }
  return null;
};
