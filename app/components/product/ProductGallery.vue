<script setup>
const props = defineProps({
  images: { type: Array, required: true },
  badges: { type: Array, required: true },
  mainAlt: { type: String, required: true },
  zoomHint: { type: String, required: true },
})
console.log(props.images);

const activeIndex = ref(0)
const imageVisible = ref(true)

const mainSrc = computed(() => props.images[activeIndex.value]?.src ?? props.images[0]?.src ?? '')

const topRightBadges = computed(() => props.badges.filter(b => b.position === 'top-right'))
const topLeftBadges = computed(() => props.badges.filter(b => b.position === 'top-left'))

function selectImage(index) {
  if (index === activeIndex.value) return
  imageVisible.value = false
  window.setTimeout(() => {
    activeIndex.value = index
    imageVisible.value = true
  }, 150)
}

function badgeClasses(variant) {
  if (variant === 'primary') return 'bg-primary-600/95 text-white'
  if (variant === 'muted') return 'bg-primary-50/90 text-muted backdrop-blur-sm'
  return 'bg-surface/90 text-primary-600 backdrop-blur-sm'
}
</script>

<template>
  <div class="flex flex-col gap-3 md:gap-4">
    <div
      class="group relative overflow-hidden rounded-xl bg-surface p-4 shadow-sm md:p-6 lg:p-8"
    >
      <div
        class="pointer-events-none absolute inset-0 bg-gradient-to-b from-secondary-100/30 via-transparent to-primary-50/40"
      />

      <div class="absolute top-3 right-3 z-10 flex flex-col items-end gap-1.5 md:top-4 md:right-4">
        <span
          v-for="(badge, i) in topRightBadges"
          :key="i"
          class="flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-medium shadow-sm md:text-xs"
          :class="badgeClasses(badge.variant)"
        >
          <UiMaterialIcon v-if="badge.icon" :name="badge.icon" :size="14" />
          {{ badge.text }}
        </span>
      </div>

      <div class="absolute top-3 left-3 z-10 md:top-4 md:left-4">
        <span
          v-for="(badge, i) in topLeftBadges"
          :key="i"
          class="flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-medium shadow-sm backdrop-blur-sm md:text-xs"
          :class="badgeClasses(badge.variant)"
        >
          <UiMaterialIcon v-if="badge.icon" :name="badge.icon" :size="14" class="text-primary-600" />
          {{ badge.text }}
        </span>
      </div>

      <div class="relative flex w-full items-center justify-center py-2 md:py-4">
        <img
          :src="mainSrc"
          :alt="mainAlt"
          class="max-h-[min(70vh,520px)] w-full object-contain transition-all duration-500 ease-out group-hover:scale-[1.02] md:group-hover:scale-105"
          :class="imageVisible ? 'opacity-100' : 'opacity-0'"
        >
      </div>

      <div class="absolute bottom-3 right-3 hidden items-center gap-1 text-[10px] text-muted opacity-70 md:flex md:text-xs">
        <UiMaterialIcon name="zoom_in" :size="16" />
        <span>{{ zoomHint }}</span>
      </div>

      <div class="absolute bottom-3 left-3 flex size-8 items-center justify-center rounded-full bg-surface/80 text-text shadow-sm md:hidden">
        <UiMaterialIcon name="crop_free" :size="18" />
      </div>
    </div>

    <div class="grid grid-cols-4 gap-1 sm:gap-2">
      <button
        v-for="(thumb, index) in images"
        :key="index"
        type="button"
        :aria-label="thumb.label"
        class="flex flex-col items-center justify-center rounded-lg bg-surface p-1 shadow-sm transition-all duration-200 hover:shadow-md"
        :class="activeIndex === index
          ? 'ring-2 ring-primary-600 opacity-100'
          : 'opacity-80 hover:opacity-100'"
        @click="selectImage(index)"
      >
        <div class="flex h-14 w-full items-center justify-center overflow-hidden sm:h-16">
          <UiMaterialIcon
            v-if="thumb.icon"
            :name="thumb.icon"
            :size="28"
            class="text-primary-600"
          />
          <img
            v-else
            :src="thumb.src"
            :alt="thumb.alt"
            class="max-h-full object-contain"
            :class="index === 2 ? 'object-cover' : ''"
          >
        </div>
        <span class="mt-1 text-[9px] text-text sm:text-[10px]">{{ thumb.label }}</span>
      </button>
    </div>
  </div>
</template>
