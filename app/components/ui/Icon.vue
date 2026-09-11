<script setup lang="ts">
defineOptions({ inheritAttrs: false })

const props = defineProps<{
  name: string
}>()

const attrs = useAttrs()

const icons = import.meta.glob('~/assets/icons/*.svg', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

const iconSvg = computed(() => {
  const match = Object.entries(icons).find(([path]) => path.endsWith(`/${props.name}.svg`))
  return match?.[1] ?? ''
})
</script>

<template>
  <span
    v-if="iconSvg"
    class="inline-flex shrink-0 items-center justify-center [&>svg]:size-full"
    :class="attrs.class"
    v-html="iconSvg"
    aria-hidden="true"
  />
</template>
