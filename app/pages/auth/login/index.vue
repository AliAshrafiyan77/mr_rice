<template>
    <div class="flex items-center justify-center w-full h-screen">
        <div class="flex flex-col  items-center justify-center">

            <div class="border border-primary-700 rounded-lg shadow-primary-300 shadow-lg py-4 px-8 w-full">
                <p class="text-center text-primary-700 text-xl">ورود به حساب کاربری<strong>مستر رایس</strong></p>
                <div>
                    
                    <div class="mb-4">
                        <label for="mobile" class="block text-primary-700 text-sm font-bold mb-2">
                            موبایل
                        </label>
                        <input type="text" inputmode="numeric" v-model="form.mobile" id="mobile" dir="auto"
                            class="shadow shadow-primary-300 appearance-none border border-primary-700 rounded w-full py-2 px-3 text-text leading-tight focus:outline-none focus:shadow-outline">
                    </div>
                    <div class="mb-4">
                        <label for="password" class="block text-primary-700 text-sm font-bold mb-2">
                            کلمه عبور
                        </label>
                        <input type="password" v-model="form.password" id="password" dir="auto"
                            class="shadow appearance-none border border-primary-700 rounded w-full py-2 px-3 text-text leading-tight focus:outline-none focus:shadow-outline">
                    </div>
                    
                    <div class="flex items-center justify-center">
                        <button type="button" @click="login"
                            class="bg-primary-500 hover:bg-primary-700 text-white transition-colors duration-300 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            ورود
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useAuth } from '@/composables/useAuth';

const auth = useAuth();

const form = reactive({
    'mobile': '',
    'password': '',
});

const login = async () => {

    const response = await auth.loginWithPassword(form);


    if (response.status) {

        navigateTo('/')
    }
}

definePageMeta({
    layout: 'auth',
})
</script>
