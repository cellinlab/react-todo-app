const getLSItem = (key) => {
  const value = window.localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};

const setLSItem = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

const uid = () => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

export { getLSItem, setLSItem, uid };
