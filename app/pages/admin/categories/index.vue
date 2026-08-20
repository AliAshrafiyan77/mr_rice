<template>
    <div>
        <div class="flex items-center justify-between mb-6">
            <h1 class="text-xl font-bold text-text">دسته بندی ها</h1>
        </div>

        <div v-if="loading" class="flex items-center justify-center py-16 text-muted text-sm">
            در حال بارگذاری...
        </div>

        <div
            v-else-if="!categoryTree.length"
            class="flex flex-col items-center justify-center py-16 text-muted text-sm bg-surface rounded-xl border border-border"
        >
            دسته بندی یافت نشد
        </div>

        <div v-else class="bg-surface rounded-xl border border-border p-4">
            <ul class="cat-tree list-none m-0 p-0">
                <CategoryTreeItem
                    v-for="category in categoryTree"
                    :key="category.id"
                    :category="category"
                />
            </ul>
        </div>
    </div>
</template>

<script setup>
import CategoryTreeItem from '~/components/admin/categories/CategoryTreeItem.vue'
import { buildCategoryTree } from '~/composables/useCategoryTree'
import { useCategoryStore } from '#imports'

const categoryStore = useCategoryStore()
const loading = ref(true)

const categoryTree = computed(() => buildCategoryTree(categoryStore.categories))

onMounted(async () => {
    loading.value = true

    try {
        await categoryStore.fetchCategories()
    } finally {
        loading.value = false
    }
})

definePageMeta({
    layout: 'admin',
    middleware: ['auth', 'admin'],
})
</script>
