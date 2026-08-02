<template>
    <div class="relative flex items-center justify-center w-full min-h-screen overflow-hidden p-4"
        @mousemove="handleMouseMove" @mouseleave="resetTarget">
        <!-- Background layer (smooth parallax) -->
        <div ref="bgRef"
            class="absolute inset-0 bg-[url('/images/form.jpg')] bg-cover bg-center bg-no-repeat scale-110 will-change-transform">
        </div>
        <div class="absolute inset-0 bg-black/30"></div>

        <!-- Content layer -->
        <div class="relative z-10 w-full max-w-md">
            <div class="backdrop-blur-xl bg-white/90 border border-white/40 rounded-2xl shadow-2xl py-8 px-6 sm:px-10"
                @mouseenter="isPaused = true" @mouseleave="isPaused = false">
                <!-- Logo / Header -->
                <div class="text-center mb-8">
                    <div class="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary-100 mb-4">
                        <svg class="w-7 h-7 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                            stroke-width="1.5">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                    </div>
                    <h1 class="text-2xl font-bold text-gray-800">ورود به حساب کاربری</h1>
                    <p class="text-primary-600 font-semibold mt-1">مستر رایس</p>
                </div>

                <!-- Form -->
                <form @submit.prevent="login" class="space-y-5">
                    <div>
                        <label for="mobile" class="block text-gray-700 text-sm font-medium mb-1.5">
                            موبایل
                        </label>
                        <div class="relative">
                            <span class="absolute inset-y-0 right-3 flex items-center text-gray-400">
                                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                    stroke-width="1.5">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                                </svg>
                            </span>
                            <input type="text" inputmode="numeric" v-model="form.mobile" id="mobile" dir="ltr"
                                placeholder="09xxxxxxxxx"
                                class="w-full py-2.5 pr-10 pl-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-800 text-right placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition">
                        </div>
                    </div>

                    <div>
                        <label for="password" class="block text-gray-700 text-sm font-medium mb-1.5">
                            کلمه عبور
                        </label>
                        <div class="relative">
                            <span class="absolute inset-y-0 right-3 flex items-center text-gray-400">
                                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                    stroke-width="1.5">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                                </svg>
                            </span>
                            <input :type="showPassword ? 'text' : 'password'" v-model="form.password" id="password"
                                dir="auto" placeholder="••••••••"
                                class="w-full py-2.5 pr-10 pl-10 rounded-lg border border-gray-300 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition">
                            <button type="button" @click="showPassword = !showPassword"
                                class="absolute inset-y-0 left-3 flex items-center text-gray-400 hover:text-gray-600">
                                <svg v-if="!showPassword" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor" stroke-width="1.5">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <svg v-else class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                    stroke-width="1.5">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div class="flex items-center justify-between text-sm">
                        <label class="flex items-center gap-2 text-gray-600 cursor-pointer">
                            <input type="checkbox" v-model="form.remember"
                                class="rounded border-gray-300 text-primary-600 focus:ring-primary-500">
                            مرا به خاطر بسپار
                        </label>
                        <a href="#" class="text-primary-600 hover:text-primary-700 font-medium">فراموشی رمز عبور؟</a>
                    </div>

                    <button type="submit"
                        class="w-full bg-primary-600 hover:bg-primary-700 active:scale-[0.98] text-white transition-all duration-200 font-bold py-3 rounded-lg shadow-lg shadow-primary-500/30 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
                        ورود
                    </button>
                </form>

                <p class="text-center text-sm text-gray-500 mt-6">
                    حساب کاربری ندارید؟
                    <a href="#" class="text-primary-600 hover:text-primary-700 font-semibold">ثبت‌نام کنید</a>
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useAuth } from '@/composables/useAuth';
import { useAuthStore } from '#imports';

const authStore = useAuthStore();
const auth = useAuth();
const showPassword = ref(false)
const bgRef = ref(null)
const isPaused = ref(false)

let target = { x: 0, y: 0 }
let current = { x: 0, y: 0 }
let rafId = null

const intensity = 25
const ease = 0.06

const handleMouseMove = (e) => {
    if (isPaused.value) return
    const { innerWidth, innerHeight } = window
    const x = (e.clientX / innerWidth - 0.5)
    const y = (e.clientY / innerHeight - 0.5)
    target = { x: -x * intensity, y: -y * intensity }
}

const form = reactive({
    'mobile': '',
    'password': '',
});


const resetTarget = () => {
    target = { x: 0, y: 0 }
}

const animate = () => {
    current.x += (target.x - current.x) * ease
    current.y += (target.y - current.y) * ease

    if (bgRef.value) {
        bgRef.value.style.transform = `translate3d(${current.x}px, ${current.y}px, 0) scale(1.1)`
    }

    rafId = requestAnimationFrame(animate)
}

const login = async () => {

    const response = await auth.loginWithPassword(form);


    if (response.status) {
        authStore.user = response.user;
        navigateTo('/')
    }
}

definePageMeta({
    layout: 'auth',
})
onMounted(() => {
    rafId = requestAnimationFrame(animate)
})

onBeforeUnmount(() => {
    if (rafId) cancelAnimationFrame(rafId)
})
</script>
