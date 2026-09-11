<script setup lang="ts">
import { cookingMetrics, cookingSteps } from '~/data/homepage'
</script>

<template>
  <section id="cooking-guide" class="lg:py-12">
    <!-- Mobile -->
    <div class="rounded-2xl border border-border bg-surface p-4 shadow-sm lg:hidden">
      <div class="mb-1 flex items-center gap-1 text-secondary-500">
        <UiMaterialIcon name="restaurant_menu" :size="16" />
        <span class="text-[10px] font-semibold uppercase tracking-wider">دانشنامه آشپزی</span>
      </div>
      <h2 class="mb-1.5 text-base font-bold text-primary-900">راز پخت اشرافی دانه طارم</h2>
      <p class="mb-3 text-xs leading-relaxed text-muted">
        ۳ مرحله کلیدی سرآشپزان گیلانی برای آزاد شدن نهایت عطر و ری‌کردن کامل دانه برنج کهنه:
      </p>
      <div class="space-y-2">
        <div
          v-for="step in cookingSteps"
          :key="step.number"
          class="flex items-start gap-2.5 rounded-xl border border-border bg-primary-50/70 p-2.5"
        >
          <span
            class="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold"
            :class="step.numberClass"
          >
            {{ step.number }}
          </span>
          <div>
            <h4 class="text-xs font-bold text-primary-900">{{ step.title }}</h4>
            <p class="text-[11px] leading-relaxed text-muted">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Desktop -->
    <div class="mx-auto hidden max-w-[1440px] px-5 md:px-16 lg:block">
      <div class="rounded-xl bg-surface p-7 shadow-md md:p-12">
        <div class="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          <div class="flex flex-col space-y-4 lg:col-span-7">
            <div class="flex items-center gap-1">
              <UiMaterialIcon name="restaurant_menu" :size="20" class="text-secondary-800" />
              <span class="text-xs font-medium uppercase tracking-widest text-secondary-800">
                دانشنامه آشپزی مستر رایس
              </span>
            </div>
            <h2 class="text-3xl font-medium text-primary-600 md:text-4xl">
              راز پخت اشرافی: هنر قدکشیدن دانه طارم کهنه
            </h2>
            <p class="text-justify text-base text-muted">
              پخت برنج اصیل ایرانی نه یک دستورالعمل صرف، بلکه آیینی نیازمند دقت و شناخت طبع دانه است. برنج کهنه مستر رایس به دلیل از دست دادن رطوبت اولیه در سیلوهای چوبی، نیازمند آبکشی با آب یخ در لحظه جوش برای ایجاد شوک حرارتی و حداکثر قدکشی است.
            </p>

            <div class="grid grid-cols-1 gap-2 pt-1 sm:grid-cols-3">
              <div
                v-for="(step, index) in cookingSteps"
                :key="step.number"
                class="rounded-lg bg-primary-50 p-2"
              >
                <span class="mb-1 block text-xl font-semibold text-secondary-800">
                  ۰{{ index + 1 }}. {{ step.shortTitle }}
                </span>
                <p class="text-sm text-muted">{{ step.descriptionDesktop }}</p>
              </div>
            </div>

            <div class="flex items-center gap-4 pt-1">
              <div class="flex -space-x-2 space-x-reverse">
                <span class="flex size-8 items-center justify-center rounded-full bg-primary-600 text-[12px] font-bold text-white">م‌ر</span>
                <span class="flex size-8 items-center justify-center rounded-full bg-secondary-800 text-[12px] font-bold text-white">ش</span>
                <span class="flex size-8 items-center justify-center rounded-full bg-primary-200 text-[12px] font-bold text-text">۱۰+</span>
              </div>
              <span class="text-sm text-muted">تأییدشده توسط استادان برتر آشپزی سنتی ایران</span>
            </div>
          </div>

          <div class="flex flex-col space-y-4 rounded-xl bg-primary-50 p-7 lg:col-span-5">
            <div class="flex items-center justify-between">
              <span class="text-sm font-bold text-primary-600">نسبت‌سنجی ایده‌آل پخت کته</span>
              <span class="rounded bg-secondary-200 px-2 py-0.5 text-xs text-secondary-900">عطر دست‌نخورده</span>
            </div>
            <div class="space-y-2">
              <div v-for="metric in cookingMetrics" :key="metric.label">
                <div class="mb-1 flex justify-between text-xs">
                  <span>{{ metric.label }}</span>
                  <span class="font-bold text-secondary-800">{{ metric.value }}</span>
                </div>
                <div class="h-2 w-full overflow-hidden rounded-full bg-primary-100">
                  <div class="h-full rounded-full" :class="metric.barClass" :style="{ width: metric.width }" />
                </div>
              </div>
            </div>
            <div class="flex items-center justify-between rounded-lg bg-surface p-4">
              <div class="flex items-center gap-1">
                <UiMaterialIcon name="contact_support" :size="22" class="text-secondary-800" />
                <span class="text-sm text-text">نیاز به مشاوره پخت اختصاصی دارید؟</span>
              </div>
              <button type="button" class="text-xs font-bold text-primary-600 hover:underline">
                گفتگو با کارشناس
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
