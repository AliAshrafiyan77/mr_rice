<script setup lang="ts">
import { trustPillars } from '~/data/homepage'
</script>

<template>
  <section id="trust" class="lg:py-0">
    <!-- Mobile -->
    <div class="space-y-3 rounded-2xl border border-border bg-primary-50/80 p-4 lg:hidden">
      <div class="text-center">
        <span class="mb-1 block text-[10px] font-bold uppercase tracking-widest text-secondary-500">منشور اعتماد</span>
        <h2 class="text-base font-bold text-primary-900">تعهد کیفیت آتلیه مستر رایس</h2>
      </div>
      <div class="grid grid-cols-2 gap-2.5">
        <div
          v-for="pillar in trustPillars"
          :key="pillar.title"
          class="rounded-xl border border-border bg-surface p-3"
        >
          <div
            class="mb-2 flex size-8 items-center justify-center rounded-lg"
            :class="pillar.iconBg"
          >
            <UiMaterialIcon :name="pillar.icon" :size="18" />
          </div>
          <h4 class="mb-1 text-xs font-bold text-primary-900">{{ pillar.title }}</h4>
          <p class="text-[10px] leading-relaxed text-muted">{{ pillar.description }}</p>
        </div>
      </div>
    </div>

    <!-- Desktop -->
    <div class="hidden bg-primary-200/60 py-12 lg:block">
      <div class="mx-auto max-w-[1440px] px-5 md:px-16">
        <div class="mx-auto mb-12 max-w-2xl text-center">
          <span class="mb-1 block text-xs font-medium uppercase tracking-widest text-secondary-800">
            سنجش و راستی‌آزمایی مستمر
          </span>
          <h2 class="mb-1 text-3xl font-medium text-primary-600 md:text-4xl">
            منشور کیفیت و تعهد آتلیه مستر رایس
          </h2>
          <p class="text-base text-muted">
            چهار ستون استوار که کیفیت هر کیسه برنج و هر بسته حبوبات خروجی از آتلیه را تا سفره شما تضمین می‌کنند.
          </p>
        </div>
        <div class="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="pillar in trustPillars"
            :key="pillar.title"
            class="flex flex-col items-start rounded-xl bg-surface p-7 shadow-sm"
          >
            <div class="mb-4 flex size-12 items-center justify-center rounded-lg bg-primary-100 text-primary-600">
              <UiMaterialIcon :name="pillar.icon" :size="26" />
            </div>
            <h3 class="mb-1 text-xl font-semibold text-primary-600">{{ pillar.title }}</h3>
            <p class="text-sm leading-relaxed text-muted">{{ pillar.descriptionDesktop }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
