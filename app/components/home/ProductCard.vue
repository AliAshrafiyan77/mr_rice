<script setup lang="ts">
import type { Product } from '~/data/homepage'

defineProps<{
  product: Product
}>()
</script>

<template>
  <article
    class="group flex flex-col justify-between rounded-xl border border-border bg-surface p-2.5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md md:p-4"
  >
    <div>
      <div class="mb-1 flex items-center justify-between">
        <span class="rounded px-1.5 py-0.5 text-[9px] font-bold md:px-2 md:text-xs" :class="product.badgeClass">
          {{ product.badge }}
        </span>
        <button type="button" aria-label="پسندیدن" class="text-muted transition-colors hover:text-secondary-500">
          <UiMaterialIcon name="favorite_border" :size="16" class="md:text-[20px]" />
        </button>
      </div>

      <div class="mb-2 flex h-36 w-full items-center justify-center overflow-hidden rounded-lg bg-primary-50/40 p-1 md:h-64 md:bg-primary-50/50 md:p-2">
        <img
          :src="product.image"
          :alt="product.title"
          class="h-36 object-contain transition-transform duration-300 group-hover:scale-105 md:h-full md:w-auto"
        />
      </div>

      <span class="mb-1 block text-[10px] font-medium text-secondary-800 md:text-xs">{{ product.origin }}</span>
      <h3 class="line-clamp-2 text-xs font-bold leading-snug text-primary-900 transition-colors group-hover:text-primary-500 md:text-xl md:font-semibold">
        {{ product.title }}
      </h3>
    </div>

    <div class="mt-2 rounded-lg bg-primary-50/40 p-2 pt-2 md:mt-1 md:pt-1">
      <div class="flex items-center justify-between">
        <div>
          <span class="block text-[9px] text-muted md:text-xs">قیمت با تضمین اصالت</span>
          <span class="text-xs font-bold text-primary-600 md:text-xl">{{ product.price }}</span>
        </div>
        <button
          type="button"
          aria-label="افزودن به سبد خرید"
          class="flex size-7 items-center justify-center rounded-lg bg-primary-900 text-white transition-colors active:scale-95 md:size-auto md:bg-primary-600 md:p-2 md:hover:bg-primary-500"
        >
          <UiMaterialIcon name="shopping_bag" :size="15" class="md:text-[20px]" />
        </button>
      </div>
    </div>
  </article>
</template>
