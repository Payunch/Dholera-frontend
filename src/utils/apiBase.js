const trimTrailingSlash = (value) => value.replace(/\/+$/, '');

const getDefaultApiBase = () => {
  if (import.meta.env.DEV) {
    if (typeof window === 'undefined') {
      return 'http://localhost:3000/api';
    }

    return `${window.location.protocol}//${window.location.hostname}:3000/api`;
  }

  return 'https://api.dholeraplatform.com/api';
};

const envApiBase = import.meta.env.VITE_API_BASE_URL?.trim();

export const API_BASE_URL = trimTrailingSlash(envApiBase || getDefaultApiBase());
