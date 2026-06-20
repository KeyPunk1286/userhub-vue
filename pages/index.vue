<template>
    <div class="flex flex-col gap-4 items-center justify-center h-screen">
        <h1 class="text-3xl font-bold">Welcome to UserHub</h1>
        <div>
            <div v-if="isLogin">
                <p><span>Hi</span><span>{{ userInfo.firstName }}</span></p>
                <h2>Here are your details:</h2>
                <p>{{ userInfo.details }}</p>
            </div>
            <NuxtLink v-else to="/register"><span class="mr-3">You can register here</span> <i class="pi pi-user-plus"></i></NuxtLink>
        </div>
    </div>
</template>

<script setup>
import { useAuthStore } from "../stores/auth";
import { storeToRefs } from "pinia";

const authStore = useAuthStore()
const { isLogin, userInfo } = storeToRefs(authStore)
</script>