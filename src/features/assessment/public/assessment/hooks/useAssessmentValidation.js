import { useState, useCallback, useMemo } from 'react';
import { validateName, validateEmail, sanitizeName, sanitizeEmail } from '../utils/validation';

export const useAssessmentValidation = (initialUser = { name: '', email: '' }) => {
  const [user, setUser] = useState(initialUser);
  const [errors, setErrors] = useState({ name: '', email: '' });

  const validateField = useCallback((field, value) => {
    let result;
    if (field === 'name') {
      result = validateName(value);
    } else if (field === 'email') {
      result = validateEmail(value);
    }
    return result;
  }, []);

  const handleFieldChange = useCallback((field, value) => {
    setUser((prev) => ({ ...prev, [field]: value }));
    // Clear error while typing
    setErrors((prev) => ({ ...prev, [field]: '' }));
  }, []);

  const handleFieldBlur = useCallback((field, value) => {
    const result = validateField(field, value);
    if (!result.valid) {
      setErrors((prev) => ({ ...prev, [field]: result.message }));
    } else {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  }, [validateField]);

  const validateAll = useCallback(() => {
    const nameResult = validateName(user.name);
    const emailResult = validateEmail(user.email);

    const newErrors = {
      name: nameResult.valid ? '' : nameResult.message,
      email: emailResult.valid ? '' : emailResult.message,
    };

    setErrors(newErrors);

    const isValid = nameResult.valid && emailResult.valid;

    return {
      isValid,
      user: {
        name: nameResult.valid ? sanitizeName(user.name) : user.name,
        email: emailResult.valid ? sanitizeEmail(user.email) : user.email,
      },
      errors: newErrors,
    };
  }, [user.name, user.email]);

  const resetValidation = useCallback(() => {
    setErrors({ name: '', email: '' });
  }, []);

  const isNameValid = useMemo(() => {
    const result = validateName(user.name);
    return result.valid;
  }, [user.name]);

  const isEmailValid = useMemo(() => {
    const result = validateEmail(user.email);
    return result.valid;
  }, [user.email]);

  return {
    user,
    setUser,
    errors,
    setErrors,
    handleFieldChange,
    handleFieldBlur,
    validateAll,
    resetValidation,
    isNameValid,
    isEmailValid,
  };
};