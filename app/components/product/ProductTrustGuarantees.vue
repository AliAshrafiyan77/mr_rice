<script setup>
defineProps({
  items: { type: Array, required: true },
})
</script>

<template>
  <section class="mx-auto w-full max-w-[1440px] px-4 pt-6 md:px-16 md:pt-8">
    <div class="rounded-xl bg-primary-50/80 p-4 lg:bg-transparent lg:p-0">
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-3 lg:gap-4">
        <div
          v-for="(item, index) in items"
          :key="index"
          class="flex items-start gap-3 lg:items-center"
        >
          <div
            class="flex size-9 shrink-0 items-center justify-center rounded-full lg:size-9"
            :class="item.iconClass"
          >
            <UiMaterialIcon :name="item.icon" :size="20" />
          </div>
          <div class="flex flex-col">
            <span class="text-sm font-semibold text-text">{{ item.title }}</span>
            <span class="text-xs text-muted">{{ item.description }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
