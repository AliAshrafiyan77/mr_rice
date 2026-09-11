<script setup lang="ts">
import { bottomNavItems } from '~/data/homepage'
</script>

<template>
  <nav
    class="fixed inset-x-0 bottom-0 z-50 flex items-center justify-between border-t border-primary-100 bg-background/95 px-6 py-2 text-xs shadow-lg backdrop-blur-md lg:hidden"
  >
    <a
      v-for="item in bottomNavItems"
      :key="item.label"
      :href="item.href"
      :aria-label="item.label"
      class="relative flex flex-col items-center gap-0.5"
      :class="item.active ? 'font-bold text-primary-900' : 'text-muted'"
    >
      <UiMaterialIcon :name="item.icon" :size="22" :filled="item.active" />
      <span class="text-[10px]">{{ item.label }}</span>
      <span
        v-if="item.badge"
        class="absolute -top-1 right-2 flex size-4 items-center justify-center rounded-full bg-secondary-500 text-[9px] font-bold leading-none text-white"
      >
        {{ item.badge }}
      </span>
    </a>
  </nav>
</template>
