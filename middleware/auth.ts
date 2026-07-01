import { useLocalStorage } from '../composables/localStorageService';
import { TOKEN_KEY } from '../constants/utils';
import { navigateTo } from '#app';

export default defineNuxtRouteMiddleware(() => {
  const { getItem } = useLocalStorage();
  if (!import.meta.client) return;
  const token = getItem(TOKEN_KEY);
  if (!token) {
    return navigateTo('/login');
  }
});
