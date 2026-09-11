<script setup lang="ts">
import { pulseItems, riceVariants } from '~/data/homepage'

const mobileVariants = ['1kg', '5kg', '10kg'].map(id => riceVariants.find(v => v.id === id)!)
const selectedMobile = ref(mobileVariants[1])
const selectedDesktop = ref(riceVariants[0])

function selectMobile(variant: typeof riceVariants[number]) {
  selectedMobile.value = variant
}

function selectDesktop(variant: typeof riceVariants[number]) {
  selectedDesktop.value = variant
}
</script>

<template>
  <section class="flex flex-col space-y-3 lg:space-y-0">
    <!-- Mobile -->
    <div class="lg:hidden">
      <div class="mb-3 flex items-center justify-between">
        <div>
          <span class="block text-[10px] font-bold uppercase tracking-widest text-secondary-500">کلکسیون فصلی</span>
          <h2 class="text-lg font-bold text-primary-900">دسته‌بندی‌های برگزیده</h2>
        </div>
        <span class="text-xs font-medium text-primary-600">۳ رکن اصالت</span>
      </div>

      <!-- Rice card -->
      <div class="mb-3 rounded-2xl border border-border bg-surface p-4 shadow-sm">
        <div class="mb-2 flex items-center justify-between">
          <span class="rounded-md bg-primary-200/60 px-2 py-0.5 text-[10px] font-semibold text-primary-900">
            رکن اول • شالیزار
          </span>
          <div class="flex items-center gap-0.5 text-secondary-500">
            <UiMaterialIcon name="star" :size="14" filled />
            <span class="text-[11px] font-bold">امتیاز ۵ از ۵</span>
          </div>
        </div>
        <h3 class="mb-1 text-base font-bold text-primary-900">برنج‌های کهنه و دمسیاه ممتاز</h3>
        <p class="mb-3 text-xs leading-relaxed text-muted">
          شسته‌شده و بوجاری سنتی با حفظ حداکثر عطر دانه اصیل شمال.
        </p>

        <div class="mb-3 flex flex-col items-center rounded-xl bg-primary-50/60 p-3">
          <img
            :src="selectedMobile.image"
            alt="بسته برنج"
            class="mx-auto h-44 object-contain"
          />
          <div class="mt-2 flex w-full items-center justify-between border-t border-border pt-2">
            <div>
              <span class="block text-[10px] text-muted">{{ selectedMobile.packagingLabel }}</span>
              <span class="text-sm font-bold text-primary-900">{{ selectedMobile.price }}</span>
            </div>
            <button
              type="button"
              class="flex items-center gap-1 rounded-lg bg-primary-600 px-3 py-1.5 text-xs font-medium text-white"
            >
              <UiMaterialIcon name="add" :size="14" />
              <span>خرید</span>
            </button>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <button
            v-for="variant in mobileVariants"
            :key="variant.id"
            type="button"
            class="flex-1 rounded-lg py-1.5 text-xs font-semibold transition-colors"
            :class="selectedMobile.id === variant.id
              ? 'bg-primary-900 text-white'
              : 'bg-primary-100 text-text'"
            @click="selectMobile(variant)"
          >
            {{ variant.label }}
          </button>
        </div>
      </div>

      <!-- Pulses card -->
      <div class="mb-3 rounded-2xl border border-border bg-surface p-4 shadow-sm">
        <div class="mb-2 flex items-center justify-between">
          <span class="rounded-md bg-secondary-200/60 px-2 py-0.5 text-[10px] font-semibold text-secondary-900">
            رکن دوم • حبوبات بلورین
          </span>
          <span class="text-[10px] font-medium text-secondary-500">سورت لیزری ۹۹.۹٪</span>
        </div>
        <h3 class="mb-1 text-base font-bold text-primary-900">حبوبات دست‌چین بدون ضایعات</h3>
        <p class="mb-3 text-xs leading-relaxed text-muted">
          پخت یکنواخت، دانه درشت و بدون کوچک‌ترین پوست و ریگ اضافی.
        </p>
        <div class="grid grid-cols-2 gap-2">
          <div
            v-for="item in pulseItems"
            :key="item.name"
            class="flex flex-col items-center rounded-xl bg-primary-50/70 p-2.5 text-center"
          >
            <img :src="item.image" :alt="item.name" class="mb-1.5 h-24 w-16 object-contain" />
            <span class="text-xs font-semibold text-primary-900">{{ item.name }}</span>
            <span class="mt-0.5 text-[11px] font-bold text-secondary-500">{{ item.price }}</span>
          </div>
        </div>
      </div>

      <!-- Nuts card -->
      <div
        id="luxury-nuts"
        class="flex items-center justify-between rounded-2xl border border-border bg-surface p-4 shadow-sm"
      >
        <div>
          <span class="mb-1 inline-block rounded-md bg-secondary-100/60 px-2 py-0.5 text-[10px] font-semibold text-secondary-900">
            رکن سوم • آجیل اشرافی
          </span>
          <h3 class="text-sm font-bold text-primary-900">خشکبار لوکس و هدایای سلطنتی</h3>
          <p class="mt-0.5 text-[11px] text-muted">پسته رفسنجان و گردوی تویسرکان با زعفران قائنات</p>
        </div>
        <UiMaterialIcon name="military_tech" :size="28" class="mr-2 text-secondary-500" />
      </div>
    </div>

    <!-- Desktop -->
    <div class="hidden bg-primary-50 py-12 lg:block">
      <div class="mx-auto max-w-[1440px] px-5 md:px-16">
        <div class="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div class="mb-1 flex items-center gap-1 text-secondary-800">
              <UiMaterialIcon name="all_inclusive" :size="18" />
              <span class="text-xs font-medium uppercase tracking-widest">کلکسیون فصلی مستر رایس</span>
            </div>
            <h2 class="text-3xl font-medium text-primary-600 md:text-4xl">
              دسته‌بندی‌های برگزیده و ارکان اصالت
            </h2>
          </div>
          <p class="max-w-md text-base text-muted">
            سه ستون بنیادین آتلیه: برنج‌های عتیقه شالیزار، حبوبات کریستالی سورت‌شده و مغزهای لوکس باغات باستانی ایران.
          </p>
        </div>

        <div class="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <!-- Rice bento -->
          <div
            id="signature-rice"
            class="flex flex-col justify-between rounded-xl bg-surface p-7 shadow-sm lg:col-span-7"
          >
            <div>
              <div class="mb-4 flex items-center justify-between">
                <span class="rounded bg-primary-200 px-2 py-0.5 text-xs text-primary-900">رکن اول • شالیزار ممتاز</span>
                <div class="flex items-center gap-1 text-secondary-800">
                  <UiMaterialIcon name="star" :size="18" filled />
                  <span class="text-sm font-bold">امتیاز عطر: ۵ از ۵</span>
                </div>
              </div>
              <h3 class="mb-1 text-2xl font-medium text-primary-600">برنج‌های کهنه و تازه طارم و دم‌سیاه</h3>
              <p class="mb-4 text-base text-muted">
                دانه‌بندی یکدست، شسته‌شده و هوادهی‌شده به روش سنتی جهت حداکثر قدکشی و عطر ماندگار سر سفره‌های اشرافی.
              </p>

              <div class="mb-4">
                <span class="mb-1 block text-xs text-muted">انتخاب وزن بسته‌بندی نفیس:</span>
                <div class="flex flex-wrap gap-1">
                  <button
                    v-for="variant in riceVariants"
                    :key="variant.id"
                    type="button"
                    class="rounded px-4 py-1 text-xs transition-all"
                    :class="selectedDesktop.id === variant.id
                      ? 'bg-primary-600 text-white shadow-sm'
                      : 'bg-primary-100 text-text hover:bg-primary-200'"
                    @click="selectDesktop(variant)"
                  >
                    {{ variant.labelDesktop }}
                  </button>
                </div>
              </div>

              <div class="grid grid-cols-1 items-center gap-4 rounded-xl bg-primary-50/70 p-4 sm:grid-cols-2">
                <div class="flex h-56 items-center justify-center rounded-lg bg-surface p-1">
                  <img
                    :src="selectedDesktop.imageDesktop"
                    alt="تصویر برنج مستر رایس"
                    class="h-full w-auto object-contain transition-all duration-300"
                  />
                </div>
                <div class="flex flex-col justify-between space-y-1">
                  <div>
                    <span class="block text-xs font-semibold text-secondary-800">
                      {{ selectedDesktop.packagingLabelDesktop }}
                    </span>
                    <h4 class="text-xl font-semibold text-primary-600">{{ selectedDesktop.title }}</h4>
                    <p class="mt-1 text-sm text-muted">
                      تضمین عدم شکستگی و خردی دانه زیر ۲٪، دارای گواهی آزمون رطوبت.
                    </p>
                  </div>
                  <div class="pt-1">
                    <span class="block text-xs text-muted">قیمت محصول</span>
                    <div class="flex items-center justify-between">
                      <span class="text-2xl font-bold text-secondary-800">{{ selectedDesktop.price }}</span>
                      <button
                        type="button"
                        class="flex items-center gap-1 rounded bg-primary-600 px-4 py-1 text-xs text-white transition-colors hover:bg-primary-500"
                      >
                        <UiMaterialIcon name="add_shopping_cart" :size="16" />
                        <span>سفارش</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-4 grid grid-cols-3 gap-2 rounded-lg bg-primary-50/40 p-2 pt-4">
              <div class="text-center">
                <span class="block text-xs text-muted">خلوص ژنتیکی</span>
                <span class="text-xl font-semibold text-primary-600">۹۹.۸٪</span>
              </div>
              <div class="text-center">
                <span class="block text-xs text-muted">شاخص قدکشی</span>
                <span class="text-xl font-semibold text-primary-600">۲.۱ برابر</span>
              </div>
              <div class="text-center">
                <span class="block text-xs text-muted">دوران کهنگی</span>
                <span class="text-xl font-semibold text-primary-600">۶ ماه در سیلو</span>
              </div>
            </div>
          </div>

          <!-- Side stack -->
          <div class="flex flex-col gap-10 lg:col-span-5">
            <!-- Pulses -->
            <div class="flex flex-col justify-between rounded-xl bg-surface p-7 shadow-sm">
              <div>
                <div class="mb-1 flex items-center justify-between">
                  <span class="rounded bg-secondary-200 px-2 py-0.5 text-xs text-secondary-900">رکن دوم • حبوبات بلورین</span>
                  <span class="text-xs font-semibold text-secondary-800">بوجاری لیزری</span>
                </div>
                <h3 class="mb-1 text-xl font-semibold text-primary-600">حبوبات دست‌چین و بدون ضایعات</h3>
                <p class="mb-4 text-sm text-muted">
                  عدس قرمز صادراتی و نخود آبگوشتی کرمانشاه؛ زمان پخت کوتاه، بافتی لطیف و بدون ناخالصی.
                </p>
                <div class="grid grid-cols-2 gap-2">
                  <div
                    v-for="item in pulseItems"
                    :key="item.nameDesktop"
                    class="flex flex-col items-center rounded-lg bg-primary-50/60 p-1 text-center"
                  >
                    <div class="mb-2 flex h-28 w-full items-center justify-center overflow-hidden rounded bg-surface">
                      <img
                        :src="item.imageDesktop"
                        :alt="item.nameDesktop"
                        class="h-full w-auto object-contain transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <span class="text-xs font-semibold text-primary-600">{{ item.nameDesktop }}</span>
                    <span class="mt-1 text-sm text-secondary-800">{{ item.priceDesktop }}</span>
                  </div>
                </div>
              </div>
              <div class="mt-4 flex items-center justify-between pt-1">
                <span class="text-sm text-muted">بسته‌بندی پنجره‌دار عایق رطوبت</span>
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
            <div class="flex flex-col justify-between rounded-xl bg-surface p-7 shadow-sm">
              <div>
                <div class="mb-1 flex items-center justify-between">
                  <span class="rounded bg-secondary-100 px-2 py-0.5 text-xs text-secondary-900">رکن سوم • آجیل اشرافی</span>
                  <span class="text-xs font-semibold text-secondary-700">برشته‌کاری سنتی با نمک دریا</span>
                </div>
                <h3 class="mb-1 text-xl font-semibold text-primary-600">پسته اکبری، مغز گردو و بادام ایرانی</h3>
                <p class="mb-4 text-sm text-muted">
                  دست‌چین باغات باستانی رفسنجان و تویسرکان با بسته‌بندی طلاکوب و وکیوم گاز نیتروژن جهت تضمین تازگی ترد.
                </p>
                <div class="flex items-center justify-between rounded-lg bg-primary-50/70 p-4">
                  <div class="flex items-center gap-2">
                    <div class="flex size-10 items-center justify-center rounded-full bg-secondary-200/50 text-secondary-800">
                      <UiMaterialIcon name="energy_savings_leaf" :size="22" />
                    </div>
                    <div>
                      <span class="block text-sm font-semibold text-text">جعبه نفیس چهارمغز سلطنتی</span>
                      <span class="text-sm text-muted">شامل زعفران قائنات سرگل نگین</span>
                    </div>
                  </div>
                  <span class="text-xl font-semibold text-secondary-800">۱,۴۵۰,۰۰۰ ت</span>
                </div>
              </div>
              <div class="mt-4 flex items-center justify-between">
                <span class="text-sm text-muted">آماده‌سازی سفارشی در جعبه‌های چوبی</span>
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
      </div>
    </div>
  </section>
</template>
