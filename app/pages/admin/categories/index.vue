<template>
    <h1>categories</h1>
</template>

<script setup>

import { useCategoryStore } from '#imports';
const categoryStore = useCategoryStore();

definePageMeta({
    layout: 'admin',
    middleware: ['auth', 'admin'],
});

onMounted(() => {
    categoryStore.fetchCategories;
})

</script>