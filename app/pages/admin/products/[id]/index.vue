<template>
    <div>
        <div class="flex items-center gap-3 mb-6">
            <NuxtLink to="/admin/users" class="p-2 rounded-lg text-muted hover:bg-surface transition-colors">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
            </NuxtLink>
            <h1 class="text-xl font-bold text-text">ویرایش محصول</h1>
        </div>

        <form @submit.prevent="submit" class="bg-surface rounded-xl border border-border p-4 md:p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-5">
                <FormField label="عنوان" :error="errors.title">
                    <input v-model="form.title" type="text" class="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-text
                        focus:outline-none focus:border-primary-400 transition-colors"
                        :class="errors.title ? ' border-danger focus:border-danger' : ''" />
                </FormField>

                <FormField label="واحد" :error="errors.unit">
                    <select v-model="form.unit" class="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-text
                        focus:outline-none focus:border-primary-400 transition-colors"
                        :class="errors.unit ? ' border-danger focus:border-danger' : ''">
                        <option v-for="unit in ProductUnitOptions" :key="unit.value" :value="unit.value">
                            {{ unit.label }}
                        </option>
                    </select>

                </FormField>

                <FormField label="قیمت واحد(تومان)" :error="errors.base_amount_per_unit">
                    <input :value="tools.formatNumber(form.base_amount_per_unit)" type="text" dir="ltr" class="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-text
      focus:outline-none focus:border-primary-400 transition-colors"
                        :class="errors.base_amount_per_unit ? 'border-danger focus:border-danger' : ''"
                        @input="form.base_amount_per_unit = tools.unformatNumber($event.target.value)" />
                </FormField>

                <FormField label="دسته بندی" :error="errors.category_id">
                    <select v-model="form.category_id" class="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-text
    focus:outline-none focus:border-primary-400 transition-colors">
                        <option disabled value="">انتخاب دسته</option>
                        <option v-for="(category, index) in categoryStore.categoriesSimple" :value="category.id"
                            :key="index" :class="errors.category ? ' border-danger focus:border-danger' : ''">
                            {{ category.title }}</option>
                    </select>

                </FormField>
                <FormField label="کلید واژه ها">
                    <Select2 v-if="formReady" class="w-full rounded-lg border border-border bg-background"
                        v-model="form.keywords" url="api/admin/keyword" label="title" value="id" mode="tags"
                        placeholder="کلید واژه ها را جستجو یا ایجاد کنید" :create-option="true"
                        :close-on-select="false" />
                </FormField>

                <FormField label="توضیحات سئو" :error="errors.meta_description" class="md:col-span-2">
                    <textarea dir="auto" rows="3" v-model="form.meta_description" class="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-text
    focus:outline-none focus:border-primary-400 transition-colors"></textarea>

                </FormField>

                <FormField label="توضیحات کامل" :error="errors.description" class="md:col-span-2">
                    <RichTextEditor v-if="formReady" v-model="form.description" />
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
import RichTextEditor from '~/components/admin/Partials/RichTextEditor.vue';
import { useCategoryStore } from '#imports';
import { useTools } from '#imports';
import {
    ProductUnit,
    ProductUnitOptions,
} from '~/enums/productUnit';
import Select2 from '~/components/admin/Partials/Select2.vue';

const { put, get } = useApi()
const router = useRouter()
const route = useRoute();
const categoryStore = useCategoryStore();
const tools = useTools()

const form = reactive({
    title: '',
    unit: ProductUnit.GRAM,
    base_amount_per_unit: '',
    category_id: '',
    keywords: [],
    meta_description: '',
    description: '',

})

const errors = ref({})
const generalError = ref('')
const submitting = ref(false)
const formReady = ref(false)
const productId = route.params.id

const submit = async () => {
    submitting.value = true
    errors.value = {}
    generalError.value = ''

    try {
        const response = await put(`/api/admin/product/${productId}`, form)

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


const fetchProduct = async () => {
    formReady.value = false

    try {
        const response = await get(`/api/admin/product/${productId}`)

        if (response.status) {
            const product = response.product
            form.title = product.title ?? ''
            form.unit = product.unit ?? ProductUnit.GRAM
            form.base_amount_per_unit = product.base_amount_per_unit ?? ''
            form.category_id = product.category_id ?? ''
            form.keywords = product.keywords ?? []
            form.meta_description = product.meta_description ?? ''
            form.description = product.description ?? ''
            formReady.value = true
        }
    } catch (error) {
        generalError.value = 'محصول یافت نشد'
    }
}

definePageMeta({
    layout: 'admin',
    middleware: ['auth', 'admin'],
})
onMounted(async () => {
    await categoryStore.fetchCategorySimpleList()
    await fetchProduct()
})
</script>
