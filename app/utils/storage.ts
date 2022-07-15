export const getLocalStorage = (key: string) => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : '';
};

export const setLocalStorage = (key: string, payload: any) => {
  localStorage.setItem(key, JSON.stringify(payload));
};
