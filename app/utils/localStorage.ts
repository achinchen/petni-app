export const getLocalStorage = (key: string) =>
  JSON.stringify(localStorage.getItem(key));

export const setLocalStorage = (key: string, payload: any) =>
  localStorage.setItem(key, JSON.stringify(payload));
