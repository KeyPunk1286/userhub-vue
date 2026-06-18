<template>
  <header class="flex justify-center pt-3.5 pb-3.5 bg-gray-400">
    <ul class="flex gap-3 p-3 border rounded-2xl">
      <li><NuxtLink to="/">Home</NuxtLink></li>
      <li><NuxtLink :to="`/profile/${userId}`">Profile</NuxtLink></li>
      <li>
        <button class="cursor-pointer" @click="toLogin">
          <span>{{ authText }}</span>
          <i :class="isLogin ? 'pi pi-sign-out' : 'pi pi-sign-in'"></i>
        </button> 
       
      </li>
    </ul>
  </header>
</template>

<script setup>
import { onMounted } from "vue";
import { useLoginLogic } from "@/composables/loginLogic";

const { userId, isLogin, authText, checkToken, toLogin } = useLoginLogic()

onMounted(() => {
  checkToken()
})
</script>