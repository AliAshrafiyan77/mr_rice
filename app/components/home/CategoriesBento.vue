<script setup lang="ts">
import { pulseItems, riceMicroSpecs, riceVariants } from '~/data/homepage'

const selectedRice = ref(riceVariants[0])

function selectRice(variant: typeof riceVariants[number]) {
  selectedRice.value = variant
}
</script>

<template>
  <HomeSection id="signature-rice" band>
    <div class="mb-6 flex flex-col justify-between gap-4 md:mb-8 md:flex-row md:items-end">
      <div>
        <div class="mb-1 flex items-center gap-1 text-secondary-500 md:text-secondary-800">
          <UiMaterialIcon name="all_inclusive" :size="14" class="md:text-[18px]" />
          <span class="text-[10px] font-bold uppercase tracking-widest md:text-xs md:font-medium">
            کلکسیون فصلی مستر رایس
          </span>
        </div>
        <h2 class="text-lg font-bold text-primary-900 md:text-3xl md:font-medium md:text-primary-600 lg:text-4xl">
          دسته‌بندی‌های برگزیده و ارکان اصالت
        </h2>
      </div>
      <p class="max-w-md text-xs text-muted md:text-base">
        سه ستون بنیادین آتلیه: برنج‌های عتیقه شالیزار، حبوبات کریستالی سورت‌شده و مغزهای لوکس باغات باستانی ایران.
      </p>
    </div>

    <div class="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-10">
      <!-- Rice bento -->
      <div class="flex flex-col justify-between rounded-2xl border border-border bg-surface p-4 shadow-sm md:rounded-xl md:p-7 lg:col-span-7">
        <div>
          <div class="mb-2 flex items-center justify-between md:mb-4">
            <span class="rounded-md bg-primary-200/60 px-2 py-0.5 text-[10px] font-semibold text-primary-900 md:rounded md:text-xs">
              رکن اول • شالیزار ممتاز
            </span>
            <div class="flex items-center gap-0.5 text-secondary-500 md:gap-1 md:text-secondary-800">
              <UiMaterialIcon name="star" :size="14" filled class="md:text-[18px]" />
              <span class="text-[11px] font-bold md:text-sm">امتیاز عطر: ۵ از ۵</span>
            </div>
          </div>
          <h3 class="mb-1 text-base font-bold text-primary-900 md:text-2xl md:font-medium md:text-primary-600">
            برنج‌های کهنه و تازه طارم و دم‌سیاه
          </h3>
          <p class="mb-3 text-xs leading-relaxed text-muted md:mb-4 md:text-base">
            دانه‌بندی یکدست، شسته‌شده و هوادهی‌شده به روش سنتی جهت حداکثر قدکشی و عطر ماندگار سر سفره‌های اشرافی.
          </p>

          <div class="mb-3 md:mb-4">
            <span class="mb-1 block text-[10px] text-muted md:text-xs">انتخاب وزن بسته‌بندی نفیس:</span>
            <div class="flex flex-wrap gap-1.5 md:gap-1">
              <button
                v-for="variant in riceVariants"
                :key="variant.id"
                type="button"
                class="rounded-lg px-3 py-1.5 text-xs font-semibold transition-all md:rounded md:px-4 md:py-1"
                :class="selectedRice.id === variant.id
                  ? 'bg-primary-900 text-white shadow-sm md:bg-primary-600'
                  : 'bg-primary-100 text-text md:hover:bg-primary-200'"
                @click="selectRice(variant)"
              >
                {{ variant.label }}
              </button>
            </div>
          </div>

          <div class="grid grid-cols-1 items-center gap-3 rounded-xl bg-primary-50/60 p-3 sm:grid-cols-2 md:gap-4 md:p-4">
            <div class="flex h-44 items-center justify-center rounded-lg bg-surface p-1 md:h-56">
              <img
                :src="selectedRice.image"
                alt="تصویر برنج مستر رایس"
                class="h-full w-auto object-contain transition-all duration-300"
              />
            </div>
            <div class="flex flex-col justify-between space-y-1">
              <div>
                <span class="block text-[10px] font-semibold text-secondary-500 md:text-xs md:text-secondary-800">
                  {{ selectedRice.packagingLabel }}
                </span>
                <h4 class="text-sm font-bold text-primary-900 md:text-xl md:font-semibold md:text-primary-600">
                  {{ selectedRice.title }}
                </h4>
                <p class="mt-0.5 text-[11px] text-muted md:mt-1 md:text-sm">
                  تضمین عدم شکستگی و خردی دانه زیر ۲٪، دارای گواهی آزمون رطوبت.
                </p>
              </div>
              <div class="flex items-center justify-between border-t border-border pt-2 md:border-0 md:pt-1">
                <div>
                  <span class="block text-[10px] text-muted md:text-xs">قیمت محصول</span>
                  <span class="text-sm font-bold text-primary-900 md:text-2xl md:text-secondary-800">
                    {{ selectedRice.price }}
                  </span>
                </div>
                <button
                  type="button"
                  class="flex items-center gap-1 rounded-lg bg-primary-600 px-3 py-1.5 text-xs font-medium text-white md:rounded md:px-4 md:py-1 md:hover:bg-primary-500"
                >
                  <UiMaterialIcon name="add_shopping_cart" :size="14" class="md:text-[16px]" />
                  <span>سفارش</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-3 grid grid-cols-3 gap-2 rounded-lg bg-primary-50/40 p-2 pt-3 md:mt-4 md:pt-4">
          <div v-for="spec in riceMicroSpecs" :key="spec.label" class="text-center">
            <span class="block text-[10px] text-muted md:text-xs">{{ spec.label }}</span>
            <span class="text-sm font-bold text-primary-900 md:text-xl md:font-semibold md:text-primary-600">
              {{ spec.value }}
            </span>
          </div>
        </div>
      </div>

      <!-- Side stack -->
      <div class="flex flex-col gap-4 lg:col-span-5 lg:gap-10">
        <!-- Pulses -->
        <div class="flex flex-col justify-between rounded-2xl border border-border bg-surface p-4 shadow-sm md:rounded-xl md:p-7">
          <div>
            <div class="mb-2 flex items-center justify-between md:mb-1">
              <span class="rounded-md bg-secondary-200/60 px-2 py-0.5 text-[10px] font-semibold text-secondary-900 md:rounded md:text-xs">
                رکن دوم • حبوبات بلورین
              </span>
              <span class="text-[10px] font-medium text-secondary-500 md:text-xs md:font-semibold md:text-secondary-800">
                بوجاری لیزری
              </span>
            </div>
            <h3 class="mb-1 text-base font-bold text-primary-900 md:text-xl md:font-semibold md:text-primary-600">
              حبوبات دست‌چین و بدون ضایعات
            </h3>
            <p class="mb-3 text-xs leading-relaxed text-muted md:mb-4 md:text-sm">
              عدس قرمز صادراتی و نخود آبگوشتی کرمانشاه؛ زمان پخت کوتاه، بافتی لطیف و بدون ناخالصی.
            </p>
            <div class="grid grid-cols-2 gap-2">
              <div
                v-for="item in pulseItems"
                :key="item.name"
                class="flex flex-col items-center rounded-xl bg-primary-50/70 p-2.5 text-center md:rounded-lg md:bg-primary-50/60 md:p-1"
              >
                <div class="mb-1.5 flex h-24 w-full items-center justify-center md:mb-2 md:h-28 md:rounded md:bg-surface">
                  <img
                    :src="item.image"
                    :alt="item.name"
                    class="h-24 w-16 object-contain md:h-full md:w-auto md:transition-transform md:duration-300 md:hover:scale-105"
                  />
                </div>
                <span class="text-xs font-semibold text-primary-900 md:text-primary-600">{{ item.name }}</span>
                <span class="mt-0.5 text-[11px] font-bold text-secondary-500 md:mt-1 md:text-sm md:text-secondary-800">
                  {{ item.price }}
                </span>
              </div>
            </div>
          </div>
          <div class="mt-3 flex items-center justify-between pt-1 md:mt-4">
            <span class="text-[11px] text-muted md:text-sm">بسته‌بندی پنجره‌دار عایق رطوبت</span>
            <a
              href="#pulses-collection"
              class="flex items-center gap-1 text-xs font-semibold text-primary-600 transition-colors hover:text-secondary-800"
            >
              <span>مشاهده کاتالوگ حبوبات</span>
              <UiMaterialIcon name="chevron_left" :size="16" />
            </a>
          </div>
        </div>

        <!-- Nuts -->
        <div
          id="luxury-nuts"
          class="flex flex-col justify-between rounded-2xl border border-border bg-surface p-4 shadow-sm md:rounded-xl md:p-7"
        >
          <div>
            <div class="mb-2 flex items-center justify-between md:mb-1">
              <span class="rounded-md bg-secondary-100/60 px-2 py-0.5 text-[10px] font-semibold text-secondary-900 md:rounded md:text-xs">
                رکن سوم • آجیل اشرافی
              </span>
              <span class="text-[10px] font-medium text-secondary-700 md:text-xs md:font-semibold">برشته‌کاری سنتی با نمک دریا</span>
            </div>
            <h3 class="text-sm font-bold text-primary-900 md:text-xl md:font-semibold md:text-primary-600">
              پسته اکبری، مغز گردو و بادام ایرانی
            </h3>
            <p class="mt-0.5 text-[11px] text-muted md:mb-4 md:mt-0 md:text-sm">
              دست‌چین باغات باستانی رفسنجان و تویسرکان با بسته‌بندی طلاکوب و وکیوم گاز نیتروژن جهت تضمین تازگی ترد.
            </p>
            <div class="mt-3 flex items-center justify-between rounded-lg bg-primary-50/70 p-3 md:mt-0 md:p-4">
              <div class="flex items-center gap-2">
                <div class="flex size-8 items-center justify-center rounded-full bg-secondary-200/50 text-secondary-800 md:size-10">
                  <UiMaterialIcon name="energy_savings_leaf" :size="20" class="md:text-[22px]" />
                </div>
                <div>
                  <span class="block text-xs font-semibold text-text md:text-sm">جعبه نفیس چهارمغز سلطنتی</span>
                  <span class="text-[11px] text-muted md:text-sm">شامل زعفران قائنات سرگل نگین</span>
                </div>
              </div>
              <span class="text-sm font-bold text-secondary-500 md:text-xl md:font-semibold md:text-secondary-800">
                ۱,۴۵۰,۰۰۰ ت
              </span>
            </div>
          </div>
          <div class="mt-3 flex items-center justify-between md:mt-4">
            <span class="text-[11px] text-muted md:text-sm">آماده‌سازی سفارشی در جعبه‌های چوبی</span>
            <button
              type="button"
              class="flex items-center gap-1 text-xs font-semibold text-primary-600 transition-colors hover:text-secondary-800"
            >
              <span>سفارش اختصاصی هدایا</span>
              <UiMaterialIcon name="chevron_left" :size="16" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </HomeSection>
</template>
