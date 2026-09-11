<script setup lang="ts">
import {
  footerBadges,
  footerCategories,
  footerHeritage,
  footerLegalLinks,
  LOGO_DESKTOP_URL,
} from '~/data/homepage'
</script>

<template>
  <footer class="mt-6 w-full bg-primary-50 shadow-[0_-1px_6px_rgba(0,0,0,0.02)] md:mt-12">
    <div class="mx-auto max-w-[1440px] px-4 pb-6 pt-8 md:px-16 md:pb-7 md:pt-12">
      <div class="mb-8 grid grid-cols-1 gap-8 md:mb-12 md:grid-cols-2 md:gap-10 lg:grid-cols-12">
        <div class="flex flex-col items-center gap-3 text-center md:items-start md:text-right lg:col-span-4 lg:gap-4">
          <div class="flex items-center gap-2">
            <img :src="LOGO_DESKTOP_URL" alt="مستر رایس" class="size-9 object-contain md:h-7 md:w-auto" />
            <span class="text-base font-bold text-primary-900 md:text-xl md:font-semibold md:text-primary-600">
              مستر رایس
            </span>
          </div>
          <p class="max-w-xs text-[11px] leading-relaxed text-muted md:max-w-none md:text-justify md:text-base">
            مستر رایس؛ آتلیه نفیس و اصیل دانه‌های ممتاز ایران‌زمین. تعهدی بی‌قیدوشرط به خاستگاه یگانه شالیزارهای مازندران و گیلان، زعفران قائنات و خشکبار دست‌چین باغات باستانی با حفظ اصالت عطر و خلوص طعم.
          </p>
          <div class="flex flex-col items-center gap-1 pt-1 md:flex-row md:items-start md:gap-2">
            <span class="text-sm font-semibold text-secondary-500">خاستگاه:</span>
            <span class="text-[11px] text-text md:text-sm">طارم، فریدونکنار، آستانه اشرفیه، پسته رفسنجان</span>
          </div>
        </div>

        <div class="flex flex-col gap-2 lg:col-span-2">
          <h3 class="text-center text-base font-bold text-primary-900 md:text-right md:text-xl md:font-semibold md:text-primary-600">
            دسته‌بندی‌ها
          </h3>
          <ul class="flex flex-col gap-1 text-center md:text-right">
            <li
              v-for="item in footerCategories"
              :key="item"
              class="cursor-pointer text-sm text-muted transition-colors hover:text-primary-600 md:text-base"
            >
              {{ item }}
            </li>
          </ul>
        </div>

        <div class="flex flex-col gap-2 lg:col-span-2">
          <h3 class="text-center text-base font-bold text-primary-900 md:text-right md:text-xl md:font-semibold md:text-primary-600">
            میراث و اصالت
          </h3>
          <ul class="flex flex-col gap-1 text-center md:text-right">
            <li
              v-for="item in footerHeritage"
              :key="item"
              class="cursor-pointer text-sm text-muted transition-colors hover:text-primary-600 md:text-base"
            >
              {{ item }}
            </li>
          </ul>
        </div>

        <div class="flex flex-col gap-3 md:gap-4 lg:col-span-4">
          <h3 class="text-center text-base font-bold text-primary-900 md:text-right md:text-xl md:font-semibold md:text-primary-600">
            خبرنامه آتلیه
          </h3>
          <p class="text-center text-[11px] text-muted md:text-right md:text-sm">
            جهت اطلاع اختصاصی از نخستین برداشت فصلی و محصولات نایاب، عضو حلقه یاران مستر رایس شوید.
          </p>
          <div class="flex items-center rounded-xl border border-border bg-surface p-1.5 shadow-sm md:rounded-lg md:border-0 md:p-1">
            <input
              type="email"
              placeholder="نشانی رایانامه شما..."
              class="w-full bg-transparent px-2.5 text-xs text-text placeholder:text-muted focus:outline-none md:px-4 md:py-1 md:text-sm"
            />
            <button
              type="button"
              class="shrink-0 rounded-lg bg-primary-900 px-3 py-2 text-xs font-semibold text-white md:rounded md:bg-primary-600 md:px-4 md:py-1 md:hover:bg-primary-500"
            >
              عضویت
            </button>
          </div>
          <div class="grid grid-cols-3 gap-1.5 pt-1 md:gap-1">
            <div
              v-for="badge in footerBadges"
              :key="badge.label"
              class="rounded-lg border border-border bg-surface p-2 text-center md:rounded md:border-0 md:bg-primary-100 md:p-1"
            >
              <UiMaterialIcon :name="badge.icon" :size="18" class="mb-0.5 block text-secondary-500 md:mb-1 md:text-[20px]" />
              <span class="block text-[10px] font-semibold text-primary-900 md:text-xs md:font-normal md:text-text">
                {{ badge.label }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col items-center justify-between gap-3 border-t border-border pt-4 md:flex-row md:gap-4 md:pt-7">
        <p class="text-center text-[10px] text-muted md:text-right md:text-sm">
          تمامی حقوق مادی و معنوی محفوظ و متعلق به آتلیه مستر رایس (Master Rice) است © ۱۴۰۳
        </p>
        <div class="flex flex-wrap items-center justify-center gap-4 text-[10px] text-muted md:gap-7 md:text-xs">
          <span
            v-for="link in footerLegalLinks"
            :key="link"
            class="cursor-pointer transition-colors hover:text-primary-600"
          >
            {{ link }}
          </span>
          <span class="font-medium text-primary-600 md:hidden">پشتیبانی: ۰۲۱-۸۸۸۸۴۴۴</span>
        </div>
      </div>
    </div>
  </footer>
</template>
