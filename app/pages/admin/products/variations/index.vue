<template>
    <div>
        <div class="flex items-center justify-between mb-6">
            <h1 class="text-xl font-bold text-text">محصولات مادر</h1>
            <div class="flex items-center gap-2">
                <FilterDropdown :active-count="activeFilterCount" @apply="applyFilters" @reset="resetFilters">

                    <!-- <div>
                        <label class="block text-sm font-medium text-text mb-1.5 placeholder:text-right">
                            عنوان تنوع
                        </label>
                        <input v-model="filters.title" type="text" dir="auto" placeholder="عنوان تنوع..." class="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-text
    focus:outline-none focus:border-primary-400 transition-colors" />
                    </div> -->
                    <FormField label="عنوان تنوع">
                        <input v-model="filters.title" type="text" dir="auto"
                            class="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-text opacity-70" />
                    </FormField>
                    <FormField label="sku">
                        <input v-model="filters.sku" type="text" dir="auto"
                            class="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-text opacity-70" />
                    </FormField>
                    <FormField label="وزن">
                        <input v-model="filters.weight" type="number" dir="auto"
                            class="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-text opacity-70" />
                    </FormField>

                    <FormField label="واحد">
                        <select v-model="filters.unit" class="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-text
                        focus:outline-none focus:border-primary-400 transition-colors">
                            <option v-for="unit in ProductUnitOptions" :key="unit.value" :value="unit.value">
                                {{ unit.label }}
                            </option>
                        </select>

                    </FormField>
                </FilterDropdown>

                <NuxtLink to="/admin/products/create"
                    class="flex items-center gap-2 bg-primary-400 hover:bg-primary-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                    افزودن تنوع محصول
                </NuxtLink>
            </div>
        </div>
        <div class="w-full" id="filter"></div>

        <!-- Loading -->
        <div v-if="loading" class="flex items-center justify-center py-16 text-muted text-sm">
            در حال بارگذاری...
        </div>

        <!-- Empty state -->
        <div v-else-if="!productVariations?.length"
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
                            <th class="font-medium text-muted px-4 py-3">sku</th>
                            <th class="font-medium text-muted px-4 py-3">درصد تخفیف</th>
                            <th class="font-medium text-muted px-4 py-3">وزن</th>
                            <th class="font-medium text-muted px-4 py-3">قیمت</th>
                            <th class="font-medium text-muted px-4 py-3">قیمت واحد</th>
                            <th class="font-medium text-muted px-4 py-3">آخرین تغیرات</th>
                            <th class="font-medium text-muted px-4 py-3"></th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="variation in productVariations" :key="variation.id"
                            class="border-b border-border last:border-0 hover:bg-background/60 transition-colors text-center">
                            <td class="px-4 py-3 font-medium">
                                {{ variation.title }}
                            </td>
                            <td class="px-4 py-3 font-medium">
                                {{ variation.sku }}
                            </td>
                            <td class="px-4 py-3 font-medium">
                                {{ formatNumber(variation.discount_percent) }} %
                            </td>

                            <td class="px-4 py-3 text-muted" dir="rtl">
                                {{ formatNumber(variation.weight) + ' ' + variation.unit }}
                            </td>
                            <td class="px-4 py-3 text-muted" dir="ltr">
                                {{ formatNumber(variation.price) }}
                            </td>

                            <td class="px-4 py-3 text-muted">
                                {{ formatNumber(variation.base_amount_per_unit) }}
                            </td>

                            <td class="px-4 py-3">
                                {{ toJalali(variation.updated_at) }}
                            </td>

                            <td class="px-4 py-3">
                                <div class="flex justify-center items-center gap-2">
                                    <NuxtLink :to="'/admin/products/variations/' + variation.id"
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
                <div v-for="variation in productVariations" :key="variation.id"
                    class="bg-surface rounded-xl border border-border p-4">

                    <!-- Header -->
                    <div class="flex items-start justify-between mb-3">
                        <div class="flex-1">
                            <p class="text-text font-semibold text-sm">{{ variation.title }}</p>
                            <p class="text-muted text-xs mt-1">SKU: {{ variation.sku }}</p>
                        </div>
                        <div class="flex items-center gap-1.5">
                            <NuxtLink :to="'/admin/products/variations/' + variation.id"
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
                    </div>

                    <!-- Details Grid -->
                    <div class="space-y-2 py-3 border-y border-border">
                        <div class="flex items-center justify-between text-xs">
                            <span class="text-muted">وزن</span>
                            <span class="text-text font-medium" dir="rtl">{{ formatNumber(variation.weight) }} {{
                                variation.unit }}</span>
                        </div>

                        <div class="flex items-center justify-between text-xs">
                            <span class="text-muted">تخفیف</span>
                            <span class="text-text font-medium">{{ formatNumber(variation.discount_percent) }}%</span>
                        </div>

                        <div class="flex items-center justify-between text-xs">
                            <span class="text-muted">قیمت واحد</span>
                            <span class="text-text font-medium" dir="ltr">{{
                                formatNumber(variation.base_amount_per_unit) }}</span>
                        </div>

                        <div class="flex items-center justify-between text-xs">
                            <span class="text-muted">قیمت نهایی</span>
                            <span class="text-primary-500 font-semibold" dir="ltr">{{ formatNumber(variation.price)
                            }}</span>
                        </div>
                    </div>

                    <!-- Footer -->
                    <div class="pt-3">
                        <p class="text-xs text-muted">آخرین تغییر: <span class="text-text">{{
                            toJalali(variation.updated_at) }}</span></p>
                    </div>
                </div>

                <!-- Pagination -->
                <Pagination :paginator="paginator" @change-page="goToPage" />
            </div>
        </template>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Pagination from '~/components/ui/Pagination.vue';
