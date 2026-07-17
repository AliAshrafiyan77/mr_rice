<template>
    <div>
        <div class="flex items-center gap-3 mb-6">
            <NuxtLink
                to="/admin/users"
                class="p-2 rounded-lg text-muted hover:bg-surface transition-colors"
            >
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
            </NuxtLink>
            <h1 class="text-xl font-bold text-text">ویرایش کاربر</h1>
        </div>

        <!-- Loading -->
        <div v-if="loading" class="flex items-center justify-center py-16 text-muted text-sm">
            در حال بارگذاری...
        </div>

        <form v-else @submit.prevent="submit" class="bg-surface rounded-xl border border-border p-4 md:p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-5">
                <FormField label="نام" :error="errors.name">
                    <input
                        v-model="form.name"
                        type="text"
                        class="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-text
    focus:outline-none focus:border-primary-400 transition-colors"
                        :class="errors.name ? 'border-danger focus:border-danger' : ''"
                    />
                </FormField>

                <FormField label="نام خانوادگی" :error="errors.last_name">
                    <input
                        v-model="form.last_name"
                        type="text"
                        class="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-text
    focus:outline-none focus:border-primary-400 transition-colors"
                        :class="errors.last_name ? 'border-danger focus:border-danger' : ''"
                    />
                </FormField>

                <FormField label="موبایل" :error="errors.mobile">
                    <input
                        v-model="form.mobile"
                        type="text"
                        dir="ltr"
                        placeholder="09xxxxxxxxx"
                        class="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-text
    focus:outline-none focus:border-primary-400 transition-colors"
                        :class="errors.mobile ? 'border-danger focus:border-danger' : ''"
                    />
                </FormField>

                <FormField label="کد ملی" :error="errors.national_code">
                    <input
                        v-model="form.national_code"
                        type="text"
                        dir="ltr"
                        class="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-text
    focus:outline-none focus:border-primary-400 transition-colors"
                        :class="errors.national_code ? 'border-danger focus:border-danger' : ''"
                    />
                </FormField>

                <FormField label="رمز عبور جدید" :error="errors.password">
                    <input
                        v-model="form.password"
                        type="password"
                        dir="ltr"
                        class="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-text
    focus:outline-none focus:border-primary-400 transition-colors"
                        :class="errors.password ? 'border-danger focus:border-danger' : ''"
                    />
                    <p class="text-xs text-muted mt-1">
                        در صورت خالی گذاشتن، رمز عبور فعلی تغییر نمی‌کند
                    </p>
                </FormField>

                <FormField label="تکرار رمز عبور جدید" :error="errors.password_confirmation">
                    <input
                        v-model="form.password_confirmation"
                        type="password"
                        dir="ltr"
                        class="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-text
    focus:outline-none focus:border-primary-400 transition-colors"
                        :class="errors.password_confirmation ? 'border-danger focus:border-danger' : ''"
                    />
                </FormField>

                <FormField label="تاریخ تولد" :error="errors.birth_date">
                    <JalaliDatePicker v-model="form.birth_date" placeholder="1377/08/11" />
                </FormField>

                <FormField label="کد معرف" :error="errors.referral_code">
                    <input
                        v-model="form.referral_code"
                        type="text"
                        dir="ltr"
                        class="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-text
    focus:outline-none focus:border-primary-400 transition-colors"
                        :class="errors.referral_code ? 'border-danger focus:border-danger' : ''"
                    />
                </FormField>

                <FormField label="توضیحات" :error="errors.description" class="md:col-span-2">
                    <textarea
                        v-model="form.description"
                        rows="3"
                        class="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-text
    focus:outline-none focus:border-primary-400 transition-colors resize-none"
                        :class="errors.description ? 'border-danger focus:border-danger' : ''"
                    ></textarea>
                </FormField>

                <div class="md:col-span-2 flex flex-wrap items-center gap-6 pt-1">
                    <label class="flex items-center gap-2 cursor-pointer">
                        <input
                            v-model="form.is_active"
                            type="checkbox"
                            class="w-4 h-4 rounded border-border text-primary-400 focus:ring-primary-400"
                        />
                        <span class="text-sm text-text">کاربر فعال باشد</span>
                    </label>

                    <label class="flex items-center gap-2 cursor-pointer">
                        <input
                            v-model="form.is_mobile_verified"
                            type="checkbox"
                            class="w-4 h-4 rounded border-border text-primary-400 focus:ring-primary-400"
                        />
                        <span class="text-sm text-text">موبایل تایید شده باشد</span>
                    </label>

                    <label class="flex items-center gap-2 cursor-pointer">
                        <input
                            v-model="form.is_admin"
                            type="checkbox"
                            class="w-4 h-4 rounded border-border text-primary-400 focus:ring-primary-400"
                        />
                        <span class="text-sm text-text">دسترسی ادمین</span>
                    </label>
                </div>
            </div>

            <div v-if="generalError" class="mt-4 bg-danger/10 text-danger text-sm rounded-lg px-4 py-3">
                {{ generalError }}
            </div>

            <div class="flex items-center gap-3 mt-6 pt-4 border-t border-border">
                <button
                    type="submit"
                    :disabled="submitting"
                    class="bg-primary-400 hover:bg-primary-500 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {{ submitting ? 'در حال ذخیره...' : 'ذخیره تغییرات' }}
                </button>
                <NuxtLink
                    to="/admin/users"
                    class="text-muted text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-background transition-colors"
                >
                    انصراف
                </NuxtLink>
            </div>
        </form>
    </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import FormField from '~/components/ui/FormField.vue'
import JalaliDatePicker from '~/components/ui/JalaliDatePicker.vue'

const { get, put } = useApi()
const route = useRoute()
const router = useRouter()

const userId = route.params.id

const form = reactive({
    name: '',
    last_name: '',
    mobile: '',
    national_code: '',
    password: '',
    password_confirmation: '',
    birth_date: '',
    referral_code: '',
    description: '',
    is_active: true,
    is_mobile_verified: false,
    is_admin: false,
})

const errors = ref({})
const generalError = ref('')
const loading = ref(true)
const submitting = ref(false)

const fetchUser = async () => {
    loading.value = true
    try {
        const response = await get(`/api/admin/user/${userId}`)

        if (response.status) {
            const user = response.user

            form.name = user.name ?? ''
            form.last_name = user.last_name ?? ''
            form.mobile = user.mobile ?? ''
            form.national_code = user.national_code ?? ''
            form.birth_date = user.birth_date ?? ''
            form.referral_code = user.referral_code ?? ''
            form.description = user.description ?? ''
            form.is_active = Boolean(user.is_active)
            form.is_mobile_verified = Boolean(user.is_mobile_verified)
            form.is_admin = Boolean(user.is_admin)
        }
    } catch (error) {
        generalError.value = 'کاربر یافت نشد'
    } finally {
        loading.value = false
    }
}

const submit = async () => {
    submitting.value = true
    errors.value = {}
    generalError.value = ''

    try {
        // don't send empty password fields — backend should treat empty as "no change"
        const payload = { ...form }
        if (!payload.password) {
            delete payload.password
            delete payload.password_confirmation
        }

        const response = await put(`/api/admin/user/${userId}`, payload)

        if (response.status) {
            router.push('/admin/users')
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

onMounted(() => fetchUser())

definePageMeta({
    layout: 'admin',
    middleware: ['auth', 'admin'],
})
</script>
