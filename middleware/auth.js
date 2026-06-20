import { useLocalStorage } from "../composables/localStorageService";
import { TOKEN_KEY } from "../constants/utils";

export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    const { getItem } = useLocalStorage()
    const token = getItem(TOKEN_KEY)
    if (!token) {
      return navigateTo('/login')
    }
  }
})

