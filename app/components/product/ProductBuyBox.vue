<script setup>
defineProps({
  product: { type: Object, required: true },
})

const { toPersianDigits } = useTools()

const quantity = ref(1)
const wishlisted = ref(false)
const cartAdded = ref(false)

const quantityDisplay = computed(() => toPersianDigits(quantity.value))

function adjustQuantity(delta) {
  quantity.value = Math.max(1, quantity.value + delta)
}

function onAddToCart() {
  cartAdded.value = true
  window.setTimeout(() => {
    cartAdded.value = false
  }, 1800)
}

async function onShare() {
  if (!import.meta.client) return
  try {
    await navigator.clipboard.writeText(window.location.href)
  } catch {
    /* ignore */
  }
}
</script>

<template>
  <div class="flex flex-col gap-5 md:gap-7">
    <div class="flex flex-col gap-1">
      <div class="flex flex-wrap items-center justify-between gap-2">
        <span
          class="inline-flex items-center gap-1.5 rounded-full bg-secondary-100/80 px-2 py-0.5 text-[10px] font-medium tracking-wide text-secondary-800 md:text-xs"
        >
          <span class="size-1.5 rounded-full bg-secondary-600" />
          {{ product.ribbon }}
        </span>
        <div class="flex items-center gap-2 text-[10px] text-muted md:text-xs">
          <span>شناسه زراعی:</span>
          <span class="font-mono font-semibold tracking-wider text-text">{{ product.agriculturalId }}</span>
        </div>
      </div>

      <h1 class="mt-1 text-xl font-semibold leading-tight text-primary-900 md:text-3xl md:text-primary-600 lg:text-4xl">
        {{ product.title }}
      </h1>

      <p class="text-sm leading-relaxed text-muted md:text-base">
        {{ product.description }}
      </p>

      <div id="reviews" class="mt-2 flex items-center gap-3 py-1 md:gap-4">
        <div class="flex items-center text-secondary-600">
          <UiMaterialIcon
            v-for="i in 4"
            :key="i"
            name="star"
            :size="18"
            filled
            class="md:text-[20px]"
          />
          <UiMaterialIcon name="star_half" :size="18" filled class="md:text-[20px]" />
        </div>
        <span class="text-sm font-bold text-text md:text-base">{{ product.rating }}</span>
        <span class="text-muted">|</span>
        <a
          href="#reviews"
          class="text-[11px] text-secondary-800 underline underline-offset-4 transition-colors hover:text-primary-600 md:text-xs"
        >
          {{ product.reviewLinkLabel }}
        </a>
      </div>
    </div>

    <div
      class="flex flex-col justify-between gap-4 rounded-xl bg-primary-50/80 p-4 sm:flex-row sm:items-center md:p-5"
    >
      <div class="flex flex-col">
        <span class="text-xs text-muted md:text-sm">{{ product.priceLabel }}</span>
        <div class="mt-1 flex items-baseline gap-1">
          <span class="text-2xl font-bold text-primary-600 md:text-3xl">{{ product.price }}</span>
          <span class="text-sm font-semibold text-text">تومان</span>
        </div>
        <span v-if="product.priceNote" class="mt-0.5 text-[11px] text-secondary-800 md:hidden">
          {{ product.priceNote }}
        </span>
      </div>
      <div class="flex items-center gap-2 rounded-lg bg-surface px-3 py-2 shadow-sm">
        <span class="size-2.5 animate-pulse rounded-full bg-primary-600" />
        <div class="flex flex-col">
          <span class="text-xs font-semibold text-primary-600">{{ product.stockTitle }}</span>
          <span class="text-[11px] text-muted">{{ product.stockHint }}</span>
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-1">
      <div class="flex items-center justify-between">
        <label class="text-sm font-semibold text-text">مشخصات وزن و بسته‌بندی:</label>
        <span class="text-xs text-secondary-800">{{ product.packagingHint }}</span>
      </div>
      <div
        class="flex items-center justify-between rounded-xl border border-border/60 bg-surface p-4 shadow-sm"
      >
        <div class="flex items-center gap-3">
          <div class="flex size-10 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
            <UiMaterialIcon name="inventory_2" :size="20" />
          </div>
          <div class="flex flex-col">
            <span class="text-sm font-semibold text-text">{{ product.packagingTitle }}</span>
            <span class="text-xs text-muted">{{ product.packagingDescription }}</span>
          </div>
        </div>
        <div class="flex items-center gap-1">
          <span class="text-lg font-bold text-primary-600">{{ product.packagingWeight }}</span>
          <span class="text-xs text-muted">{{ product.packagingWeightUnit }}</span>
        </div>
      </div>
    </div>

    <div class="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
      <div
        class="flex w-full items-center justify-between rounded-lg bg-surface p-1.5 shadow-sm sm:w-auto"
      >
        <button
          type="button"
          aria-label="کاهش تعداد"
          class="flex size-10 items-center justify-center rounded-md text-text transition-colors hover:bg-primary-50"
          @click="adjustQuantity(-1)"
        >
          <UiMaterialIcon name="remove" :size="18" />
        </button>
        <span class="w-12 text-center text-lg font-semibold text-primary-600">{{ quantityDisplay }}</span>
        <button
          type="button"
          aria-label="افزایش تعداد"
          class="flex size-10 items-center justify-center rounded-md text-text transition-colors hover:bg-primary-50"
          @click="adjustQuantity(1)"
        >
          <UiMaterialIcon name="add" :size="18" />
        </button>
      </div>

      <button
        type="button"
        class="flex w-full flex-1 items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-200 active:scale-[0.99] sm:py-3.5"
        :class="cartAdded ? 'bg-secondary-600' : 'bg-primary-600 hover:bg-primary-500'"
        @click="onAddToCart"
      >
        <UiMaterialIcon name="shopping_bag" :size="22" />
        <span>{{ cartAdded ? 'به سبد اضافه شد ✓' : 'افزودن به سبد سفارشات' }}</span>
      </button>

      <div class="flex items-center justify-end gap-2 self-stretch sm:self-auto">
        <button
          type="button"
          aria-label="افزودن به علاقه‌مندی‌ها"
          class="flex size-12 items-center justify-center rounded-lg bg-surface text-muted shadow-sm transition-all hover:bg-primary-50"
          @click="wishlisted = !wishlisted"
        >
          <UiMaterialIcon
            name="favorite"
            :size="22"
            :filled="wishlisted"
            :class="wishlisted ? 'text-danger' : ''"
          />
        </button>
        <button
          type="button"
          aria-label="اشتراک‌گذاری محصول"
          class="flex size-12 items-center justify-center rounded-lg bg-surface text-muted shadow-sm transition-all hover:bg-primary-50 hover:text-primary-600"
          @click="onShare"
        >
          <UiMaterialIcon name="share" :size="22" />
        </button>
      </div>
    </div>
  </div>
</template>
