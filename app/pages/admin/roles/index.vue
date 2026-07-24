<template>
    <div>
        <div class="flex items-center justify-between mb-6">
            <h1 class="text-xl font-bold text-text">نقش ها</h1>
            <div class="flex items-center gap-2">
                <FilterDropdown :active-count="activeFilterCount" @apply="applyFilters" @reset="resetFilters">
                    <div>
                        <label class="block text-sm font-medium text-text mb-1.5 placeholder:text-right">نام نقش</label>
                        <input v-model="filters.fa_name" type="text" dir="auto" placeholder="نام نقش..." class="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-text
    focus:outline-none focus:border-primary-400 transition-colors" />
                    </div>

                </FilterDropdown>

                <NuxtLink to="/admin/roles/create"
                    class="flex items-center gap-2 bg-primary-400 hover:bg-primary-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                    افزودن نقش
                </NuxtLink>
            </div>
        </div>
        <div class="w-full" id="filter"></div>

        <div v-if="loading" class="flex items-center justify-center py-16 text-muted text-sm">
            در حال بارگذاری...
        </div>

        <div v-else-if="!roles?.data?.length"
            class="flex flex-col items-center justify-center py-16 text-muted text-sm bg-surface rounded-xl border border-border">
            نقشی یافت نشد.
        </div>

        <template v-else>
            <div class=" bg-surface rounded-xl border border-border overflow-hidden">
                <table class="w-full text-sm">
                    <thead>
                        <tr class="bg-background border-b border-border text-center">
                            <th class="font-medium text-muted px-4 py-3">نام</th>
                            <th class="font-medium text-muted px-4 py-3">تعداد کاربران دارای نقش</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="role in roles.data" :key="role.id"
                            class="border-b border-border last:border-0 hover:bg-background/60 transition-colors text-center">
                            <td class="px-4 py-3 font-medium">
                                {{ role.fa_name }}
                            </td>

                            <td class="px-4 py-3 text-muted">
                                {{ role.users_count }}
                            </td>

                            <td class="px-4 py-3">
                                <div class="flex justify-center items-center gap-2">
                                    <NuxtLink
                                        :to="'/admin/roles/edit/' + role.id"
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

                <Pagination :paginator="roles" @change-page="goToPage" />
            </div>

            <!-- <div class="md:hidden space-y-3">
                <div v-for="role in roles.data" :key="role.id" class="bg-surface rounded-xl border border-border p-4">
                    <div class="flex items-start justify-between mb-3">
                        <div class="flex items-center gap-3">
                            <div
                                class="w-10 h-10 rounded-full bg-primary-400 flex items-center justify-center text-white text-sm font-semibold shrink-0">
                                {{ role.fa_name?.charAt(0) }}
                            </div>
                            <div>
                                <p class="text-text font-medium text-sm">{{ role.user_count }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="bg-surface rounded-xl border border-border">
                    <Pagination :paginator="users" @change-page="goToPage" />
                </div>
            </div> -->
        </template>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Pagination from '~/components/ui/Pagination.vue'
import FilterDropdown from '~/components/ui/FilterDropdown.vue'

const { get } = useApi()
const route = useRoute()
const router = useRouter()

const roles = ref(null)
const loading = ref(true)

const filters = reactive({
    fa_name: route.query.fa_name || '',
})

const activeFilterCount = computed(() => {
    return Object.values(filters).filter((v) => v !== '').length
})

const fetchRoles = async (page = 1) => {
    loading.value = true
    try {
        const query = new URLSearchParams({
            page,
            ...(filters.fa_name !== '' && { fa_name: filters.fa_name }),
        })

        const response = await get(`/api/admin/role?${query.toString()}`)
        if (response.status) {
            roles.value = response.roles
        }
    } finally {
        loading.value = false
    }
}

const applyFilters = async () => {
    router.push({
        query: {
            ...(filters.fa_name !== '' && { fa_name: filters.fa_name }),

            page: 1, // reset to first page on new filter
        },
    })
    await fetchRoles();

}

const resetFilters = async () => {
    filters.fa_name = ''
    router.push({ query: { page: 1 } })
    await fetchRoles();
}

const goToPage = (page) => {
    router.push({ query: { ...route.query, page } })
}

onMounted(() => {
    const initialPage = Number(route.query.page) || 1
    fetchRoles(initialPage)
})

watch(
    () => route.query.page,
    (newPage) => {
        fetchRoles(Number(newPage) || 1)
    }
)

definePageMeta({
    layout: 'admin',
    middleware: ['auth', 'admin'],
})
</script>