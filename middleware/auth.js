import { useLocalStorage } from "../composables/localStorageService";

export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    const { getItem } = useLocalStorage()
    const token = getItem('token')
    if (!token) {
      return navigateTo('/login')
    }
  }
})

