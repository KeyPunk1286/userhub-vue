<template>
  <div>
    <h1>Welcome {{ firstName }} {{ userLastName }}</h1>
    <p>{{ userDetails }}</p>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const firstName = ref('')
const userLastName = ref('')
const userDetails = ref('')

onMounted(() => {
  firstName.value = localStorage.getItem('firstName');
  userLastName.value = localStorage.getItem('lastName');
  userDetails.value = localStorage.getItem('details');
})
</script>