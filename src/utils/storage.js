/**
 * Safe wrapper for localStorage and sessionStorage to prevent crashes in environments
 * where storage is disabled or restricted (e.g. Incognito mode, strict privacy settings).
 */

const isStorageAvailable = (type) => {
 try {
 if (typeof window ==='undefined') return false;
 const storage = window[type];
 if (!storage) return false;
 const x ='__storage_test__';
 storage.setItem(x, x);
 storage.removeItem(x);
 return true;
 } catch {
 return false;
 }
};

const safeStorage = (type) => {
 const available = isStorageAvailable(type);
 
 return {
 getItem: (key) => {
 try {
 if (!available) return null;
 return window[type].getItem(key);
 } catch {
 return null;
 }
 },
 setItem: (key, value) => {
 try {
 if (available) window[type].setItem(key, value);
 } catch {
 console.warn(`SafeStorage to set item ${key}`);
 }
 },
 removeItem: (key) => {
 try {
 if (available) window[type].removeItem(key);
 } catch {
 console.warn(`SafeStorage to remove item ${key}`);
 }
 },
 clear: () => {
 try {
 if (available) window[type].clear();
 } catch {
 console.warn('SafeStorage to clear storage');
 }
 }
 };
};

export const safeLocalStorage = safeStorage('localStorage');
export const safeSessionStorage = safeStorage('sessionStorage');
