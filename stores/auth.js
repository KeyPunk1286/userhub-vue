import { ref } from 'vue';
import {navigateTo} from '#app';

export const useAuthStore = () => {
  const isLogin = ref(false);

  const setLogin = (value) => {
    const userEmail = localStorage.getItem('email')
    const userPassword = localStorage.getItem('password')
    const firstUserName = localStorage.getItem('firstName')
    if (value) {
      if (userEmail === value.email && userPassword === value.password) {
        isLogin.value = true;
        navigateTo(`/user/${firstUserName}`);
       
      } else {
        console.log('Invalid credentials');
       }
      // if (value.userName === userEmail.value && value.password === userPassword.value) {
      // }
      // else { 
      //   console.log('Invalid credentials');
      // }
    }
 
  }

  return {
    isLogin,
    setLogin
  }
}