<template>
    <div>
        <div class="flex items-center gap-3 mb-6">
            <NuxtLink to="/admin/users" class="p-2 rounded-lg text-muted hover:bg-surface transition-colors">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
            </NuxtLink>
            <h1 class="text-xl font-bold text-text">افزودن تنوع های محصول</h1>
        </div>

        <form @submit.prevent="submit" class="bg-surface rounded-xl border border-border p-4 md:p-6">
           <div class="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-5">
            <div class="grid grid-cols-1 gap-x-4 gap-y-5">
                <FormField label="انتخاب محصول مادر" :error="errors.product_id">
                    <select v-model="form.product_id" class="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-text
                        focus:outline-none focus:border-primary-400 transition-colors"
                        :class="errors.product_id ? ' border-danger focus:border-danger' : ''">
                        <option value="0" disabled>
                            انتخاب محصول مادر ...
                        </option>
                        <option v-for="product in productStore.simpleProducts" :key="product.id" :value="product.id">
                            {{ product.title }}
                        </option>
                    </select>

                </FormField>
             
                <FormField label="درصد تخفیف" :error="errors.discount_percent">
                    <input v-model="form.discount_percent" type="text" dir="ltr" class="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-text
      focus:outline-none focus:border-primary-400 transition-colors"
                        :class="errors.discount_percent ? 'border-danger focus:border-danger' : ''" />
                </FormField>
                <FormField label="وزن" :error="errors.weight">
                    <input v-model="form.weight" type="text" dir="ltr" class="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-text
      focus:outline-none focus:border-primary-400 transition-colors"
                        :class="errors.weight ? 'border-danger focus:border-danger' : ''" />
                </FormField>
                <FormField label="کمترین میزان سفارش" :error="errors.min_order">
                    <input v-model="form.min_order" type="text" dir="ltr" class="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-text
      focus:outline-none focus:border-primary-400 transition-colors"
                        :class="errors.min_order ? 'border-danger focus:border-danger' : ''" />
                </FormField>
                <FormField label="بیشنرین میزان سفارش" :error="errors.max_order">
                    <input v-model="form.max_order" type="text" dir="ltr" class="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-text
      focus:outline-none focus:border-primary-400 transition-colors"
                        :class="errors.max_order ? 'border-danger focus:border-danger' : ''" />
                </FormField>
            </div>
            <FormField label="گالری محصول" :error="errors.galleries">
                    <FileUploader
                        purpose="image"
                        v-model="galleries"
                        @error="onUploadError"
                    />
                </FormField>
           </div>
            

            <div v-if="generalError" class="mt-4 bg-danger/10 text-danger text-sm rounded-lg px-4 py-3">
                {{ generalError }}
            </div>

            <div class="flex items-center gap-3 mt-6 pt-4 border-t border-border">
                <button type="submit" :disabled="submitting"
                    class="bg-primary-400 hover:bg-primary-500 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    {{ submitting ? 'در حال ذخیره...' : 'ذخیره محصول' }}
                </button>
                <NuxtLink to="/admin/users"
                    class="text-muted text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-background transition-colors">
                    انصراف
                </NuxtLink>
            </div>
        </form>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import FormField from '~/components/ui/FormField.vue';
import { useProductStore } from '#imports';
import FileUploader from '~/components/admin/Partials/FileUploader.vue';

const { post } = useApi()
const router = useRouter()
const productStore = useProductStore();

const form = reactive({
    product_id: 0,
    weight: 0,
    discount_percent: 0,
    min_order: 0,
    max_order: 0,
    galleries: 0,
})

const errors = ref({})
const generalError = ref('')
const submitting = ref(false)

const submit = async () => {
    submitting.value = true
    errors.value = {}
    generalError.value = ''

    try {

        const response = await post('/api/admin/product-variation', form)

        if (response.status) {
            router.push('/admin/products')
        }
    } catch (error) {
        const validationErrors = error?.data?.error?.errors

        if (validationErrors) {
            errors.value = validationErrors
        } else {
            generalError.value = 'خطایی رخ داد، لطفا دوباره تلاش کنید'
        }
    } finally {
        submitting.value = false
    }
}

definePageMeta({
    layout: 'admin',
    middleware: ['auth', 'admin'],
})
onMounted(async () => {
    await productStore.fetchSimpleProducts();
})
</script>
