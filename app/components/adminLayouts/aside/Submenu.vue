<template>
  <li>
    <div
      class="flex items-center justify-between px-4 py-2.5 cursor-pointer select-none rounded-lg text-primary-100 hover:bg-primary-600 transition-colors"
      @click="toggleSubmenu()"
    >
      <span class="text-sm font-medium">{{ title }}</span>
      <svg
        class="w-4 h-4 transition-transform duration-200"
        :class="showSubmenu ? '-rotate-90' : 'rotate-0'"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </div>

    <ul
      class="overflow-hidden transition-all duration-300 ease-in-out pr-3"
      :class="showSubmenu ? 'max-h-96 opacity-100 mt-1' : 'max-h-0 opacity-0'"
    >
      <slot />
    </ul>
  </li>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  title: {
    type: String,
    required: true,
  },
})

const showSubmenu = ref(false)

const toggleSubmenu = () => {
  showSubmenu.value = !showSubmenu.value
}
</script>