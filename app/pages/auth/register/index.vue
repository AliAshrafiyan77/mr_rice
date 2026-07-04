<template>
    <div class="flex items-center justify-center w-full h-screen">
        <div class="flex flex-col  items-center justify-center">

            <div class="border border-primary-700 rounded-lg shadow-primary-300 shadow-lg py-4 px-8 w-full">
                <p class="text-center text-primary-700 text-xl">فرم عضویت در <strong>مستر رایس</strong></p>
                <form>
                    <div class="mb-4">
                        <label for="name" class="block text-primary-700 text-sm font-bold mb-2">نام</label>
                        <input type="text" v-model="form.name" id="name" dir="auto"
                            class="shadow shadow-primary-300 appearance-none border border-primary-700 rounded w-full py-2 px-3 text-text leading-tight focus:outline-none focus:shadow-outline">
                    </div>
                    <div class="mb-4">
                        <label for="last-name" class="block text-primary-700 text-sm font-bold mb-2">نام
                            خانوادگی</label>
                        <input type="text" v-model="form.last_name" id="last-name" dir="auto"
                            class="shadow shadow-primary-300 appearance-none border border-primary-700 rounded w-full py-2 px-3 text-text leading-tight focus:outline-none focus:shadow-outline">
                    </div>
                    <div class="mb-4">
                        <label for="mobile" class="block text-primary-700 text-sm font-bold mb-2">موبایل</label>
                        <input type="text" inputmode="numeric" v-model="form.mobile" id="mobile" dir="auto"
                            class="shadow shadow-primary-300 appearance-none border border-primary-700 rounded w-full py-2 px-3 text-text leading-tight focus:outline-none focus:shadow-outline">
                    </div>
                    <div class="mb-4">
                        <label for="password" class="block text-primary-700 text-sm font-bold mb-2">کلمه عبور</label>
                        <input type="password" v-model="form.password" id="password" dir="auto"
                            class="shadow appearance-none border border-primary-700 rounded w-full py-2 px-3 text-text leading-tight focus:outline-none focus:shadow-outline">
                    </div>
                    <div class="mb-4">
                        <label for="password-confirmation" class="block text-primary-700 text-sm font-bold mb-2">تکرار
                            کلمه عبور</label>
                        <input type="password" v-model="form.password_confirmation" dir="auto"
                            id="password-confirmation"
                            class="shadow shadow-primary-300 appearance-none border border-primary-700 rounded w-full py-2 px-3 text-text leading-tight focus:outline-none focus:shadow-outline">
                    </div>
                    <div class="flex items-center justify-center">
                        <button type="button" @click="register"
                            class="bg-primary-500 hover:bg-primary-700 text-white transition-colors duration-300 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            عضویت
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useAuth } from '@/composables/useAuth';

const auth = useAuth();

const form = reactive({
    'name': '',
    'last_name': '',
    'mobile': '',
    'password': '',
    'password_confirmation': '',
});
const register = async () => {

    const response = await auth.register(form);
    const key = response.key;
    if (response.status) {
        navigateTo(`/auth/verify-otp?key=${key}`)
    }

}

definePageMeta({
    layout: 'auth',
})
</script>