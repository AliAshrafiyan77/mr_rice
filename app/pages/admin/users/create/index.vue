<template>
    <div>admin users create</div>
</template>

<script setup>

definePageMeta({
    layout: 'admin',
    middleware: ['auth', 'admin'],
})
</script>