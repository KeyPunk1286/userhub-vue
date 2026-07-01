import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from 'axios';
import { useLocalStorage } from '../composables/localStorageService';
import { TOKEN_KEY } from '../constants/utils';
import type { LoginResponse, UserDataResponse } from '~/types/auth';
import type { EditForm, LoginForm, RegistrationForm } from '~/types/forms';

export const useAuthStore = defineStore('auth', () => {
  const { setItem, getItem, deleteItem } = useLocalStorage();

  const userInfo = ref<UserDataResponse | null>(null);
  const token = ref<string | null>(null);
  const isLogin = computed(() => !!token.value);

  function getApiError(error: unknown): never {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message ?? error.message);
    }

    throw error;
  }

  async function loginUser(data: LoginForm) {
    try {
      const res = await axios.post<LoginResponse>(
        'http://localhost:5000/users/login',
        data,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      const { jwt, userData } = res.data;
      setItem(TOKEN_KEY, jwt);
      token.value = jwt;
      userInfo.value = userData;
      return true;
    } catch (error) {
      getApiError(error);
    }
  }

  async function initAuth() {
    const t = getItem(TOKEN_KEY);
    if (!t) return;
    try {
      const { data } = await axios.get<UserDataResponse>(
        'http://localhost:5000/users/get-user',
        {
          headers: {
            Authorization: `Bearer ${t}`,
          },
        }
      );
      token.value = t;
      userInfo.value = data;
    } catch (error) {
      deleteItem(TOKEN_KEY);
      userInfo.value = null;
      token.value = null;
      console.warn('Token is invalid', error);
    }
  }

  function logOut() {
    deleteItem(TOKEN_KEY);
    userInfo.value = null;
    token.value = null;
    return true;
  }

  async function registrationUser(data: RegistrationForm) {
    try {
      await axios.post('http://localhost:5000/users/registration', data, {
        headers: { 'Content-Type': 'application/json' },
      });
      return true;
    } catch (error) {
      getApiError(error);
    }
  }

  async function updateUserData(updateData: EditForm) {
    try {
      const { data } = await axios.put<UserDataResponse>(
        'http://localhost:5000/users/update-user',
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token.value}`,
            'Content-Type': 'application/json',
          },
        }
      );
      userInfo.value = data;
      return true;
    } catch (error) {
      getApiError(error);
    }
  }

  return {
    isLogin,
    userInfo,
    token,
    loginUser,
    initAuth,
    logOut,
    registrationUser,
    updateUserData,
  };
});
