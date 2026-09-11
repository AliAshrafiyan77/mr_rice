<script setup lang="ts">
import { productFilters, productFiltersDesktop, products } from '~/data/homepage'

const activeFilter = ref(0)
</script>

<template>
  <section id="products" class="flex flex-col space-y-3.5 pt-1 lg:space-y-0 lg:py-12">
    <!-- Mobile -->
    <div class="lg:hidden">
      <div>
        <div class="mb-0.5 flex items-center gap-1 text-secondary-500">
          <UiMaterialIcon name="verified" :size="14" />
          <span class="text-[10px] font-semibold uppercase tracking-wider">محصولات منتخب آتلیه</span>
        </div>
        <h2 class="text-lg font-bold text-primary-900">ویترین اصیل مستر رایس</h2>
      </div>

      <div class="no-scrollbar -mx-4 flex items-center gap-1.5 overflow-x-auto px-4 pb-1">
        <button
          v-for="(filter, index) in productFilters"
          :key="filter"
          type="button"
          class="shrink-0 rounded-full px-3 py-1 text-xs shadow-sm"
          :class="activeFilter === index
            ? 'bg-primary-900 font-semibold text-white'
            : 'bg-primary-200 font-medium text-text'"
          @click="activeFilter = index"
        >
          {{ filter }}
        </button>
      </div>

      <div class="grid grid-cols-2 gap-3">
        <HomeProductCard v-for="product in products" :key="product.title" :product="product" />
      </div>
    </div>

    <!-- Desktop -->
    <div class="mx-auto hidden max-w-[1440px] px-5 md:px-16 lg:block">
      <div class="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <div class="mb-1 flex items-center gap-1 text-secondary-800">
            <UiMaterialIcon name="verified_user" :size="18" />
            <span class="text-xs font-medium uppercase tracking-wider">انتخاب سرآشپزان و خانواده‌های اصیل</span>
          </div>
          <h2 class="text-3xl font-medium text-primary-600 md:text-4xl">محصولات منتخب آتلیه مستر رایس</h2>
        </div>
        <div class="flex flex-wrap items-center gap-1">
          <button
            v-for="(filter, index) in productFiltersDesktop"
            :key="filter"
            type="button"
            class="rounded px-4 py-1 text-xs transition-colors"
            :class="activeFilter === index
              ? 'bg-primary-600 text-white shadow-sm'
              : 'bg-primary-100 text-text hover:bg-primary-200'"
            @click="activeFilter = index"
          >
            {{ filter }}
          </button>
        </div>
      </div>

      <div id="pulses-collection" class="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        <HomeProductCard v-for="product in products" :key="product.title" :product="product" />
      </div>
    </div>
  </section>
</template>
