<script setup>
defineProps({
  section: { type: Object, required: true },
})

const carouselRef = ref(null)
const scrollStep = 320

function scrollCarousel(direction) {
  const el = carouselRef.value
  if (!el) return
  el.scrollBy({ left: -direction * scrollStep, behavior: 'smooth' })
}
</script>

<template>
  <section class="mx-auto w-full max-w-[1440px] py-8 md:px-16 md:py-12">
    <div class="mb-4 flex items-center justify-between px-4 md:mb-6 md:px-0">
      <div class="flex flex-col gap-1">
        <span class="hidden text-xs font-medium uppercase tracking-widest text-secondary-800 md:block">
          {{ section.sectionLabel }}
        </span>
        <div class="flex items-center gap-2">
          <UiMaterialIcon name="auto_awesome" :size="22" class="text-secondary-600 md:hidden" />
          <h2 class="text-base font-semibold text-primary-900 md:text-2xl md:font-medium md:text-primary-600">
            {{ section.title }}
          </h2>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <button type="button" class="text-xs font-medium text-primary-600 md:hidden">
          {{ section.viewAllLabel }}
        </button>
        <div class="hidden items-center gap-1 md:flex">
          <button
            type="button"
            aria-label="محصولات قبلی"
            class="flex size-11 items-center justify-center rounded-full bg-surface text-text shadow-sm transition-all hover:bg-primary-600 hover:text-white"
            @click="scrollCarousel(-1)"
          >
            <UiMaterialIcon name="arrow_forward" :size="22" />
          </button>
          <button
            type="button"
            aria-label="محصولات بعدی"
            class="flex size-11 items-center justify-center rounded-full bg-surface text-text shadow-sm transition-all hover:bg-primary-600 hover:text-white"
            @click="scrollCarousel(1)"
          >
            <UiMaterialIcon name="arrow_back" :size="22" />
          </button>
        </div>
      </div>
    </div>

    <div
      ref="carouselRef"
      class="no-scrollbar flex items-stretch gap-4 overflow-x-auto scroll-smooth px-4 py-1 snap-x snap-mandatory select-none md:gap-6 md:px-0"
    >
      <ProductRelatedCard
        v-for="item in section.items"
        :key="item.id"
        :item="item"
        class="group"
      />
    </div>
  </section>
</template>
