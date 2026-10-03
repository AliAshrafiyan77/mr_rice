<script setup>
defineProps({
  items: { type: Array, required: true },
  trustBadge: { type: String, required: true },
})
</script>

<template>
  <div class="w-full border-b border-border/60 bg-primary-50/60">
    <div class="mx-auto flex max-w-[1440px] items-center justify-between px-4 py-2 md:px-16">
      <nav aria-label="مسیر راهنما" class="flex min-w-0 flex-wrap items-center gap-1 text-[11px] text-muted md:text-xs">
        <template v-for="(item, index) in items" :key="index">
          <NuxtLink
            v-if="item.href"
            :to="item.href"
            class="truncate transition-colors hover:text-primary-600"
          >
            {{ item.label }}
          </NuxtLink>
          <span
            v-else
            class="truncate font-semibold text-primary-600"
          >
            {{ item.label }}
          </span>
          <UiMaterialIcon
            v-if="index < items.length - 1"
            name="chevron_left"
            :size="14"
            class="shrink-0 text-muted"
          />
        </template>
      </nav>
      <div class="hidden shrink-0 items-center gap-2 text-xs font-medium text-secondary-800 md:flex">
        <UiMaterialIcon name="verified_user" :size="18" />
        <span>{{ trustBadge }}</span>
      </div>
    </div>
  </div>
</template>
