<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <div class="flex flex-col gap-4">
      <h1>
        <span>{{ userInfo.firstName }}</span><span>{{ userInfo.lastName }}</span>
      </h1>
      <div>
        <h2>Here are your details:</h2>
        <p>{{ userInfo.details }}</p>
      </div>
      <div>
        <h2>Here are your email:</h2>
        <p>{{ userInfo.email }}</p>
      </div>
      <div>
        <button
          class="cursor-pointer"
          @click="moveToEditPage"
        >
          <i class="pi pi-pencil" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { navigateTo } from '#app';

const authStore = useAuthStore();
const { userInfo } = storeToRefs(authStore);

const moveToEditPage = () => {
  navigateTo('/profile/edit');
};

definePageMeta({
  middleware: 'auth',
});
</script>
