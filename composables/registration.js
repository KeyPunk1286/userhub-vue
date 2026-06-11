import {ref} from 'vue';
import { navigateTo } from '#app';

export const useRegistration = () => {
  const isRegistrationSuccess = ref(false);

  const setRegistrationValue = (value) => {
    if (value) { 
      localStorage.setItem('email', value.email);
      localStorage.setItem('firstName', value.firstName);
      localStorage.setItem('lastName', value.lastName);
      localStorage.setItem('password', value.password);
      localStorage.setItem('details', value.details);
      isRegistrationSuccess.value = true;
      navigateTo('/');
    }
  }
  return {isRegistrationSuccess, setRegistrationValue}
 }