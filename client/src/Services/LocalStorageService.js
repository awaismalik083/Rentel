// src/services/localStorageService.js

const LocalStorageService = {
    /**
     * Set any value in localStorage
     * @param {string} key - The key to store under
     * @param {*} value - The value to store (object, string, number, etc.)
     */
    set: (key, value) => {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch (error) {
        console.error(`LocalStorage set error for key "${key}":`, error);
        return false;
      }
    },
  
    /**
     * Get any value from localStorage
     * @param {string} key - The key to retrieve
     * @returns {*} The stored value or null if not found
     */
    get: (key) => {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
      } catch (error) {
        console.error(`LocalStorage get error for key "${key}":`, error);
        return null;
      }
    },
  
    /**
     * Remove a specific item from localStorage
     * @param {string} key - The key to remove
     */
    remove: (key) => {
      localStorage.removeItem(key);
    },
  
    /**
     * Clear all localStorage
     */
    clearAll: () => {
      localStorage.clear();
    }
  };
  
  export default LocalStorageService;