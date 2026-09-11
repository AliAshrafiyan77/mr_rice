<script setup lang="ts">
import { cookingMetrics, cookingSteps } from '~/data/homepage'
</script>

<template>
  <HomeSection id="cooking-guide">
    <div class="rounded-2xl border border-border bg-surface p-4 shadow-sm md:rounded-xl md:p-7 md:shadow-md lg:p-12">
      <div class="grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-10">
        <div class="flex flex-col space-y-3 lg:col-span-7 lg:space-y-4">
          <div class="flex items-center gap-1 text-secondary-500 md:text-secondary-800">
            <UiMaterialIcon name="restaurant_menu" :size="16" class="md:text-[20px]" />
            <span class="text-[10px] font-semibold uppercase tracking-wider md:text-xs md:font-medium">
              دانشنامه آشپزی مستر رایس
            </span>
          </div>

          <h2 class="text-base font-bold text-primary-900 md:text-3xl md:font-medium md:text-primary-600 lg:text-4xl">
            راز پخت اشرافی: هنر قدکشیدن دانه طارم کهنه
          </h2>

          <p class="text-xs leading-relaxed text-muted md:text-justify md:text-base">
            پخت برنج اصیل ایرانی نه یک دستورالعمل صرف، بلکه آیینی نیازمند دقت و شناخت طبع دانه است. برنج کهنه مستر رایس به دلیل از دست دادن رطوبت اولیه در سیلوهای چوبی، نیازمند آبکشی با آب یخ در لحظه جوش برای ایجاد شوک حرارتی و حداکثر قدکشی است.
          </p>

          <div class="grid grid-cols-1 gap-2 sm:grid-cols-3">
            <div
              v-for="(step, index) in cookingSteps"
              :key="step.number"
              class="rounded-xl border border-border bg-primary-50/70 p-2.5 sm:rounded-lg sm:border-0 sm:bg-primary-50 sm:p-2"
            >
              <div class="mb-1 flex items-center gap-2">
                <span
                  class="flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold sm:hidden"
                  :class="step.numberClass"
                >
                  {{ step.number }}
                </span>
                <span class="hidden text-xl font-semibold text-secondary-800 sm:block">
                  ۰{{ index + 1 }}. {{ step.shortTitle }}
                </span>
              </div>
              <h4 class="mb-0.5 text-xs font-bold text-primary-900 sm:hidden">{{ step.title }}</h4>
              <p class="text-[11px] leading-relaxed text-muted sm:text-sm">{{ step.description }}</p>
            </div>
          </div>

          <div class="flex items-center gap-3 pt-1 md:gap-4">
            <div class="flex -space-x-2 space-x-reverse">
              <span class="flex size-7 items-center justify-center rounded-full bg-primary-600 text-[11px] font-bold text-white md:size-8 md:text-[12px]">م‌ر</span>
              <span class="flex size-7 items-center justify-center rounded-full bg-secondary-800 text-[11px] font-bold text-white md:size-8 md:text-[12px]">ش</span>
              <span class="flex size-7 items-center justify-center rounded-full bg-primary-200 text-[11px] font-bold text-text md:size-8 md:text-[12px]">۱۰+</span>
            </div>
            <span class="text-[11px] text-muted md:text-sm">تأییدشده توسط استادان برتر آشپزی سنتی ایران</span>
          </div>
        </div>

        <div class="flex flex-col space-y-3 rounded-xl bg-primary-50 p-4 md:space-y-4 md:p-7 lg:col-span-5">
          <div class="flex items-center justify-between gap-2">
            <span class="text-xs font-bold text-primary-600 md:text-sm">نسبت‌سنجی ایده‌آل پخت کته</span>
            <span class="shrink-0 rounded bg-secondary-200 px-2 py-0.5 text-[10px] text-secondary-900 md:text-xs">
              عطر دست‌نخورده
            </span>
          </div>

          <div class="space-y-2">
            <div v-for="metric in cookingMetrics" :key="metric.label">
              <div class="mb-1 flex justify-between text-[10px] md:text-xs">
                <span>{{ metric.label }}</span>
                <span class="font-bold text-secondary-800">{{ metric.value }}</span>
              </div>
              <div class="h-2 w-full overflow-hidden rounded-full bg-primary-100">
                <div class="h-full rounded-full" :class="metric.barClass" :style="{ width: metric.width }" />
              </div>
            </div>
          </div>

          <div class="flex flex-col gap-2 rounded-lg bg-surface p-3 sm:flex-row sm:items-center sm:justify-between md:p-4">
            <div class="flex items-center gap-1">
              <UiMaterialIcon name="contact_support" :size="20" class="text-secondary-800 md:text-[22px]" />
              <span class="text-xs text-text md:text-sm">نیاز به مشاوره پخت اختصاصی دارید؟</span>
            </div>
            <button type="button" class="text-xs font-bold text-primary-600 hover:underline">
              گفتگو با کارشناس
            </button>
          </div>
        </div>
      </div>
    </div>
  </HomeSection>
</template>
