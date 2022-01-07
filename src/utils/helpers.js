export const getLocalStorage = (id) => {
  const item = localStorage.getItem('token');
  return item;
};

export const setLocalStorage = (id, value) => {
  localStorage.setItem(id, value);
};
