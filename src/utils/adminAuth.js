import { safeLocalStorage, safeSessionStorage } from './storage';

const ADMIN_TOKEN_KEY = 'admin_token';

export const getAdminToken = () => {
  return safeSessionStorage.getItem(ADMIN_TOKEN_KEY) || '';
};

export const setAdminToken = (token) => {
  if (!token) return;
  safeSessionStorage.setItem(ADMIN_TOKEN_KEY, token);
  // Clean up legacy storage location if present.
  safeLocalStorage.removeItem(ADMIN_TOKEN_KEY);
};

export const clearAdminToken = () => {
  safeSessionStorage.removeItem(ADMIN_TOKEN_KEY);
  safeLocalStorage.removeItem(ADMIN_TOKEN_KEY);
};
