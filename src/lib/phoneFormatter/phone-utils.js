
const MAX_DIGITS = 11; // 10-digit US number, optionally prefixed with country code 1

/** Strips every non-digit character from a string. */
export const stripNonNumeric = (value) => (value || '').replace(/\D/g, '');

export const formatUSPhoneNumber = (value) => {
  const digits = stripNonNumeric(value).slice(0, MAX_DIGITS);

  if (digits.length === 0) return '';

  const hasCountryCode = digits.length === 11 && digits.startsWith('1');

  if (digits.length === 11 && !hasCountryCode) {
    return digits;
  }

  const local = hasCountryCode ? digits.slice(1) : digits;

  let formatted = local;
  if (local.length > 6) {
    formatted = `(${local.slice(0, 3)}) ${local.slice(3, 6)}-${local.slice(6, 10)}`;
  } else if (local.length > 3) {
    formatted = `(${local.slice(0, 3)}) ${local.slice(3)}`;
  } else if (local.length === 3) {
    formatted = `(${local})`;
  }

  return hasCountryCode ? `+1 ${formatted}` : formatted;
};

/**
 * Validates a US phone number: exactly 10 digits, or 11 digits with a
 * leading country code of 1. Empty value is treated as valid (optional field).
 */
export const isValidUSPhoneNumber = (value) => {
  if (!value || !value.trim()) return true;
  const digits = stripNonNumeric(value);
  return digits.length === 10 || (digits.length === 11 && digits.startsWith('1'));
};