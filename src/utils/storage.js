/**
 * Safe wrapper for localStorage and sessionStorage to prevent crashes in environments
 * where storage is disabled or restricted (e.g. Incognito mode, strict privacy settings).
 */

const isStorageAvailable = (type) => {
  try {
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

const safeStorage = (type) => {
  const available = isStorageAvailable(type);
  const storage = available ? window[type] : null;

  return {
    getItem: (key) => {
      try {
        return storage ? storage.getItem(key) : null;
      } catch (e) {
        return null;
      }
    },
    setItem: (key, value) => {
      try {
        if (storage) storage.setItem(key, value);
      } catch (e) {
        console.warn(`SafeStorage: Failed to set item ${key}`, e);
      }
    },
    removeItem: (key) => {
      try {
        if (storage) storage.removeItem(key);
      } catch (e) {
        console.warn(`SafeStorage: Failed to remove item ${key}`, e);
      }
    },
    clear: () => {
      try {
        if (storage) storage.clear();
      } catch (e) {
        console.warn('SafeStorage: Failed to clear storage', e);
      }
    }
  };
};

export const safeLocalStorage = safeStorage('localStorage');
export const safeSessionStorage = safeStorage('sessionStorage');
