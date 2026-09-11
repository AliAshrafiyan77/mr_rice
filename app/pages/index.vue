<template>
  <main class="flex w-full flex-col space-y-7 px-4 pt-4 pb-20 lg:space-y-0 lg:px-0 lg:pt-20 lg:pb-0">
    <HomeHeroSection />
    <HomeCategoriesBento />
    <HomeProductShowcase />
    <HomeTrustPillars />
    <HomeCookingGuide />
    <HomeBlogSection />
    <LayoutFooter />
    <LayoutMobileBottomNav />
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default',
})
</script>
