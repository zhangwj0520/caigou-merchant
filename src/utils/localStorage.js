/**
 * localStorage 操作
 */
const storage = {
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  get(key) {
    const value = localStorage.getItem(key);
    return value === 'undefined' ? undefined : JSON.parse(value);
  },
  clear() {
    localStorage.clear();
  },
};

export default storage;
