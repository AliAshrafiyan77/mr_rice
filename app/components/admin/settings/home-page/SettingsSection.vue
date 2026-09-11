<template>
  <section class="rounded-xl border border-border bg-surface p-4 md:p-6">
    <div class="mb-5 border-b border-border pb-4">
      <h2 class="text-base font-bold text-text">{{ title }}</h2>
      <p v-if="description" class="mt-1 text-sm text-muted">{{ description }}</p>
    </div>
    <slot />
  </section>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
})
</script>
