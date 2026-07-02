import { ref, computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { navigateTo } from '#app';

export function useHeaderLogic() {
  const darkMode = ref(false);
  const authStore = useAuthStore();
  const { isLogin } = storeToRefs(authStore);

  const authText = computed(() => {
    if (isLogin.value) return 'sign-out';
    else return 'sign-in';
  });

  const loginAction = () => {
    if (!isLogin.value) {
      navigateTo('/login');
    } else {
      if (authStore.logOut()) navigateTo('/');
    }
  };

  const toggleDarkMode = () => {
    darkMode.value = !darkMode.value;
    console.log('darkMode.value', darkMode.value);
    if (darkMode.value) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  };

  return { darkMode, authText, loginAction, toggleDarkMode };
}
