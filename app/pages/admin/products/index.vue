<template>
    <div>
        <div class="flex items-center justify-between mb-6">
            <h1 class="text-xl font-bold text-text">محصولات مادر</h1>
            <div class="flex items-center gap-2">
                <FilterDropdown :active-count="activeFilterCount" @apply="applyFilters" @reset="resetFilters">

                    <div>
                        <label class="block text-sm font-medium text-text mb-1.5 placeholder:text-right">
                            عنوان محصول
                        </label>
                        <input v-model="filters.title" type="text" dir="auto" placeholder="عنوان محصول..." class="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-text
    focus:outline-none focus:border-primary-400 transition-colors" />
                    </div>

                    <!-- <div>
                        <label class="block text-sm font-medium text-text mb-1.5">وضعیت</label>
                        <select v-model="filters.is_active" class="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-text
    focus:outline-none focus:border-primary-400 transition-colors">
                            <option value="">همه</option>
                            <option value="1">فعال</option>
                            <option value="0">غیرفعال</option>
                        </select>
                    </div> -->
                </FilterDropdown>

                <NuxtLink to="/admin/products/create"
                    class="flex items-center gap-2 bg-primary-400 hover:bg-primary-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                    افزودن محصول مادر
                </NuxtLink>
            </div>
        </div>
        <div class="w-full" id="filter"></div>

        <!-- Loading -->
        <div v-if="loading" class="flex items-center justify-center py-16 text-muted text-sm">
            در حال بارگذاری...
        </div>

        <!-- Empty state -->
        <div v-else-if="!products?.length"
            class="flex flex-col items-center justify-center py-16 text-muted text-sm bg-surface rounded-xl border border-border">
            محصولی یافت نشد
        </div>

        <template v-else>
            <!-- Desktop table -->
            <div class="hidden md:block bg-surface rounded-xl border border-border overflow-hidden">
                <table class="w-full text-sm">
                    <thead>
                        <tr class="bg-background border-b border-border text-center">
                            <th class="font-medium text-muted px-4 py-3">عنوان</th>
                            <th class="font-medium text-muted px-4 py-3">واحد</th>
                            <th class="font-medium text-muted px-4 py-3">دسته بندی</th>
                            <th class="font-medium text-muted px-4 py-3">قیمت واحد</th>
                            <th class="font-medium text-muted px-4 py-3">آخرین تغیرات</th>
                            <th class="font-medium text-muted px-4 py-3"></th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="product in products" :key="product.id"
                            class="border-b border-border last:border-0 hover:bg-background/60 transition-colors text-center">
                            <td class="px-4 py-3 font-medium">
                                {{ product.title }}
                            </td>

                            <td class="px-4 py-3 text-muted" dir="ltr">
                                {{ product.unit }}
                            </td>
                            <td class="px-4 py-3 text-muted" dir="ltr">
                                {{ product.category }}
                            </td>

                            <td class="px-4 py-3 text-muted">
                                {{ product.base_amount_per_unit }}
                            </td>

                            <td class="px-4 py-3">
                                {{ product.updated_at }}
                            </td>

                            <td class="px-4 py-3">
                                <div class="flex justify-center items-center gap-2">
                                    <NuxtLink :to="'/admin/products/' + product.id"
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

                <Pagination :paginator="paginator" @change-page="goToPage" />
            </div>

            <!-- Mobile cards -->
            <div class="md:hidden space-y-3">
                <div v-for="product in products" :key="product.id"
                    class="bg-surface rounded-xl border border-border p-4">
                    <div class="flex items-start justify-between mb-3">
                        <div class="flex items-center gap-3">
                            <div>
                                <p class="text-text font-medium text-sm">{{ product.title }}</p>
                                <p class="text-muted text-xs" dir="ltr">{{ 'واحد:' + ' ' + product.unit }}</p>
                            </div>
                        </div>
                        <span
                            class="inline-flex bg-success/10 text-success items-center px-2.5 py-1 rounded-full text-xs font-medium shrink-0">
                            {{ 'قیمت واحد:' + ' ' + product.base_amount_per_unit }}
                        </span>
                    </div>

                    <div class="flex items-center justify-between pt-3 border-t border-border">
                        <p class="text-xs text-muted">آخریت تغییرات: <span class="text-text">{{ product.updated_at
                        }}</span>
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
                    <Pagination :paginator="paginator" @change-page="goToPage" />
                </div>
            </div>
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

const products = ref(null)
const paginator = ref(null)
const loading = ref(true)

const filters = reactive({
    title: route.query.title || '',
})

const activeFilterCount = computed(() => {
    return Object.values(filters).filter((v) => v !== '').length
})

const fetchProducts = async (page = 1) => {
    loading.value = true
    try {
        const query = new URLSearchParams({
            page,
            ...(filters.title !== '' && { title: filters.title }),
        })

        const response = await get(`/api/admin/product?${query.toString()}`)
        if (response.status) {
            products.value = response.products
            paginator.value = response.paginator
        }
    } finally {
        loading.value = false
    }
}

const applyFilters = async () => {
    router.push({
        query: {
            ...(filters.title !== '' && { title: filters.title }),
            page: 1, // reset to first page on new filter
        },
    })
    await fetchProducts();

}

const resetFilters = async () => {
    filters.title = ''
    await fetchProducts();
}

const goToPage = (page) => {
    router.push({ query: { ...route.query, page } })
}

onMounted(() => {
    const initialPage = Number(route.query.page) || 1
    fetchProducts(initialPage)
})

watch(
    () => route.query.page,
    (newPage) => {
        fetchProducts(Number(newPage) || 1)
    }
)

definePageMeta({
    layout: 'admin',
    middleware: ['auth', 'admin'],
})
</script>