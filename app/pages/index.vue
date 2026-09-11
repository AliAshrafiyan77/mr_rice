<template>
  <main class="w-full pb-20 pt-4 lg:pb-0 lg:pt-20">
    <HomeHeroSection :featured-product="homePage?.featuredProduct" />
    <HomeCategoriesBento :pillars="homePage?.pillars ?? []" />
    <HomeProductShowcase
      v-if="showProductShowcase"
      :tabs="homePage?.selectedProductsSection?.tabs ?? []"
      :section-title="homePage?.selectedProductsSection?.title"
    />
    <HomeTrustPillars />
    <HomeCookingGuide />
    <HomeBlogSection />
    <LayoutFooter />
    <LayoutMobileBottomNav />
  </main>
</template>

<script setup>
definePageMeta({
  layout: 'default',
})

const publicHomePageStore = usePublicHomePageStore()

const { data: homePage } = await useAsyncData('home-page', async () => {
  try {
    return await publicHomePageStore.fetchHomePage()
  } catch (error) {
    console.error('[home-page] Failed to load homepage data:', error)
    return {
      featuredProduct: null,
      pillars: [],
      selectedProductsSection: { title: 'محصولات منتخب آتلیه مستر رایس', tabs: [] },
    }
  }
})

const showProductShowcase = computed(() => {
  const tabs = homePage.value?.selectedProductsSection?.tabs ?? []
  return tabs.length > 0
})
</script>
