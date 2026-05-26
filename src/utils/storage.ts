/**
 * Safe wrapper for localStorage and sessionStorage to prevent crashes in environments
 * where storage is disabled or restricted (e.g. Incognito mode, strict privacy settings).
 */

const isStorageAvailable = (type: 'localStorage' | 'sessionStorage') => {
  try {
    if (typeof window === 'undefined') return false;
    const storage = window[type];
    if (!storage) return false;
    const x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return false;
  }
};

const safeStorage = (type: 'localStorage' | 'sessionStorage') => {
  const available = isStorageAvailable(type);
  
  return {
    getItem: (key: string) => {
      try {
        if (!available) return null;
        return window[type].getItem(key);
      } catch (e) {
        return null;
      }
    },
    setItem: (key: string, value: string) => {
      try {
        if (available) window[type].setItem(key, value);
      } catch (e) {
        console.warn(`SafeStorage: Failed to set item ${key}`, e);
      }
    },
    removeItem: (key: string) => {
      try {
        if (available) window[type].removeItem(key);
      } catch (e) {
        console.warn(`SafeStorage: Failed to remove item ${key}`, e);
      }
    },
    clear: () => {
      try {
        if (available) window[type].clear();
      } catch (e) {
        console.warn('SafeStorage: Failed to clear storage', e);
      }
    }
  };
};

export const safeLocalStorage = safeStorage('localStorage');
export const safeSessionStorage = safeStorage('sessionStorage');
