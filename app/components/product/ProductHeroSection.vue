<script setup>
defineProps({
  product: { type: Object, required: true },
})
</script>

<template>
  <section class="mx-auto w-full max-w-[1440px] px-4 py-8 md:px-16 md:py-12">
    <div class="grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-10">
      <div class="lg:col-span-6">
        <ProductGallery
          :images="product.gallery.images"
          :badges="product.gallery.badges"
          :main-alt="product.gallery.mainAlt"
          :zoom-hint="product.gallery.zoomHint"
        />
      </div>
      <div class="lg:col-span-6">
        <ProductBuyBox :product="product" />
      </div>
    </div>
  </section>
</template>
