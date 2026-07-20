<template>
    <!-- Hamburger button -->
    <button v-if="showButton" class="lg:hidden fixed top-4 right-4 z-50 p-2 -mt-1" @click="openMenu">
        <MenuIcon class="w-6 h-6 text-text" />
    </button>

    <!-- Backdrop overlay -->
    <div v-if="isOpen" class="lg:hidden fixed inset-0 bg-black/50 z-30" @click="closeMenu"></div>

    <!-- Sidebar -->
    <aside
        class="fixed top-0 right-0 bg-primary-700 w-4/5 sm:w-1/2 md:w-1/3 lg:w-1/5 h-screen overflow-y-auto shadow-lg z-40 transition-transform duration-[400ms] ease-in-out"
        :class="isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'">
        <div class="px-4 py-5 border-b border-white/10 flex items-center justify-between">
            <h1 class="text-white font-bold text-lg">پنل مدیریت</h1>
            <button @click="closeMenu" class="lg:hidden p-2 rounded-lg">
                <CloseIcon class="w-6 h-6 text-white" />
            </button>
        </div>

        <ul class="p-3 space-y-1">
            <li>
                <NuxtLink to="/admin" active-class="bg-primary-600 text-white"
                    class="block px-4 py-2.5 rounded-lg text-primary-100 text-sm font-medium hover:bg-primary-600 hover:text-white transition-colors">
                    داشبورد
                </NuxtLink>
            </li>

            <Submenu title="کاربران" base-path="/admin/users">
                <li>
                    <NuxtLink to="/admin/users" active-class="bg-primary-600 text-white"
                        exact-active-class="bg-primary-600 text-white"
                        class="block px-4 py-2 rounded-lg text-primary-200 text-sm hover:bg-primary-600 hover:text-white transition-colors">
                        لیست کاربران
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/admin/users/create" active-class="bg-primary-600 text-white"
                        class="block px-4 py-2 rounded-lg text-primary-200 text-sm hover:bg-primary-600 hover:text-white transition-colors">
                        افزودن کاربر جدید
                    </NuxtLink>
                </li>
            </Submenu>

            <Submenu title="سطوح دسترسی" base-path="/admin/roles">
                <li>
                    <NuxtLink to="/admin/roles" active-class="bg-primary-600 text-white"
                        exact-active-class="bg-primary-600 text-white"
                        class="block px-4 py-2 rounded-lg text-primary-200 text-sm hover:bg-primary-600 hover:text-white transition-colors">
                        لیست نقش ها 
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/admin/roles/create" active-class="bg-primary-600 text-white"
                        class="block px-4 py-2 rounded-lg text-primary-200 text-sm hover:bg-primary-600 hover:text-white transition-colors">
                        افزودن نقش جدید
                    </NuxtLink>
                </li>
            </Submenu>
        </ul>
    </aside>
</template>

<script setup>
import { ref } from 'vue'
import Submenu from './Submenu.vue'
import MenuIcon from '~/components/icons/MenuIcon.vue'
import CloseIcon from '~/components/icons/CloseIcon.vue'

const isOpen = ref(false)
const showButton = ref(true)

const openMenu = () => {
    isOpen.value = true
    showButton.value = false
}

const closeMenu = () => {
    isOpen.value = false
    setTimeout(() => {
        showButton.value = true
    }, 400)
}
</script>