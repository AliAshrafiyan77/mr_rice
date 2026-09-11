<script setup lang="ts">
import { productFilters, products } from '~/data/homepage'

const activeFilter = ref(0)
</script>

<template>
  <HomeSection id="products">
    <div class="mb-6 flex flex-col justify-between gap-4 md:mb-12 md:flex-row md:items-end">
      <div>
        <div class="mb-0.5 flex items-center gap-1 text-secondary-500 md:mb-1 md:text-secondary-800">
          <UiMaterialIcon name="verified_user" :size="14" class="md:text-[18px]" />
          <span class="text-[10px] font-semibold uppercase tracking-wider md:text-xs md:font-medium">
            انتخاب سرآشپزان و خانواده‌های اصیل
          </span>
        </div>
        <h2 class="text-lg font-bold text-primary-900 md:text-3xl md:font-medium md:text-primary-600 lg:text-4xl">
          محصولات منتخب آتلیه مستر رایس
        </h2>
      </div>

      <div class="no-scrollbar -mx-4 flex items-center gap-1.5 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-wrap md:overflow-visible md:px-0 md:pb-0">
        <button
          v-for="(filter, index) in productFilters"
          :key="filter"
          type="button"
          class="shrink-0 rounded-full px-3 py-1 text-xs transition-colors md:rounded md:px-4"
          :class="activeFilter === index
            ? 'bg-primary-900 font-semibold text-white shadow-sm md:bg-primary-600'
            : 'bg-primary-200 font-medium text-text md:bg-primary-100 md:hover:bg-primary-200'"
          @click="activeFilter = index"
        >
          {{ filter }}
        </button>
      </div>
    </div>

    <div id="pulses-collection" class="grid grid-cols-2 gap-3 md:gap-10 lg:grid-cols-3">
      <HomeProductCard v-for="product in products" :key="product.title" :product="product" />
    </div>
  </HomeSection>
</template>
