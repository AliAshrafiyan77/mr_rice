<script setup>
import {
  fetchProductVariation,
  getStaticProductDetail,
  mergeProductDetailFromApi,
} from '~/utils/product/product-detail'

definePageMeta({
  layout: 'default',
})

const route = useRoute()

const slug = computed(() => String(route.params.slug ?? ''))
const sku = computed(() => decodeURIComponent(String(route.params.sku ?? '')))

const { data: product, error } = await useAsyncData(
  () => `product-detail:${slug.value}:${sku.value}`,
  async () => {
    const staticProduct = getStaticProductDetail(slug.value)

    try {
      const apiVariation = await fetchProductVariation({
        slug: slug.value,
        sku: sku.value,
      })

      return mergeProductDetailFromApi(staticProduct, apiVariation)
    } catch (fetchError) {
      if (fetchError?.statusCode === 404) {
        throw fetchError
      }

      return staticProduct
    }
  },
  {
    watch: [slug, sku],
  },
)

if (error.value) {
  throw error.value
}

useHead({
  title: () => `${product.value?.title ?? 'محصول'} | مستر رایس`,
})
</script>

<template>
  <main v-if="product" class="w-full bg-background pb-20 pt-4 lg:pb-0 lg:pt-20">
    <ProductBreadcrumbBar
      :items="product.breadcrumbs"
      :trust-badge="product.trustBadge"
    />

    <ProductHeroSection :product="product" />

    <div class="space-y-6 pt-6 md:space-y-8 md:pt-8">
      <ProductLabMetrics
        :title="product.labSectionTitle"
        :badge="product.labSectionBadge"
        :metrics="product.labMetrics"
      />

      <ProductTrustGuarantees :items="product.trustGuarantees" />

      <ProductStoryAndCooking
        :provenance="product.provenance"
        :cooking="product.cooking"
      />

      <ProductRelatedCarousel :section="product.related" />
    </div>

    <LayoutFooter />
    <LayoutMobileBottomNav />
  </main>
</template>
