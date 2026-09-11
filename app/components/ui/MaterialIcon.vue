<script setup lang="ts">
defineOptions({ inheritAttrs: false })

defineProps<{
  name: string
  filled?: boolean
  size?: number
}>()
</script>

<template>
  <span
    v-bind="$attrs"
    class="material-symbols-outlined leading-none"
    :style="{
      fontSize: size ? `${size}px` : undefined,
      fontVariationSettings: filled ? `'FILL' 1` : undefined,
    }"
  >{{ name }}</span>
</template>