import FilterDropdown from '~/components/ui/FilterDropdown.vue';
import { useTools } from '~/composables/useTools';
import FormField from '~/components/ui/FormField.vue';
import {
    ProductUnit,
    ProductUnitOptions,
} from '~/enums/productUnit';


const { toJalali, formatNumber } = useTools()
const { get } = useApi()
const route = useRoute()
const router = useRouter()

const productVariations = ref(null)
const paginator = ref(null)
const loading = ref(true)

const filters = reactive({
    title: route.query.title || '',
    sku: route.query.sku || '',
    weight: route.query.weight || '',
    unit: route.query.unit || '',
})

const activeFilterCount = computed(() => {
    return Object.values(filters).filter((v) => v !== '').length
})

const fetchProductVariations = async (page = 1) => {
    loading.value = true
    try {
        const query = new URLSearchParams({
            page,
            ...(filters.title !== '' && { title: filters.title }),
            ...(filters.sku !== '' && { sku: filters.sku }),
            ...(filters.weight !== '' && { weight: filters.weight }),
            ...(filters.unit !== '' && { unit: filters.unit }),
        })

        const response = await get(`/api/admin/product-variation?${query.toString()}`)
        if (response.status) {
            productVariations.value = response.product_variations
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
            ...(filters.sku !== '' && { sku: filters.sku }),
            ...(filters.weight !== '' && { weight: filters.weight }),
            ...(filters.unit !== '' && { unit: filters.unit }),
            page: 1, // reset to first page on new filter
        },
    })
    await fetchProductVariations();

}

const resetFilters = async () => {
    filters.title = ''
    filters.sku = ''
    filters.weight = ''
    filters.unit = ''
    await fetchProductVariations();
}

const goToPage = (page) => {
    router.push({ query: { ...route.query, page } })
}

onMounted(() => {
    const initialPage = Number(route.query.page) || 1
    fetchProductVariations(initialPage)
})

watch(
    () => route.query.page,
    (newPage) => {
        fetchProductVariations(Number(newPage) || 1)
    }
)

definePageMeta({
    layout: 'admin',
    middleware: ['auth', 'admin'],
})
</script>