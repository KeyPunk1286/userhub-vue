import { defineStore } from 'pinia'
import { ref, computed } from "vue";
import axios from "axios";
import { useLocalStorage } from "../composables/localStorageService";
import { TOKEN_KEY } from "../constants/utils";


export const useAuthStore = defineStore('auth', () => {
  const { setItem, getItem, deleteItem } = useLocalStorage()
  
  
  const userInfo = ref({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    details: '',
  })
  const token = ref(null)
  const isLogin = computed(()=> !!token.value)

  async function loginUser(data) {
    try {
      if(!data) return
      const res = await axios.post('http://localhost:5000/users/login', data, { headers: { 'Content-Type': 'application/json' } })      
      const { jwt, userData } = res?.data
      console.log('loginStore',jwt, userData );
      if (!jwt) {
      throw new Error('Login failed')
      }
      setItem(TOKEN_KEY, jwt)
      token.value = jwt
      userInfo.value = userData
      return true
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message || "Unknown error")
    }
  }

  async function initAuth() {
   const t = getItem(TOKEN_KEY)
   if (!t) return
   try {
     token.value = t
     const response = await axios.get('http://localhost:5000/users/get-user', {
       headers: {
       Authorization: `Bearer ${t}`
       }
     })
     if (response?.data) {
       userInfo.value = response?.data
       console.log(userInfo.value);
       
     }
   } catch (error) {
     deleteItem(TOKEN_KEY)
     userInfo.value = null 
     token.value = null
   }
  }

   function logOut() {
     deleteItem(TOKEN_KEY)
      userInfo.value = null
     token.value = null
     return true
   }
  
  async function registrationUser(data) {
    if (!data) return
    try {
      const responseRegistration = await axios.post('http://localhost:5000/users/registration', data, { headers: { 'Content-Type': 'application/json' } })
      return true
    } catch (error) {
      throw new Error(
    error.response?.data?.message ||
    error.message ||
    'Registration failed'
  )
    }
  }

  async function updateUserData(data) {
    if (!data) return
    try {
      const resUpdate = await axios.put('http://localhost:5000/users/update-user', data, {
        headers: {
          Authorization: `Bearer ${token.value}`, 
          'Content-Type': 'application/json'
        }
      })
      console.log(resUpdate?.data);
      userInfo.value = resUpdate?.data
      return true
    } catch (error) {
       throw new Error(error.response?.data?.message || error.message || "Unknown error")
    }
    // console.log('updateUserData:store', data);
    
  }

  return{isLogin, userInfo, token, loginUser, initAuth, logOut, registrationUser, updateUserData}
})