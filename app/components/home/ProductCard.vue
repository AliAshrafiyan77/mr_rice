<script setup lang="ts">
import type { Product } from '~/data/homepage'

defineProps<{
  product: Product
}>()
</script>

<template>
  <article
    class="flex flex-col justify-between rounded-xl border border-border bg-surface shadow-sm lg:group lg:p-4 lg:shadow-sm lg:transition-all lg:duration-300 lg:hover:-translate-y-1 lg:hover:shadow-md"
  >
    <div class="p-2.5 lg:p-0">
      <div class="mb-1 flex items-center justify-between lg:mb-1">
        <span
          class="rounded px-1.5 py-0.5 text-[9px] font-bold lg:px-2 lg:text-xs"
          :class="product.tagClass"
        >
          <span class="lg:hidden">{{ product.tag }}</span>
          <span class="hidden lg:inline">{{ product.priceLabel || product.tag }}</span>
        </span>
        <button type="button" aria-label="پسندیدن" class="text-muted transition-colors hover:text-secondary-500">
          <UiMaterialIcon name="favorite_border" class="lg:text-[20px]" :size="16" />
        </button>
      </div>

      <div
        class="mb-2 flex h-36 w-full items-center justify-center rounded-lg bg-primary-50/40 p-1 lg:mb-2 lg:h-64 lg:bg-primary-50/50 lg:p-2 lg:overflow-hidden"
      >
        <img
          :src="product.image"
          :alt="product.title"
          class="h-36 object-contain lg:h-full lg:w-auto lg:transition-transform lg:duration-300 lg:group-hover:scale-105"
        />
      </div>

      <span class="mb-1 hidden text-xs font-medium text-secondary-800 lg:block">{{ product.subtitleDesktop }}</span>
      <h3
        class="line-clamp-2 text-xs font-bold leading-snug text-primary-900 lg:mb-1 lg:text-xl lg:font-semibold lg:transition-colors lg:group-hover:text-primary-500"
      >
        {{ product.title }}
      </h3>
      <span class="mt-0.5 block text-[10px] text-muted lg:hidden">{{ product.subtitle }}</span>
    </div>

    <div class="mt-2 flex items-center justify-between border-t border-primary-50 p-2.5 pt-2 lg:mt-0 lg:border-0 lg:p-0 lg:pt-1">
      <div class="lg:rounded-lg lg:bg-primary-50/40 lg:p-2 lg:w-full lg:flex lg:items-center lg:justify-between">
        <div>
          <span class="block text-[9px] text-muted lg:text-xs">قیمت</span>
          <span class="text-xs font-bold text-primary-600 lg:text-xl lg:text-primary-600">
            <span class="lg:hidden">{{ product.price }}</span>
            <span class="hidden lg:inline">{{ product.price.replace(' ت', ' تومان') }}</span>
          </span>
        </div>
        <button
          type="button"
          aria-label="افزودن به سبد خرید"
          class="flex size-7 items-center justify-center rounded-lg bg-primary-900 text-white transition-transform active:scale-95 lg:size-auto lg:bg-primary-600 lg:p-2 lg:hover:bg-primary-500"
        >
          <UiMaterialIcon name="shopping_bag" :size="15" class="lg:text-[20px]" />
        </button>
      </div>
    </div>
  </article>
</template>
