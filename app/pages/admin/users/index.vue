<template>
    <div>
        <div class="flex items-center justify-between mb-6">
            <h1 class="text-xl font-bold text-text">کاربران</h1>
            <NuxtLink to="/admin/users/create"
                class="flex items-center gap-2 bg-primary-400 hover:bg-primary-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                افزودن کاربر
            </NuxtLink>
        </div>

        <!-- Loading -->
        <div v-if="loading" class="flex items-center justify-center py-16 text-muted text-sm">
            در حال بارگذاری...
        </div>

        <!-- Empty state -->
        <div v-else-if="!users?.data?.length"
            class="flex flex-col items-center justify-center py-16 text-muted text-sm bg-surface rounded-xl border border-border">
            کاربری یافت نشد
        </div>

        <template v-else>
            <!-- Desktop table -->
            <div class="hidden md:block bg-surface rounded-xl border border-border overflow-hidden">
                <table class="w-full text-sm">
                    <thead>
                        <tr class="bg-background border-b border-border text-center">
                            <th class="font-medium text-muted px-4 py-3">نام</th>
                            <th class="font-medium text-muted px-4 py-3">موبایل</th>
                            <th class="font-medium text-muted px-4 py-3">کد ملی</th>
                            <th class="font-medium text-muted px-4 py-3">وضعیت</th>
                            <th class="font-medium text-muted px-4 py-3">عملیات</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="user in users.data" :key="user.id"
                            class="border-b border-border last:border-0 hover:bg-background/60 transition-colors text-center">
                            <td class="px-4 py-3 font-medium">
                                {{ user.name }} {{ user.last_name }}
                            </td>

                            <td class="px-4 py-3 text-muted" dir="ltr">
                                {{ user.mobile }}
                            </td>

                            <td class="px-4 py-3 text-muted">
                                {{ user.national_code }}
                            </td>

                            <td class="px-4 py-3">
                                <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium"
                                    :class="user.is_active
                                        ? 'bg-success/10 text-success'
                                        : 'bg-danger/10 text-danger'">
                                    {{ user.is_active ? 'فعال' : 'غیرفعال' }}
                                </span>
                            </td>

                            <td class="px-4 py-3">
                                <div class="flex justify-center items-center gap-2">
                                    <NuxtLink :to="'/admin/users/' + user.id"
                                        class="p-1.5 rounded-lg text-muted hover:bg-background hover:text-primary-500 transition-colors">
                                        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    </NuxtLink>
                                    <button
                                        class="p-1.5 rounded-lg text-muted hover:bg-danger/10 hover:text-danger transition-colors">
                                        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <Pagination :paginator="users" @change-page="goToPage" />
            </div>

            <!-- Mobile cards -->
            <div class="md:hidden space-y-3">
                <div v-for="user in users.data" :key="user.id" class="bg-surface rounded-xl border border-border p-4">
                    <div class="flex items-start justify-between mb-3">
                        <div class="flex items-center gap-3">
                            <div
                                class="w-10 h-10 rounded-full bg-primary-400 flex items-center justify-center text-white text-sm font-semibold shrink-0">
                                {{ user.name?.charAt(0) }}
                            </div>
                            <div>
                                <p class="text-text font-medium text-sm">{{ user.name }} {{ user.last_name }}</p>
                                <p class="text-muted text-xs" dir="ltr">{{ user.mobile }}</p>
                            </div>
                        </div>
                        <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium shrink-0"
                            :class="user.is_active
                                ? 'bg-success/10 text-success'
                                : 'bg-danger/10 text-danger'">
                            {{ user.is_active ? 'فعال' : 'غیرفعال' }}
                        </span>
                    </div>

                    <div class="flex items-center justify-between pt-3 border-t border-border">
                        <p class="text-xs text-muted">کد ملی: <span class="text-text">{{ user.national_code }}</span>
                        </p>
                        <div class="flex items-center gap-2">
                            <button
                                class="p-1.5 rounded-lg text-muted hover:bg-background hover:text-primary-500 transition-colors">
                                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                            </button>
                            <button
                                class="p-1.5 rounded-lg text-muted hover:bg-danger/10 hover:text-danger transition-colors">
                                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div class="bg-surface rounded-xl border border-border">
                    <Pagination :paginator="users" @change-page="goToPage" />
                </div>
            </div>
        </template>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Pagination from '~/components/ui/Pagination.vue'

const { get } = useApi()
const route = useRoute()
const router = useRouter()

const users = ref(null)
const loading = ref(true)

const fetchUsers = async (page = 1) => {
    loading.value = true
    try {
        const response = await get(`/api/admin/user?page=${page}`)
        if (response.status) {
            users.value = response.users
        }
    } finally {
        loading.value = false
    }
}

const goToPage = (page) => {
    router.push({ query: { ...route.query, page } })
}

onMounted(() => {
    const initialPage = Number(route.query.page) || 1
    fetchUsers(initialPage)
})

watch(
    () => route.query.page,
    (newPage) => {
        fetchUsers(Number(newPage) || 1)
    }
)

definePageMeta({
    layout: 'admin',
    middleware: ['auth', 'admin'],
})
</script>