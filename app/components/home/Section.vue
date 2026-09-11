<script setup lang="ts">
defineProps<{
  id?: string
  band?: boolean
}>()
</script>

<template>
  <section
    :id="id"
    class="w-full"
    :class="band ? 'bg-primary-50 py-8 md:py-12' : 'py-6 md:py-12'"
  >
    <div class="mx-auto max-w-[1440px] px-4 md:px-16">
      <slot />
    </div>
  </section>
</template>
