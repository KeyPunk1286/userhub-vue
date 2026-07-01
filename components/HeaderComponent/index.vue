<template>
  <div class="flex items-center justify-between py-10 font-inter">
    <NuxtLink class="font-montserrat font-semibold text-2xl" to="/">
      User
      <span
        class="px-1 bg-(--text-black) text-(--text-white) rounded-sm dark:bg-(--text-white) dark:text-(--text-black)"
      >Hub</span
      >
    </NuxtLink>
    <ul class="flex items-center gap-4 text-lg font-semibold">
      <li>
        <NuxtLink to="/"> Home </NuxtLink>
      </li>
      <li v-if="isLogin">
        <NuxtLink :to="`/profile/${userInfo.firstName}`"> Profile </NuxtLink>
      </li>
      <li>
        <button class="cursor-pointer" @click="loginAction">
          <span class="mr-2">{{ authText }}</span>
          <i :class="isLogin ? 'pi pi-sign-out' : 'pi pi-sign-in'" />
        </button>
      </li>
    </ul>
    <button class="custom-icon cursor-pointer" @click="toggleDarkMode">
      <i v-if="!darkMode" class="pi pi-moon custom-icon" />
      <i v-else class="pi pi-sun custom-icon" />
    </button>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { useHeaderLogic } from '@/composables/headerLogic';

const authStore = useAuthStore();
const { isLogin, userInfo } = storeToRefs(authStore);
const { darkMode, authText, loginAction, toggleDarkMode } = useHeaderLogic();
</script>

<style scoped>
i.pi.pi-sun.custom-icon {
  font-size: 24px;
}
</style>
