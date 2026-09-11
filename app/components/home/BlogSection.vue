<script setup lang="ts">
import { blogArticles } from '~/data/homepage'
</script>

<template>
  <HomeSection id="atelier-journal">
    <div class="mb-6 flex items-end justify-between gap-4 md:mb-12">
      <div>
        <div class="mb-0.5 flex items-center gap-1 text-secondary-500 md:mb-1 md:text-secondary-800">
          <UiMaterialIcon name="auto_stories" :size="14" class="md:text-[18px]" />
          <span class="text-[10px] font-bold uppercase tracking-wider md:text-xs md:font-medium">
            دانشنامه و مقالات مستر رایس
          </span>
        </div>
        <h2 class="text-lg font-bold text-primary-900 md:text-3xl md:font-medium md:text-primary-600 lg:text-4xl">
          یادداشت‌های شالیزار و آتلیه طعم
        </h2>
      </div>
      <a
        href="#"
        class="group flex shrink-0 items-center gap-0.5 text-xs font-medium text-primary-600 transition-colors hover:text-secondary-800 md:gap-1 md:text-sm md:font-semibold"
      >
        <span>مشاهده همه مقالات</span>
        <UiMaterialIcon
          name="arrow_back"
          :size="14"
          class="transition-transform duration-300 group-hover:-translate-x-1 md:text-[18px]"
        />
      </a>
    </div>

    <div class="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-10 lg:grid-cols-3">
      <article
        v-for="article in blogArticles"
        :key="article.title"
        class="group flex flex-col justify-between overflow-hidden rounded-xl border border-border bg-surface shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md md:border-0 md:p-7"
      >
        <div>
          <div class="h-36 overflow-hidden bg-primary-50 md:mb-4 md:h-48 md:rounded-lg">
            <img
              :src="article.image"
              :alt="article.title"
              class="size-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div class="p-3 md:p-0">
            <div class="mb-1 flex items-center justify-between md:mb-4">
              <span class="rounded px-1.5 py-0.5 text-[10px] font-semibold md:px-2 md:text-xs" :class="[article.categoryBg, article.categoryClass]">
                {{ article.category }}
              </span>
              <div class="flex items-center gap-1 text-[10px] text-muted md:text-xs">
                <UiMaterialIcon name="schedule" :size="14" class="md:text-[16px]" />
                <span>{{ article.readTime }}</span>
              </div>
            </div>
            <h3 class="mb-1 text-xs font-bold leading-snug text-primary-900 transition-colors group-hover:text-primary-500 md:text-xl md:font-semibold md:leading-relaxed md:text-primary-600">
              {{ article.title }}
            </h3>
            <p class="line-clamp-2 text-[11px] text-muted md:mb-7 md:line-clamp-3 md:text-sm md:leading-relaxed">
              {{ article.excerpt }}
            </p>
          </div>
        </div>
        <div class="flex items-center justify-between border-t border-primary-50 px-3 py-2 md:border-primary-200 md:px-0 md:py-1 md:pt-1">
          <span class="text-[10px] text-muted md:text-xs">{{ article.date }}</span>
          <a
            href="#"
            class="inline-flex items-center gap-1 text-[10px] font-semibold text-primary-600 transition-colors group-hover:text-secondary-800 md:text-xs"
          >
            <span>ادامه مطلب</span>
            <UiMaterialIcon
              name="arrow_back"
              :size="14"
              class="transition-transform duration-300 group-hover:-translate-x-1 md:text-[16px]"
            />
          </a>
        </div>
      </article>
    </div>
  </HomeSection>
</template>
