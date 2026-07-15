<template>
    <div>
        <Menu />
        <Header />
        <main class="pt-20 lg:pt-20 lg:mr-[20%] min-h-screen bg-background p-4 lg:p-6">
            <slot />
        </main>
    </div>
</template>

<script setup>
import Menu from '~/components/adminLayouts/aside/Menu.vue';
import Header from '~/components/adminLayouts/header/Header.vue';
</script>