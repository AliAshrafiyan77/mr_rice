<template>
  <main class="w-full pb-20 pt-4 lg:pb-0 lg:pt-20">
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
