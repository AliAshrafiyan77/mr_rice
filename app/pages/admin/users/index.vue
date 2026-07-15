<template>
    <div>admin users index</div>
</template>

<script setup>

definePageMeta({
    layout: 'admin',
    middleware: ['auth', 'admin'],
})
</script>