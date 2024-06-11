import { useState } from "react";

type ReturnTypeUseLocalStorage<T> = [
  T | undefined,
  (value: T) => void,
  () => void
];

export const useLocalStorage = <T>(
  key: string
): ReturnTypeUseLocalStorage<T> => {
  const [storedValue, setStoredValue] = useState<T | undefined>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : undefined;
    } catch {
      return undefined;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      return;
    }
  };

  const removeValue = () => {
    try {
      setStoredValue(undefined);
      localStorage.removeItem(key);
    } catch {
      return;
    }
  };

  return [storedValue, setValue, removeValue];
};
