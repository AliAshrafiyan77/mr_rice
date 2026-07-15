<template>
    <header
        class="fixed top-0 left-0 right-0 lg:right-1/5 h-16 bg-surface shadow-sm border-b border-border z-20 flex items-center justify-between px-4 lg:px-6 transition-all duration-300"
    >
        <!-- Right side: page title -->
        <div class="flex items-center gap-3 mr-14 lg:mr-0">
            <h2 class="text-text font-semibold text-base lg:text-lg">مستر رایس</h2>
        </div>

        <!-- Left side: actions -->
        <div class="flex items-center gap-2 lg:gap-4">
            <!-- Search -->
            <div class="hidden sm:flex items-center bg-background border border-border rounded-lg px-3 py-2 w-40 md:w-56 focus-within:border-primary-400 transition-colors">
                <svg class="w-4 h-4 text-muted shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                    type="text"
                    placeholder="جستجو..."
                    class="bg-transparent border-none outline-none text-sm text-text placeholder-muted pr-2 w-full"
                />
            </div>

            <!-- Notifications -->
            <button class="relative p-2 rounded-lg hover:bg-background transition-colors">
                <svg class="w-5 h-5 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span class="absolute top-1.5 left-1.5 w-2 h-2 bg-danger rounded-full ring-2 ring-surface"></span>
            </button>

            <!-- Divider -->
            <div class="hidden sm:block w-px h-6 bg-border"></div>

            <!-- Profile dropdown -->
            <div class="relative">
                <button
                    @click="isProfileOpen = !isProfileOpen"
                    class="flex items-center gap-2 p-1.5 rounded-lg hover:bg-background transition-colors"
                >
                    <div class="w-8 h-8 rounded-full bg-primary-400 flex items-center justify-center text-white text-sm font-semibold shrink-0">
                        ع
                    </div>
                    <span class="hidden md:block text-sm text-text font-medium">{{ authStore.user?.name + ' ' + authStore.user?.last_name}}</span>
                    <svg
                        class="hidden md:block w-4 h-4 text-muted transition-transform duration-200"
                        :class="isProfileOpen ? 'rotate-180' : ''"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                <!-- Dropdown menu -->
                <div
                    v-if="isProfileOpen"
                    class="absolute left-0 mt-2 w-48 bg-surface rounded-lg shadow-lg border border-border py-1 z-30"
                >
                    <a href="#" class="block px-4 py-2 text-sm text-text hover:bg-background transition-colors">پروفایل</a>
                    <a href="#" class="block px-4 py-2 text-sm text-text hover:bg-background transition-colors">تنظیمات</a>
                    <hr class="my-1 border-border" />
                    <a href="#" class="block px-4 py-2 text-sm text-danger hover:bg-danger/10 transition-colors">خروج</a>
                </div>
            </div>
        </div>
    </header>

    <!-- Click-away backdrop for dropdown -->
    <div v-if="isProfileOpen" class="fixed inset-0 z-10" @click="isProfileOpen = false"></div>
</template>

<script setup>
import { useAuthStore } from '#imports';

import { ref } from 'vue'
const authStore = useAuthStore()

const isProfileOpen = ref(false)
</script>