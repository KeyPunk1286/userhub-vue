<template>
  <header class="flex justify-center pt-3.5 pb-3.5 bg-gray-400">
    <ul class="flex gap-3 p-3 border rounded-2xl">
      <li><NuxtLink to="/">Home</NuxtLink></li>
      <li><NuxtLink :to="`/profile/${userInfo?.firstName}`">Profile</NuxtLink></li>
      <li>
        <button class="cursor-pointer text-gray-700" @click="loginAction">
          <span class="mr-2">{{ authText }}</span>
          <i :class="isLogin ? 'pi pi-sign-out' : 'pi pi-sign-in'"></i>
        </button> 
       
      </li>
    </ul>
  </header>
</template>

<script setup>
import { computed } from "vue";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { navigateTo } from "#app";

const authStore = useAuthStore()
const { isLogin, userInfo } = storeToRefs(authStore)

const authText = computed(() => {
  if (isLogin.value) return 'sign-out'
  else return 'sign-in'
})

const loginAction = () => {
  if (!isLogin.value) {
    navigateTo('/login')
  } else {
    if( authStore.logOut()) navigateTo('/')
  }
}

</script>