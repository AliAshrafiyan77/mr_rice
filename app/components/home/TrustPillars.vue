<script setup lang="ts">
import { trustPillars } from '~/data/homepage'
</script>

<template>
  <HomeSection id="trust" band>
    <div class="mx-auto mb-6 max-w-2xl text-center md:mb-12">
      <span class="mb-1 block text-[10px] font-bold uppercase tracking-widest text-secondary-500 md:text-xs md:font-medium md:text-secondary-800">
        سنجش و راستی‌آزمایی مستمر
      </span>
      <h2 class="text-base font-bold text-primary-900 md:text-3xl md:font-medium md:text-primary-600 lg:text-4xl">
        منشور کیفیت و تعهد آتلیه مستر رایس
      </h2>
      <p class="mt-2 text-xs text-muted md:text-base">
        چهار ستون استوار که کیفیت هر کیسه برنج و هر بسته حبوبات خروجی از آتلیه را تا سفره شما تضمین می‌کنند.
      </p>
    </div>

    <div class="grid grid-cols-2 gap-2.5 md:grid-cols-2 md:gap-10 lg:grid-cols-4">
      <div
        v-for="pillar in trustPillars"
        :key="pillar.title"
        class="flex flex-col rounded-xl border border-border bg-surface p-3 md:border-0 md:p-7 md:shadow-sm"
      >
        <div
          class="mb-2 flex size-8 items-center justify-center rounded-lg md:mb-4 md:size-12"
          :class="pillar.iconBg"
        >
          <UiMaterialIcon :name="pillar.icon" :size="18" class="md:text-[26px]" />
        </div>
        <h3 class="mb-1 text-xs font-bold text-primary-900 md:text-xl md:font-semibold md:text-primary-600">
          {{ pillar.title }}
        </h3>
        <p class="text-[10px] leading-relaxed text-muted md:text-sm">{{ pillar.description }}</p>
      </div>
    </div>
  </HomeSection>
</template>
