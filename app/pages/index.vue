<template>

    <div>
        <button @click="logout()">logout</button>
        <div>{{ authStore.user }}</div>
    </div>
</template>

<script setup>
import { useAuth } from '#imports';
import { useAuthStore } from '#imports';

const auth = useAuth();

const authStore = useAuthStore();

const logout = async () => {
    const response = await auth.logout()
    if (response.status) 
        authStore.$reset
    
}
</script>