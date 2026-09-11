<script setup lang="ts">
import { LOGO_DESKTOP_URL, navLinks } from '~/data/homepage'

const cartCount = 2
</script>

<template>
  <header
    class="sticky top-0 z-50 w-full border-b border-primary-100 bg-background/90 shadow-sm backdrop-blur-md lg:fixed lg:h-20"
  >
    <div class="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 md:px-16 lg:h-20">
      <div class="flex items-center gap-2 md:gap-4">
        <button
          type="button"
          aria-label="منوی اصلی"
          class="-mr-2 flex size-10 items-center justify-center rounded-full text-primary-900 transition-colors active:bg-primary-50 xl:hidden"
        >
          <UiMaterialIcon name="menu" :size="24" />
        </button>

        <img :src="LOGO_DESKTOP_URL" alt="مستر رایس" class="size-8 object-contain md:h-8 md:w-auto" />
        <div class="flex flex-col">
          <span class="text-[17px] font-bold leading-none tracking-tight text-primary-900 md:text-xl md:font-semibold md:text-primary-600">
            مستر رایس
          </span>
          <span class="mt-0.5 text-[9px] font-medium uppercase tracking-widest text-secondary-500 md:text-xs md:text-secondary-800">
            Master Rice Atelier
          </span>
        </div>
      </div>

      <nav class="hidden items-center gap-7 xl:flex">
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          class="rounded-lg px-2 py-1 text-base transition-colors"
          :class="link.active
            ? 'bg-primary-100 font-medium text-primary-600'
            : 'text-muted hover:text-primary-600'"
        >
          {{ link.label }}
        </a>
      </nav>

      <div class="flex items-center gap-1 md:gap-4">
        <button
          type="button"
          aria-label="جستجو"
          class="flex size-9 items-center justify-center rounded-full text-muted transition-colors active:bg-primary-50 hover:bg-primary-100 hover:text-text md:size-10"
        >
          <UiMaterialIcon name="search" :size="20" />
        </button>
        <button
          type="button"
          aria-label="سبد خرید"
          class="relative flex size-9 items-center justify-center rounded-full text-muted transition-colors active:bg-primary-50 hover:bg-primary-100 hover:text-text md:size-10"
        >
          <UiMaterialIcon name="shopping_bag" :size="20" />
          <span
            class="absolute top-1 right-0.5 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-secondary-500 px-1 text-[10px] font-bold leading-none text-white md:top-1.5 md:left-1.5 md:right-auto md:bg-secondary-800 md:font-medium"
          >
            {{ cartCount }}
          </span>
        </button>
        <NuxtLink
          to="/auth/login"
          aria-label="حساب کاربری"
          class="flex size-8 items-center justify-center rounded-full bg-primary-600 text-white transition-colors hover:bg-primary-500"
        >
          <UiMaterialIcon name="person" :size="18" />
        </NuxtLink>
      </div>
    </div>
  </header>
</template>
