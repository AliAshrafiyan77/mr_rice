<script setup>
defineProps({
  title: { type: String, required: true },
  badge: { type: String, required: true },
  metrics: { type: Array, required: true },
})
</script>

<template>
  <section class="mx-auto w-full max-w-[1440px] px-4 md:px-16">
    <div class="flex flex-col gap-3 lg:gap-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <UiMaterialIcon name="science" :size="20" class="text-primary-600 lg:hidden" />
          <h2 class="text-base font-semibold text-text md:text-lg lg:text-xl lg:font-medium lg:text-primary-600">
            {{ title }}
          </h2>
        </div>
        <span class="text-xs font-medium text-secondary-800">{{ badge }}</span>
      </div>

      <!-- Mobile: 2x2 cards with icons -->
      <div class="grid grid-cols-2 gap-2 lg:hidden">
        <div
          v-for="(metric, index) in metrics"
          :key="index"
          class="flex flex-col gap-1 rounded-xl bg-surface p-4 shadow-sm"
        >
          <div class="flex items-center justify-between text-muted">
            <span class="text-xs font-medium">{{ metric.label }}</span>
            <UiMaterialIcon
              :name="metric.icon"
              :size="18"
              :class="metric.accent === 'secondary' ? 'text-secondary-600' : 'text-primary-600'"
            />
          </div>
          <span class="mt-1 text-base font-bold text-text">
            {{ metric.value }}
            <span v-if="metric.valueSuffix" class="text-xs font-normal">{{ metric.valueSuffix }}</span>
          </span>
          <span class="text-xs text-muted">{{ metric.hint }}</span>
        </div>
      </div>

      <!-- Desktop: compact bento strip -->
      <div class="hidden gap-1 rounded-xl bg-surface p-2 shadow-sm lg:grid lg:grid-cols-4">
        <div
          v-for="(metric, index) in metrics"
          :key="index"
          class="flex flex-col rounded-lg bg-primary-50/50 p-3"
        >
          <span class="text-xs text-muted">{{ metric.label }}</span>
          <span
            class="mt-1 text-base font-bold"
            :class="metric.accent === 'secondary' ? 'text-secondary-800' : 'text-primary-600'"
          >
            {{ metric.value }}
            <span v-if="metric.valueSuffix" class="text-xs font-normal">{{ metric.valueSuffix }}</span>
          </span>
          <span class="mt-0.5 text-[11px] text-muted">{{ metric.hint }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
