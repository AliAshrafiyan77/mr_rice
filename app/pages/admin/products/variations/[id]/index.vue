<template>
    <div>
        <div class="flex items-center gap-3 mb-6">
            <NuxtLink to="/admin/products" class="p-2 rounded-lg text-muted hover:bg-surface transition-colors">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
            </NuxtLink>
            <h1 class="text-xl font-bold text-text">ویرایش تنوع محصول</h1>
        </div>

        <form @submit.prevent="submit" class="bg-surface rounded-xl border border-border p-4 md:p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-5">
                <div class="grid grid-cols-1 gap-x-4 gap-y-5">
                    <FormField label="شناسه محصول مادر" :error="errors.product_id">
                        <input v-model="form.title" type="text" dir="rtl" disabled
                            class="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-text opacity-70" />
                    </FormField>
                    <FormField label="وزن" :error="errors.weight">
                        <input v-model="form.weight" disabled type="text" dir="ltr" class="w-full px-3 py-2 rounded-lg border border-border bg-background opacity-70 text-sm text-text
      focus:outline-none focus:border-primary-400 transition-colors"
                            :class="errors.weight ? 'border-danger focus:border-danger' : ''" />
                    </FormField>

                    <FormField label="درصد تخفیف" :error="errors.discount_percent">
                        <input v-model="form.discount_percent" type="text" dir="ltr" class="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-text
      focus:outline-none focus:border-primary-400 transition-colors"
                            :class="errors.discount_percent ? 'border-danger focus:border-danger' : ''" />
                    </FormField>
                    <FormField label="کمترین میزان سفارش" :error="errors.min_order">
                        <input v-model="form.min_order" type="text" dir="ltr" class="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-text
      focus:outline-none focus:border-primary-400 transition-colors"
                            :class="errors.min_order ? 'border-danger focus:border-danger' : ''" />
                    </FormField>
                    <FormField label="بیشترین میزان سفارش" :error="errors.max_order">
                        <input v-model="form.max_order" type="text" dir="ltr" class="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-text
      focus:outline-none focus:border-primary-400 transition-colors"
                            :class="errors.max_order ? 'border-danger focus:border-danger' : ''" />
                    </FormField>
                </div>

                <FormField label="گالری محصول" :error="errors.galleries">
                    <UppyImageUploader upload-type="product-variation" :entity-id="variationId" multiple :max-files="10"
                        v-model="galleryFiles" :existing-images="existingGalleries" @uploaded="onGalleryUploaded"
                        @error="onUploadError" />
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
                    {{ submitting ? 'در حال ذخیره...' : 'ذخیره تغییرات' }}
                </button>
                <NuxtLink to="/admin/products"
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
import UppyImageUploader from '~/components/admin/Partials/UppyImageUploader.vue'

const { get, put } = useApi()
const route = useRoute()

const form = reactive({
    product_id: 0,
    title: '',
    weight: 0,
    discount_percent: 0,
    min_order: 0,
    max_order: 0,
})

const variationId = ref(0)
const galleryFiles = ref([])
const existingGalleries = ref([])
const uploadError = ref('')
const errors = ref({})
const generalError = ref('')
const submitting = ref(false)

const onUploadError = (message) => {
    uploadError.value = message
}

const onGalleryUploaded = (files) => {
    galleryFiles.value = files
}

definePageMeta({
    layout: 'admin',
    middleware: ['auth', 'admin'],
})

onMounted(async () => {
    variationId.value = Number(route.params.id)

    try {
        const response = await get(`/api/admin/product-variation/${variationId.value}`)

        if (response.status) {
            const variation = response.product_variation

            form.product_id = variation.product_id
            form.weight = variation.weight
            form.discount_percent = variation.discount_percent
            form.min_order = variation.min_order
            form.max_order = variation.max_order
            form.title = variation.title

            existingGalleries.value = (variation.galleries || []).map((gallery) => ({
                url: gallery.url,
                path: gallery.path,
                filename: gallery.filename,
                type: gallery.type,
                sort_order: gallery.sort_order,
            }))

            galleryFiles.value = existingGalleries.value.map((gallery) => ({
                filename: gallery.filename,
                stored_name: gallery.filename,
                path: gallery.path,
                url: gallery.url,
                type: gallery.type,
                sort_order: gallery.sort_order,
            }))
        }
    } catch {
        generalError.value = 'خطا در بارگذاری اطلاعات تنوع محصول'
    }
})

const buildGalleriesPayload = () => {
    if (!Array.isArray(galleryFiles.value)) {
        return []
    }

    return galleryFiles.value.map((file) => ({
        filename: file.filename || file.stored_name,
        type: file.type,
        sort_order: file.sort_order,
    }))
}

const submit = async () => {
    submitting.value = true
    errors.value = {}
    generalError.value = ''
    uploadError.value = ''

    try {
        const response = await put(`/api/admin/product-variation/${variationId.value}`, {
            ...form,
            galleries: buildGalleriesPayload(),
        })

        if (response.status) {
            existingGalleries.value = (response.data?.galleries || []).map((gallery) => ({
                url: gallery.url,
                path: gallery.path,
                filename: gallery.filename,
                type: gallery.type,
                sort_order: gallery.sort_order,
            }))
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
</script>
