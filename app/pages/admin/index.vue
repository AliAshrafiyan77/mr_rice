<template>
    <div>admin dashboard</div>
</template>

<script setup>

definePageMeta({
    layout: 'admin',
    middleware: ['auth', 'admin'],
})
</script>