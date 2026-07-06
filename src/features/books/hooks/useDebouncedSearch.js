import { useState, useEffect, useCallback } from 'react';

export function useDebouncedSearch(initialValue = '', delay = 500) {
  const [value, setValue] = useState(initialValue);
  const [debouncedValue, setDebouncedValue] = useState(initialValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  const updateValue = useCallback((newValue) => {
    setValue(newValue);
  }, []);

  return [value, updateValue, debouncedValue];
}