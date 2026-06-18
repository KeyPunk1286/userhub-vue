import { ref, computed } from "vue";
import { useLocalStorage } from "./localStorageService";
import { useDecode } from "./jwtDecoderService";
import { navigateTo } from '#app'

export function useLoginLogic() {
  const { getItem, deleteItem } = useLocalStorage()
  

  const userId = ref(null)
  const isLogin = ref(false)
 
  const authText = computed(() => {
  if (isLogin.value) return 'sign-out'
  else return 'sign-in'
  })
  
  const checkToken = () => {
    const token = getItem('token')
    if (token) {
      isLogin.value = true
      userId.value = useDecode(token)
    }

  }

  const toLogin = () => {
    if (!isLogin.value) {
      navigateTo('/login')
    } else {
      deleteItem('token')
      userId.value = null
      isLogin.value = false
      navigateTo('/')
    }
  }
  
  return {userId, isLogin, authText, checkToken, toLogin}
}