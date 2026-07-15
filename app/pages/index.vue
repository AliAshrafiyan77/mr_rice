<template>

<NuxtLink v-if="!authStore.isAuthenticated" to="/auth/login">login</NuxtLink>
    
    <div v-if="authStore.isAuthenticated" class="flex flex-col">
        <div>{{ authStore.user }}</div>
        <NuxtLink to="/admin">admin</NuxtLink>
        <button  @click="logout()">logout</button>

    </div>
</template>

<script setup>
import { useAuth } from '#imports';
import { useAuthStore } from '@/stores/auth';

const auth = useAuth();

const authStore = useAuthStore();

const logout = async () => {
    const response = await auth.logout()
    if (response.status) {
        authStore.reset();
        return navigateTo('/auth/login');
    }
}
</script>