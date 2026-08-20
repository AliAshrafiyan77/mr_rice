<template>
    <div>
        <div class="flex items-center gap-3 mb-6">
            <NuxtLink to="/admin/categories" class="p-2 rounded-lg text-muted hover:bg-surface transition-colors">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
            </NuxtLink>
            <h1 class="text-xl font-bold text-text">افزودن دسته بندی جدید</h1>
        </div>

        <form @submit.prevent="submit" class="bg-surface rounded-xl border border-border p-4 md:p-6">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-5">
                <div class="space-y-5">
                    <FormField label="عنوان" :error="errors.title">
                        <input v-model="form.title" type="text" class="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-text
                        focus:outline-none focus:border-primary-400 transition-colors"
                            :class="errors.title ? ' border-danger focus:border-danger' : ''" />
                    </FormField>

                    <FormField label="عنوان انگلیسی" :error="errors.en_title">
                        <input v-model="form.en_title" type="text" class="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-text
                        focus:outline-none focus:border-primary-400 transition-colors"
                            :class="errors.en_title ? ' border-danger focus:border-danger' : ''" />
                    </FormField>

                    <FormField label="دسته بندی والد" :error="errors.parent_id">
                        <select v-model="form.parent_id" class="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-text
    focus:outline-none focus:border-primary-400 transition-colors">
                            <option value="">بدون والد</option>
                            <option v-for="(category, index) in categoryStore.categoriesSimple" :value="category.id"
                                :key="index" :class="errors.description ? ' border-danger focus:border-danger' : ''">
                                {{ category.title }}</option>
                        </select>
                    </FormField>

                    <FormField label="توضیحات" :error="errors.description">
                        <textarea v-model="form.description" type="text" class="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-text
                        focus:outline-none focus:border-primary-400 transition-colors"
                            :class="errors.description ? ' border-danger focus:border-danger' : ''"></textarea>
                    </FormField>
                </div>

                <FormField label="تصویر دسته بندی" :error="errors.filename">
                    <FileUploader
                        purpose="image"
                        v-model="categoryImage"
                        @error="onUploadError"
                    />
                </FormField>
            </div>

            <div v-if="uploadError" class="mt-4 bg-danger/10 text-danger text-sm rounded-lg px-4 py-3">
                {{ uploadError }}
            </div>

            <div v-if="generalError" class="mt-4 bg-danger/10 text-danger text-sm rounded-lg px-4 py-3">
                {{ generalError }}
            </div>

            <div class="flex items-center gap-3 mt-6 pt-4 border-t border-border">
                <button type="submit" :disabled="submitting"
                    class="bg-primary-400 hover:bg-primary-500 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    {{ submitting ? 'در حال ذخیره...' : 'ذخیره دسته بندی' }}
                </button>
                <NuxtLink to="/admin/categories"
                    class="text-muted text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-background transition-colors">
                    انصراف
                </NuxtLink>
            </div>
        </form>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import FormField from '~/components/ui/FormField.vue'
import FileUploader from '~/components/admin/Partials/FileUploader.vue'
import { useCategoryStore } from '#imports';

const { post } = useApi()
const router = useRouter()
const categoryStore = useCategoryStore()

const form = reactive({
    title: '',
    parent_id: '',
    description: '',
    en_title:'',
})

const categoryImage = ref(null)
const uploadError = ref('')

const errors = ref({})
const generalError = ref('')
const submitting = ref(false)

const onUploadError = (message) => {
    uploadError.value = message
}

const submit = async () => {
    submitting.value = true
    errors.value = {}
    generalError.value = ''
    uploadError.value = ''

    const payload = {
        ...form,
        filename: categoryImage.value?.stored_name || null,
    }

    try {
        const response = await post('/api/admin/category', payload)

        if (response.status) {
            router.push('/admin/categories')
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
});

onMounted(async () => {
    await categoryStore.fetchCategorySimpleList();
})
</script>
