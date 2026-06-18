<template>
  <div>
    <h1>Welcome {{ firstName }} {{ userLastName }}</h1>
    <p>{{ userDetails }}</p>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

definePageMeta({
  middleware: 'auth'
})


</script>