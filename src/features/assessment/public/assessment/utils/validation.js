// Constants
const NAME_MIN_WORDS = 2;
const NAME_MIN_WORD_LENGTH = 2;
const NAME_MIN_TOTAL_LENGTH = 5;
const NAME_MAX_LENGTH = 100;

// Regex patterns
const NAME_ALLOWED_PATTERN = /^[A-Za-z]+(?:[ '\-][A-Za-z]+)*$/;
const NAME_MULTIPLE_SPACES_PATTERN = /\s{2,}/g;
const NAME_LEADING_TRAILING_SPACES_PATTERN = /^\s+|\s+$/g;

/**
 * Sanitize name by trimming and collapsing multiple spaces
 */
export const sanitizeName = (value) => {
  if (!value) return '';
  return value
    .replace(NAME_LEADING_TRAILING_SPACES_PATTERN, '')
    .replace(NAME_MULTIPLE_SPACES_PATTERN, ' ');
};

/**
 * Validate a name with production-grade rules
 */
export const validateName = (value) => {
  const trimmed = sanitizeName(value);

  // Required
  if (!trimmed) {
    return { valid: false, message: 'Name is required.' };
  }

  // Minimum total length
  if (trimmed.length < NAME_MIN_TOTAL_LENGTH) {
    return {
      valid: false,
      message: `Name must be at least ${NAME_MIN_TOTAL_LENGTH} characters.`,
    };
  }

  // Maximum length
  if (trimmed.length > NAME_MAX_LENGTH) {
    return {
      valid: false,
      message: `Name must be at most ${NAME_MAX_LENGTH} characters.`,
    };
  }

  // Allowed characters only (letters, spaces, apostrophes, hyphens)
  if (!NAME_ALLOWED_PATTERN.test(trimmed)) {
    return {
      valid: false,
      message: 'Please enter a valid name using letters, spaces, apostrophes, or hyphens only.',
    };
  }

  // Split into words
  const words = trimmed.split(' ').filter((w) => w.length > 0);

  // Minimum 2 words
  if (words.length < NAME_MIN_WORDS) {
    return {
      valid: false,
      message: 'Please enter both first and last name.',
    };
  }

  // Each word must have minimum length
  const invalidWord = words.find((word) => word.length < NAME_MIN_WORD_LENGTH);
  if (invalidWord) {
    return {
      valid: false,
      message: `Each name part must be at least ${NAME_MIN_WORD_LENGTH} characters.`,
    };
  }

  // Check for initials-only (e.g., "A B", "A B C")
  const hasOnlyInitials = words.every((word) => word.length <= 2);
  if (hasOnlyInitials) {
    return {
      valid: false,
      message: 'Please enter full names, not just initials.',
    };
  }

  // Reject names with numbers or special characters (already covered by regex)
  // Reject names that are just repeated characters
  const firstWord = words[0];
  const isRepeatedChars = words.every((word) => word === firstWord);
  if (isRepeatedChars && words.length > 1) {
    return {
      valid: false,
      message: 'Please enter a valid name with different first and last names.',
    };
  }

  return { valid: true, message: '' };
};

/**
 * Email validation constants
 */
const EMAIL_MAX_LENGTH = 254;
const EMAIL_LOCAL_PART_MAX_LENGTH = 64;
const EMAIL_DOMAIN_MAX_LENGTH = 255;

// Robust email regex pattern
// This pattern handles most valid email formats while rejecting common invalid ones
const EMAIL_PATTERN = /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;

/**
 * Sanitize email by trimming and converting to lowercase
 */
export const sanitizeEmail = (value) => {
  if (!value) return '';
  return value.trim().toLowerCase();
};

/**
 * Validate an email with production-grade rules
 */
export const validateEmail = (value) => {
  const trimmed = sanitizeEmail(value);

  // Required
  if (!trimmed) {
    return { valid: false, message: 'Email address is required.' };
  }

  // Maximum length
  if (trimmed.length > EMAIL_MAX_LENGTH) {
    return {
      valid: false,
      message: `Email must be at most ${EMAIL_MAX_LENGTH} characters.`,
    };
  }

  // Check for spaces
  if (trimmed.includes(' ')) {
    return {
      valid: false,
      message: 'Email address cannot contain spaces.',
    };
  }

  // Check for consecutive dots
  if (trimmed.includes('..')) {
    return {
      valid: false,
      message: 'Email address cannot contain consecutive dots.',
    };
  }

  // Check for double @
  const atCount = (trimmed.match(/@/g) || []).length;
  if (atCount !== 1) {
    return {
      valid: false,
      message: 'Please enter a valid email address with exactly one @ symbol.',
    };
  }

  // Validate format with regex
  if (!EMAIL_PATTERN.test(trimmed)) {
    return {
      valid: false,
      message: 'Please enter a valid email address (e.g., name@domain.com).',
    };
  }

  // Split local part and domain
  const [localPart, domain] = trimmed.split('@');

  // Validate local part length
  if (localPart.length > EMAIL_LOCAL_PART_MAX_LENGTH) {
    return {
      valid: false,
      message: `Email local part must be at most ${EMAIL_LOCAL_PART_MAX_LENGTH} characters.`,
    };
  }

  // Validate domain length
  if (domain.length > EMAIL_DOMAIN_MAX_LENGTH) {
    return {
      valid: false,
      message: `Email domain must be at most ${EMAIL_DOMAIN_MAX_LENGTH} characters.`,
    };
  }

  // Check if domain has a valid TLD (at least 2 characters after last dot)
  const domainParts = domain.split('.');
  const tld = domainParts[domainParts.length - 1];
  if (tld.length < 2) {
    return {
      valid: false,
      message: 'Please enter a valid email address with a proper domain extension (e.g., .com, .org).',
    };
  }

  return { valid: true, message: '' };
};

/**
 * Validation result type
 */
export const VALIDATION_RESULT = {
  valid: (message = '') => ({ valid: true, message }),
  invalid: (message) => ({ valid: false, message }),
};

/**
 * Check if a field has validation errors
 */
export const hasValidationError = (validationResult) => {
  return validationResult && !validationResult.valid;
};

/**
 * Get validation error message
 */
export const getValidationMessage = (validationResult) => {
  return validationResult && !validationResult.valid ? validationResult.message : '';
};