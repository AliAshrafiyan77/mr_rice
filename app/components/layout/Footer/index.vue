<script setup lang="ts">
import {
  footerBadges,
  footerCategories,
  footerHeritage,
  LOGO_DESKTOP_URL,
  LOGO_URL,
} from '~/data/homepage'
</script>

<template>
  <!-- Mobile compact footer -->
  <footer class="space-y-4 rounded-2xl border border-border bg-primary-50 p-4 text-center lg:hidden">
    <div class="flex flex-col items-center">
      <img :src="LOGO_URL" alt="مستر رایس" class="mb-1.5 size-9 object-contain" />
      <span class="text-base font-bold text-primary-900">آتلیه مستر رایس</span>
      <p class="mt-1 max-w-xs text-[11px] leading-relaxed text-muted">
        میراث‌دار دانه‌های ممتاز، برنج خالص طارم و دم‌سیاه از بهترین شالیزارهای فریدونکنار و آستانه اشرفیه.
      </p>
    </div>

    <div class="flex items-center rounded-xl border border-border bg-surface p-1.5 shadow-sm">
      <input
        type="text"
        placeholder="شماره موبایل یا ایمیل..."
        class="w-full bg-transparent px-2.5 text-xs text-text placeholder:text-muted focus:outline-none"
      />
      <button type="button" class="shrink-0 rounded-lg bg-primary-900 px-3 py-2 text-xs font-semibold text-white">
        عضویت
      </button>
    </div>

    <div class="grid grid-cols-3 gap-1.5 py-1">
      <div
        v-for="badge in footerBadges"
        :key="badge.label"
        class="rounded-lg border border-border bg-surface p-2 text-center"
      >
        <UiMaterialIcon :name="badge.icon" :size="18" class="mb-0.5 block text-secondary-500" />
        <span class="block text-[10px] font-semibold text-primary-900">{{ badge.label }}</span>
      </div>
    </div>

    <div class="flex items-center justify-between border-t border-border pt-2 text-[10px] text-muted">
      <span>حقوق مادی و معنوی محفوظ است © ۱۴۰۳</span>
      <span class="font-medium text-primary-600">پشتیبانی: ۰۲۱-۸۸۸۸۴۴۴</span>
    </div>
  </footer>

  <!-- Desktop footer -->
  <footer class="mt-12 hidden w-full bg-primary-50 shadow-[0_-1px_6px_rgba(0,0,0,0.02)] lg:block">
    <div class="mx-auto max-w-[1440px] px-5 pb-7 pt-12 md:px-16">
      <div class="mb-12 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12">
        <div class="flex flex-col items-start gap-4 lg:col-span-4">
          <div class="flex items-center gap-2">
            <img :src="LOGO_DESKTOP_URL" alt="مستر رایس" class="h-7 w-auto object-contain" />
            <span class="text-xl font-semibold text-primary-600">مستر رایس</span>
          </div>
          <p class="text-justify text-base leading-relaxed text-muted">
            مستر رایس؛ آتلیه نفیس و اصیل دانه‌های ممتاز ایران‌زمین. تعهدی بی‌قیدوشرط به خاستگاه یگانه شالیزارهای مازندران و گیلان، زعفران قائنات و خشکبار دست‌چین باغات باستانی با حفظ اصالت عطر و خلوص طعم.
          </p>
          <div class="flex items-center gap-2 pt-1">
            <span class="text-sm font-semibold text-secondary-500">خاستگاه:</span>
            <span class="text-sm text-text">طارم، فریدونکنار، آستانه اشرفیه، پسته رفسنجان</span>
          </div>
        </div>

        <div class="flex flex-col gap-2 lg:col-span-2">
          <h3 class="mb-1 text-xl font-semibold text-primary-600">دسته‌بندی‌ها</h3>
          <ul class="flex flex-col gap-1">
            <li
              v-for="item in footerCategories"
              :key="item"
              class="cursor-pointer text-base text-muted transition-colors hover:text-primary-600"
            >
              {{ item }}
            </li>
          </ul>
        </div>

        <div class="flex flex-col gap-2 lg:col-span-2">
          <h3 class="mb-1 text-xl font-semibold text-primary-600">میراث و اصالت</h3>
          <ul class="flex flex-col gap-1">
            <li
              v-for="item in footerHeritage"
              :key="item"
              class="cursor-pointer text-base text-muted transition-colors hover:text-primary-600"
            >
              {{ item }}
            </li>
          </ul>
        </div>

        <div class="flex flex-col gap-4 lg:col-span-4">
          <h3 class="text-xl font-semibold text-primary-600">خبرنامه آتلیه</h3>
          <p class="text-sm text-muted">
            جهت اطلاع اختصاصی از نخستین برداشت فصلی و محصولات نایاب، عضو حلقه یاران مستر رایس شوید.
          </p>
          <div class="flex items-center rounded-lg bg-surface p-1 shadow-sm">
            <input
              type="email"
              placeholder="نشانی رایانامه شما..."
              class="flex-1 bg-transparent px-4 py-1 text-sm text-text placeholder:text-muted focus:outline-none"
            />
            <button
              type="button"
              class="rounded bg-primary-600 px-4 py-1 text-sm font-semibold text-white transition-colors hover:bg-primary-500"
            >
              عضویت
            </button>
          </div>
          <div class="grid grid-cols-3 gap-1 pt-1">
            <div
              v-for="badge in footerBadges"
              :key="badge.labelDesktop"
              class="flex flex-col items-center justify-center rounded bg-primary-100 p-1 text-center"
            >
              <UiMaterialIcon :name="badge.icon" :size="20" class="mb-1 text-secondary-500" />
              <span class="text-xs text-text">{{ badge.labelDesktop }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col items-center justify-between gap-4 border-t border-border pt-7 md:flex-row">
        <p class="text-center text-sm text-muted md:text-right">
          تمامی حقوق مادی و معنوی محفوظ و متعلق به آتلیه مستر رایس (Master Rice) است © ۱۴۰۳
        </p>
        <div class="flex items-center gap-7 text-xs text-muted">
          <span class="cursor-pointer transition-colors hover:text-primary-600">حریم خصوصی</span>
          <span class="cursor-pointer transition-colors hover:text-primary-600">قوانین اشرافی خرید</span>
          <span class="cursor-pointer transition-colors hover:text-primary-600">ضمانت مرجوعی</span>
        </div>
      </div>
    </div>
  </footer>
</template>
