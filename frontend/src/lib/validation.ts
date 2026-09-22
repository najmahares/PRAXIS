export type PasswordRule = {
  id: string;
  label: string;
  test: (value: string) => boolean;
};

export const passwordRules: PasswordRule[] = [
  {
    id: "length",
    label: "At least 8 characters",
    test: (value) => value.length >= 8,
  },
  {
    id: "letter",
    label: "Contains a letter",
    test: (value) => /[A-Za-z]/.test(value),
  },
  {
    id: "number",
    label: "Contains a number",
    test: (value) => /\d/.test(value),
  },
];

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(email: string): string | null {
  const value = email.trim();
  if (!value) return "Enter your email address.";
  if (!emailPattern.test(value))
    return "Enter a valid email, like you@example.com.";
  return null;
}

export function validateRequired(
  value: string,
  message: string,
): string | null {
  return value.trim() ? null : message;
}

export function validateName(name: string): string | null {
  const value = name.trim();
  if (!value) return "Enter your full name.";
  if (value.length < 2) return "Your name must be at least 2 characters.";
  if (value.length > 80) return "Your name must be 80 characters or fewer.";
  return null;
}

export function validatePassword(password: string): string | null {
  if (!password) return "Create a password.";
  const failing = passwordRules.filter((rule) => !rule.test(password));
  if (failing.length === 0) return null;
  return "Password does not meet all requirements below.";
}

export function validateConfirm(
  password: string,
  confirm: string,
): string | null {
  if (!confirm) return "Confirm your password.";
  if (confirm !== password) return "Passwords do not match.";
  return null;
}

export function validateTerms(accepted: boolean): string | null {
  return accepted ? null : "You must accept the terms to continue.";
}

export type LoginErrors = { email?: string; password?: string };

export function validateLogin(values: {
  email: string;
  password: string;
}): LoginErrors {
  const errors: LoginErrors = {};
  const email = validateEmail(values.email);
  if (email) errors.email = email;
  const password = validateRequired(values.password, "Enter your password.");
  if (password) errors.password = password;
  return errors;
}

export type RegisterErrors = {
  name?: string;
  email?: string;
  password?: string;
  confirm?: string;
  terms?: string;
};

export function validateRegister(values: {
  name: string;
  email: string;
  password: string;
  confirm: string;
  terms: boolean;
}): RegisterErrors {
  const errors: RegisterErrors = {};
  const name = validateName(values.name);
  if (name) errors.name = name;
  const email = validateEmail(values.email);
  if (email) errors.email = email;
  const password = validatePassword(values.password);
  if (password) errors.password = password;
  const confirm = validateConfirm(values.password, values.confirm);
  if (confirm) errors.confirm = confirm;
  const terms = validateTerms(values.terms);
  if (terms) errors.terms = terms;
  return errors;
}

export type ResetErrors = { password?: string; confirm?: string };

export function validateReset(values: {
  password: string;
  confirm: string;
}): ResetErrors {
  const errors: ResetErrors = {};
  const password = validatePassword(values.password);
  if (password) errors.password = password;
  const confirm = validateConfirm(values.password, values.confirm);
  if (confirm) errors.confirm = confirm;
  return errors;
}
