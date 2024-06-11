export const getValueFromLocalStorage = <T>(key: string): T | undefined => {
  try {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : undefined;
  } catch {
    return undefined;
  }
};

export const setValueToLocalStorage = <T>(key: string, value: T) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    return;
  }
};

export const clearValueFromLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};
