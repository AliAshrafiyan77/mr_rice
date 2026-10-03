<script setup>
defineProps({
  item: { type: Object, required: true },
})

const added = ref(false)

function onQuickAdd() {
  added.value = true
  window.setTimeout(() => {
    added.value = false
  }, 1400)
}
</script>

<template>
  <article
    class="group flex w-44 shrink-0 snap-start flex-col justify-between rounded-xl bg-surface p-2 shadow-sm transition-all duration-300 hover:shadow-md sm:w-[280px] sm:p-4 lg:w-[320px]"
  >
    <div class="flex flex-col">
      <div
        class="relative mb-2 flex aspect-[3/4] w-full items-center justify-center overflow-hidden rounded-lg bg-primary-50/60 p-2 sm:mb-0 sm:aspect-auto sm:h-56"
      >
        <span
          class="absolute top-1.5 right-1.5 rounded-full bg-surface/90 px-2 py-0.5 text-[10px] font-medium text-secondary-800 sm:top-2 sm:right-2"
        >
          {{ item.badge }}
        </span>
        <img
          :src="item.image"
          :alt="item.alt"
          class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 sm:max-h-full sm:w-auto sm:object-contain"
        >
      </div>
      <div class="mt-2 flex flex-col gap-0.5 sm:mt-3">
        <span class="text-[11px] text-muted">{{ item.origin }}</span>
        <h3
          class="line-clamp-1 text-sm font-semibold text-text transition-colors group-hover:text-primary-600 sm:line-clamp-none sm:text-base"
        >
          {{ item.title }}
        </h3>
        <p class="line-clamp-1 text-[11px] text-muted sm:text-xs">
          {{ item.subtitle }}
        </p>
      </div>
    </div>
    <div class="mt-3 flex items-center justify-between border-t border-border pt-2">
      <div class="flex flex-col">
        <span class="text-sm font-bold text-primary-600 sm:text-lg">{{ item.price }}</span>
        <span class="text-[10px] text-muted">تومان</span>
      </div>
      <button
        type="button"
        :title="added ? 'افزوده شد' : 'افزودن سریع به سبد'"
        :aria-label="added ? 'افزوده شد' : 'افزودن سریع به سبد'"
        class="flex size-8 items-center justify-center rounded-lg transition-colors sm:size-9"
        :class="added ? 'bg-primary-600 text-white' : 'bg-primary-50 text-primary-600 hover:bg-primary-600 hover:text-white'"
        @click="onQuickAdd"
      >
        <UiMaterialIcon :name="added ? 'check' : 'add_shopping_cart'" :size="18" />
      </button>
    </div>
  </article>
</template>
