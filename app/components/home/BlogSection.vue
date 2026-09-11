<script setup lang="ts">
import { blogArticles } from '~/data/homepage'
</script>

<template>
  <section class="flex flex-col space-y-3 pt-1 lg:space-y-0 lg:py-12">
    <!-- Mobile -->
    <div class="lg:hidden">
      <div class="mb-3 flex items-center justify-between">
        <div>
          <span class="block text-[10px] font-bold uppercase tracking-wider text-secondary-500">یادداشت‌های شالیزار</span>
          <h2 class="text-lg font-bold text-primary-900">آتلیه طعم و فرهنگ</h2>
        </div>
        <a href="#" class="flex items-center gap-0.5 text-xs font-medium text-primary-600">
          <span>مشاهده همه</span>
          <UiMaterialIcon name="chevron_left" :size="14" />
        </a>
      </div>

      <div class="space-y-3">
        <article
          v-for="article in blogArticles"
          :key="article.title"
          class="overflow-hidden rounded-xl border border-border bg-surface shadow-sm"
        >
          <img :src="article.image" :alt="article.title" class="h-36 w-full object-cover" />
          <div class="p-3">
            <div class="mb-1 flex items-center justify-between text-[10px] text-muted">
              <span class="font-semibold" :class="article.categoryClass">{{ article.category }}</span>
              <span>{{ article.readTime }}</span>
            </div>
            <h3 class="mb-1 text-xs font-bold leading-snug text-primary-900">{{ article.title }}</h3>
            <p class="line-clamp-2 text-[11px] text-muted">{{ article.excerpt }}</p>
          </div>
        </article>
      </div>
    </div>

    <!-- Desktop -->
    <div class="mx-auto hidden max-w-[1440px] px-5 md:px-16 lg:block">
      <div class="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <div class="mb-1 flex items-center gap-1 text-secondary-800">
            <UiMaterialIcon name="auto_stories" :size="18" />
            <span class="text-xs font-medium uppercase tracking-wider">دانشنامه و مقالات مستر رایس</span>
          </div>
          <h2 class="text-3xl font-medium text-primary-600 md:text-4xl">یادداشت‌های شالیزار و آتلیه طعم</h2>
        </div>
        <a
          href="#"
          class="group inline-flex items-center gap-1 text-sm font-semibold text-primary-600 transition-colors hover:text-secondary-800"
        >
          <span>مشاهده همه مقالات</span>
          <UiMaterialIcon
            name="arrow_back"
            :size="18"
            class="transition-transform duration-300 group-hover:-translate-x-1"
          />
        </a>
      </div>

      <div class="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="article in blogArticles"
          :key="article.title"
          class="group flex flex-col justify-between rounded-xl bg-surface p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
        >
          <div>
            <div class="mb-4 h-48 overflow-hidden rounded-lg bg-primary-50">
              <img
                :src="article.imageDesktop"
                :alt="article.title"
                class="size-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div class="mb-4 flex items-center justify-between">
              <span class="rounded px-2 py-0.5 text-xs" :class="[article.categoryBg, article.categoryClass]">
                {{ article.category }}
              </span>
              <div class="flex items-center gap-1 text-xs text-muted">
                <UiMaterialIcon name="schedule" :size="16" />
                <span>{{ article.readTime }}</span>
              </div>
            </div>
            <h3 class="mb-1 text-xl font-semibold leading-relaxed text-primary-600 transition-colors group-hover:text-primary-500">
              {{ article.title }}
            </h3>
            <p class="mb-7 line-clamp-3 text-sm leading-relaxed text-muted">{{ article.excerptDesktop }}</p>
          </div>
          <div class="flex items-center justify-between border-t border-primary-200 pt-1">
            <span class="text-xs text-muted">{{ article.date }}</span>
            <a
              href="#"
              class="inline-flex items-center gap-1 text-xs font-semibold text-primary-600 transition-colors group-hover:text-secondary-800"
            >
              <span>ادامه مطلب</span>
              <UiMaterialIcon
                name="arrow_back"
                :size="16"
                class="transition-transform duration-300 group-hover:-translate-x-1"
              />
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
