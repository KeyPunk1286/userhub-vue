<template>
  <div>
    <header class="fixed top-0 left-0 w-full bg-(--bg-white) z-50 px-40">
      <HeaderComponent />
    </header>
    <main>
      <slot />
    </main>
    <!-- <Footer /> -->
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();

onMounted(async () => {
  await authStore.initAuth();
});
</script>
