<script setup lang="ts">
import {
  HERO_DESKTOP_BAG_URL,
  HERO_IMAGE_URL,
  heroAttributes,
  heroSpecsDesktop,
} from '~/data/homepage'
</script>

<template>
  <section class="flex flex-col items-center pt-2 text-center lg:items-start lg:pt-0 lg:text-right">
    <!-- Mobile hero -->
    <div class="flex w-full flex-col items-center lg:hidden">
      <div class="mb-3 inline-flex items-center gap-1.5 rounded-full border border-primary-100 bg-primary-50 px-3 py-1">
        <span class="size-1.5 animate-pulse rounded-full bg-secondary-500" />
        <span class="text-[11px] font-medium text-primary-600">شالیزارهای کهن شمال • گیلان و مازندران</span>
      </div>

      <h1 class="mb-2 max-w-xs text-2xl font-semibold leading-tight text-primary-900">
        اصالت بی‌همتا از شالیزارهای کهن شمال
      </h1>

      <p class="mb-4 max-w-xs text-xs leading-relaxed text-muted">
        دانه‌های معطر دست‌چین با آزمایش خلوص ژنتیکی و سورتینگ مدرن لیزری، ادای احترام به سفره مجلل ایرانی.
      </p>

      <div class="relative mx-auto flex w-full max-w-[290px] items-center justify-center py-2">
        <div class="absolute inset-0 -z-10 rounded-full bg-gradient-to-t from-secondary-500/15 to-transparent blur-2xl" />
        <img
          :src="HERO_IMAGE_URL"
          alt="طارم ممتاز ۱۰ کیلوگرم"
          class="mx-auto h-64 object-contain drop-shadow-xl"
        />
      </div>

      <div class="mb-4 mt-2 grid w-full grid-cols-3 gap-2">
        <div
          v-for="attr in heroAttributes"
          :key="attr.label"
          class="rounded-xl border border-border bg-surface p-2.5 text-center shadow-sm"
        >
          <span class="mb-0.5 block text-xs font-semibold text-secondary-500">{{ attr.label }}</span>
          <span class="block text-sm font-bold text-primary-900">{{ attr.value }}</span>
          <span class="text-[10px] text-muted">{{ attr.sub }}</span>
        </div>
      </div>

      <div class="flex w-full flex-col gap-2.5">
        <a
          href="#products"
          class="flex w-full items-center justify-center gap-1.5 rounded-xl bg-primary-900 px-4 py-3 text-xs font-semibold text-white shadow-sm transition-colors active:bg-primary-500"
        >
          <span>کشف مجموعه پاییزه</span>
          <UiMaterialIcon name="arrow_back" :size="16" />
        </a>
        <a
          href="#cooking-guide"
          class="flex w-full items-center justify-center gap-1.5 rounded-xl border border-border bg-surface px-4 py-3 text-xs font-medium text-text transition-colors active:bg-primary-50"
        >
          <UiMaterialIcon name="menu_book" :size="16" class="text-secondary-500" />
          <span>مشاوره پخت و انتخاب</span>
        </a>
      </div>
    </div>

    <!-- Desktop hero -->
    <div class="mx-auto hidden w-full max-w-[1440px] px-5 py-12 md:px-16 lg:grid lg:grid-cols-12 lg:items-center lg:gap-10">
      <div class="col-span-7 flex flex-col items-start space-y-4">
        <div class="inline-flex items-center gap-1 rounded-full bg-primary-50 px-4 py-1">
          <span class="size-2 animate-pulse rounded-full bg-secondary-800" />
          <span class="text-xs font-medium uppercase tracking-wide text-secondary-800">
            برداشت تازه پاییزه • شالیزارهای مازندران و گیلان
          </span>
        </div>

        <h1 class="text-4xl leading-tight text-primary-600 md:text-6xl">
          اصالت بی‌همتا از شالیزارهای کهن شمال تا خوان گسترده شما
        </h1>

        <p class="max-w-2xl text-justify text-lg leading-relaxed text-muted">
          آتلیه مستر رایس، میراث‌دار کشاورزی متعهد و خلوص مطلق طعم ایران‌زمین است. دانه‌هایی عطرآگین و گزینش‌شده با نظارت سخت‌گیرانه، بدون کوچک‌ترین اختلاط، و فرآوری‌شده در مدرن‌ترین تأسیسات سورتینگ لیزری کشور؛ ادای احترامی شایسته به سنت غنی آشپزی اصیل ایرانی.
        </p>

        <div class="grid w-full grid-cols-3 gap-4 pb-2 pt-1">
          <div
            v-for="spec in heroSpecsDesktop"
            :key="spec.label"
            class="rounded-xl bg-surface p-4 shadow-sm"
          >
            <span class="mb-1 block text-xs font-medium text-secondary-800">{{ spec.label }}</span>
            <span class="block text-xl font-semibold text-primary-600">{{ spec.value }}</span>
            <span class="text-sm text-muted">{{ spec.sub }}</span>
          </div>
        </div>

        <div class="flex flex-wrap items-center gap-4 pt-1">
          <a
            href="#signature-rice"
            class="group flex items-center gap-2 rounded-lg bg-primary-600 px-12 py-4 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-primary-500"
          >
            <span>کشف مجموعه پاییزه</span>
            <UiMaterialIcon
              name="arrow_back"
              :size="18"
              class="transition-transform duration-300 group-hover:-translate-x-1"
            />
          </a>
          <a
            href="#cooking-guide"
            class="flex items-center gap-1 rounded-lg bg-primary-50 px-7 py-4 text-sm font-semibold text-text transition-colors hover:bg-primary-100"
          >
            <UiMaterialIcon name="menu_book" :size="18" class="text-secondary-800" />
            <span>شیوه‌نامه پخت مجلسی</span>
          </a>
        </div>
      </div>

      <div class="relative col-span-5 flex items-center justify-center pt-4 lg:pt-0">
        <div class="absolute -inset-4 -z-10 rounded-full bg-gradient-to-tr from-secondary-100/30 via-primary-200/20 to-transparent opacity-70 blur-2xl" />
        <div class="relative w-full max-w-md rounded-xl bg-surface p-7 shadow-md">
          <div class="flex items-center justify-between pb-2">
            <div class="flex items-center gap-1">
              <UiMaterialIcon name="verified" :size="20" class="text-secondary-800" />
              <span class="text-xs font-medium text-secondary-800">پک اختصاصی آتلیه مستر رایس</span>
            </div>
            <span class="rounded bg-primary-100 px-2 py-0.5 text-xs text-muted">محصول ۱۴۰۳</span>
          </div>

          <div class="relative my-2 flex h-[380px] w-full items-center justify-center overflow-hidden rounded-xl bg-primary-50/60">
            <img
              :src="HERO_DESKTOP_BAG_URL"
              alt="کیسه نفیس ۱۰ کیلوگرمی برنج طارم هاشمی مستر رایس"
              class="h-full w-auto object-contain transition-transform duration-500 hover:scale-105"
            />
            <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface/60 via-transparent to-transparent" />
          </div>

          <div class="flex items-center justify-between pt-1">
            <div>
              <h3 class="text-xl font-semibold text-primary-600">طارم هاشمی ممتاز دانه بلند</h3>
              <p class="text-sm text-muted">کیسه کتان دست‌دوز با هوابندی دولایه</p>
            </div>
            <div class="text-left">
              <span class="block text-xs text-muted">بسته‌بندی ۱۰ کیلوگرمی</span>
              <span class="text-xl font-semibold text-secondary-800">۱,۹۵۰,۰۰۰ تومان</span>
            </div>
          </div>

          <div class="absolute -top-4 -right-4 hidden items-center gap-1 rounded-xl bg-surface px-4 py-1 shadow-md sm:flex">
            <UiMaterialIcon name="spa" :size="18" class="text-secondary-800" />
            <span class="text-xs font-semibold text-text">۱۰۰٪ خالص و بدون اختلاط</span>
          </div>
          <div class="absolute -bottom-3 -left-3 hidden items-center gap-1 rounded-xl bg-primary-600 px-4 py-1 text-white shadow-md sm:flex">
            <UiMaterialIcon name="workspace_premium" :size="18" class="text-secondary-200" />
            <span class="text-xs">معطر و پاک‌سازی‌شده با لیزر</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
