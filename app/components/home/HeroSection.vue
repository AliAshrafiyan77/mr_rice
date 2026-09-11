<script setup lang="ts">
import { HERO_BAG_URL, heroSpecs } from '~/data/homepage'
</script>

<template>
  <HomeSection>
    <div class="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10">
      <div class="flex flex-col items-center space-y-4 text-center lg:col-span-7 lg:items-start lg:text-right">
        <div class="inline-flex items-center gap-1.5 rounded-full border border-primary-100 bg-primary-50 px-3 py-1 md:px-4">
          <span class="size-1.5 animate-pulse rounded-full bg-secondary-500 md:size-2 md:bg-secondary-800" />
          <span class="text-[11px] font-medium text-primary-600 md:text-xs md:text-secondary-800">
            برداشت تازه پاییزه • شالیزارهای مازندران و گیلان
          </span>
        </div>

        <h1 class="max-w-xs text-2xl font-semibold leading-tight text-primary-900 md:max-w-none md:text-4xl lg:text-6xl lg:text-primary-600">
          اصالت بی‌همتا از شالیزارهای کهن شمال تا خوان گسترده شما
        </h1>

        <p class="max-w-xs text-xs leading-relaxed text-muted md:max-w-2xl md:text-base md:text-justify lg:text-lg">
          آتلیه مستر رایس، میراث‌دار کشاورزی متعهد و خلوص مطلق طعم ایران‌زمین است. دانه‌هایی عطرآگین و گزینش‌شده با نظارت سخت‌گیرانه، بدون کوچک‌ترین اختلاط، و فرآوری‌شده در مدرن‌ترین تأسیسات سورتینگ لیزری کشور؛ ادای احترامی شایسته به سنت غنی آشپزی اصیل ایرانی.
        </p>

        <div class="grid w-full grid-cols-3 gap-2 md:gap-4">
          <div
            v-for="spec in heroSpecs"
            :key="spec.label"
            class="rounded-xl border border-border bg-surface p-2.5 text-center shadow-sm md:p-4 md:text-right lg:border-0"
          >
            <span class="mb-0.5 block text-[10px] font-semibold text-secondary-500 md:text-xs md:font-medium md:text-secondary-800">
              {{ spec.label }}
            </span>
            <span class="block text-sm font-bold text-primary-900 md:text-xl md:font-semibold md:text-primary-600">
              {{ spec.value }}
            </span>
            <span class="text-[10px] text-muted md:text-sm">{{ spec.sub }}</span>
          </div>
        </div>

        <div class="flex w-full flex-col gap-2.5 sm:flex-row sm:flex-wrap md:gap-4">
          <a
            href="#signature-rice"
            class="group flex w-full items-center justify-center gap-1.5 rounded-xl bg-primary-900 px-4 py-3 text-xs font-semibold text-white shadow-sm transition-all active:bg-primary-500 sm:w-auto md:rounded-lg md:bg-primary-600 md:px-12 md:py-4 md:text-sm md:hover:bg-primary-500"
          >
            <span>کشف مجموعه پاییزه</span>
            <UiMaterialIcon
              name="arrow_back"
              :size="16"
              class="md:text-[18px] md:transition-transform md:duration-300 md:group-hover:-translate-x-1"
            />
          </a>
          <a
            href="#cooking-guide"
            class="flex w-full items-center justify-center gap-1.5 rounded-xl border border-border bg-surface px-4 py-3 text-xs font-medium text-text transition-colors active:bg-primary-50 sm:w-auto md:rounded-lg md:border-0 md:bg-primary-50 md:px-7 md:py-4 md:text-sm md:hover:bg-primary-100"
          >
            <UiMaterialIcon name="menu_book" :size="16" class="text-secondary-500 md:text-secondary-800 md:text-[18px]" />
            <span>شیوه‌نامه پخت مجلسی</span>
          </a>
        </div>
      </div>

      <div class="relative flex items-center justify-center lg:col-span-5">
        <div class="absolute -inset-4 -z-10 rounded-full bg-gradient-to-tr from-secondary-500/15 via-primary-200/20 to-transparent blur-2xl lg:opacity-70" />
        <div class="relative w-full max-w-md rounded-xl bg-surface p-4 shadow-md md:p-7">
          <div class="flex items-center justify-between pb-2">
            <div class="flex items-center gap-1">
              <UiMaterialIcon name="verified" :size="20" class="text-secondary-800" />
              <span class="text-[10px] font-medium text-secondary-800 md:text-xs">پک اختصاصی آتلیه مستر رایس</span>
            </div>
            <span class="rounded bg-primary-100 px-2 py-0.5 text-[10px] text-muted md:text-xs">محصول ۱۴۰۳</span>
          </div>

          <div class="relative my-2 flex h-48 w-full items-center justify-center overflow-hidden rounded-xl bg-primary-50/60 md:h-[380px]">
            <img
              :src="HERO_BAG_URL"
              alt="کیسه نفیس ۱۰ کیلوگرمی برنج طارم هاشمی مستر رایس"
              class="h-full w-auto object-contain transition-transform duration-500 hover:scale-105"
            />
            <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface/60 via-transparent to-transparent" />
          </div>

          <div class="flex items-center justify-between pt-1">
            <div class="text-right">
              <h3 class="text-sm font-semibold text-primary-600 md:text-xl">طارم هاشمی ممتاز دانه بلند</h3>
              <p class="text-[11px] text-muted md:text-sm">کیسه کتان دست‌دوز با هوابندی دولایه</p>
            </div>
            <div class="text-left">
              <span class="block text-[10px] text-muted md:text-xs">بسته‌بندی ۱۰ کیلوگرمی</span>
              <span class="text-sm font-semibold text-secondary-800 md:text-xl">۱,۹۵۰,۰۰۰ تومان</span>
            </div>
          </div>

          <div class="absolute -top-3 -right-3 flex items-center gap-1 rounded-xl bg-surface px-3 py-1 shadow-md md:-top-4 md:-right-4 md:px-4">
            <UiMaterialIcon name="spa" :size="16" class="text-secondary-800 md:text-[18px]" />
            <span class="text-[10px] font-semibold text-text md:text-xs">۱۰۰٪ خالص و بدون اختلاط</span>
          </div>
          <div class="absolute -bottom-2 -left-2 flex items-center gap-1 rounded-xl bg-primary-600 px-3 py-1 text-white shadow-md md:-bottom-3 md:-left-3 md:px-4">
            <UiMaterialIcon name="workspace_premium" :size="16" class="text-secondary-200 md:text-[18px]" />
            <span class="text-[10px] md:text-xs">معطر و پاک‌سازی‌شده با لیزر</span>
          </div>
        </div>
      </div>
    </div>
  </HomeSection>
</template>
