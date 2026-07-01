export function useLocalStorage() {
  const setItem = (key: string, value: string): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error('Error saving in localStorage', error);
    }
  };

  const getItem = (key: string): null | string => {
    if (typeof window === 'undefined') return null;
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error('Error geting from localStorage', error);
      return null;
    }
  };

  const deleteItem = (key: string): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error remuving from localStorage', error);
    }
  };

  return { setItem, getItem, deleteItem };
}
