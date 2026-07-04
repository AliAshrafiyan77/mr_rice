<template>

    <div class="flex items-center justify-center w-full h-screen">
        <div class="flex flex-col  items-center justify-center">

            <div class="border border-primary-700 rounded-lg shadow-primary-300 shadow-lg py-4 px-8 w-full">
                <p class="text-center text-primary-700 text-xl">تایید کد</p>
                <form>
                    <div class="mb-4">
                        <label for="name" class="block text-primary-700 text-sm font-bold mb-2">نام</label>
                        <input type="text" v-model="otp.code" id="name" dir="auto"
                            class="shadow shadow-primary-300 appearance-none border border-primary-700 rounded w-full py-2 px-3 text-text leading-tight focus:outline-none focus:shadow-outline">
                    </div>

                    <div class="flex items-center justify-center">
                        <button type="button" @click="submitOtp"
                            class="bg-primary-500 hover:bg-primary-700 text-white transition-colors duration-300 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            تایید کد
                        </button>
                    </div>
                </form>

            </div>
        </div>
    </div>

</template>
<script setup>
import { reactive } from 'vue'
import { useRoute } from 'vue-router'
import { useAuth } from '@/composables/useAuth';

const auth = useAuth();
const route = useRoute();

const otp = reactive({
    'code': '',
    'key': route.query.key
});


const submitOtp = async () => {
    const response = await auth.verifyOtp(otp);
    if (response.status) {
        navigateTo('/');
    }

}

</script>