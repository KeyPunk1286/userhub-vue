export function useLocalStorage(){
  const setItem = (key, value) => {
  try {
    localStorage.setItem(key, value)
  } catch (error) {
    console.error("Error saving in localStorage", error);
  }
  }

  const getItem = (key) => {
    try {
      const storageValue = localStorage.getItem(key)
      if (storageValue === null) return null
      return storageValue
    } catch (error) {
      console.error("Error geting from localStorage", error);
      return null;
    }
  }

  const deleteItem = (key) => {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error("Error remuving from localStorage", error);
    }
  }
  
  return{setItem, getItem, deleteItem}
}