<template>
  <article class="rounded-xl border border-border bg-background p-4 md:p-5">
    <div class="mb-4 flex items-start justify-between gap-3">
      <div>
        <h3 class="text-sm font-bold text-text">{{ pillar.label || 'رکن بدون عنوان' }}</h3>
        <p class="mt-1 text-xs text-muted">
          <template v-if="pillar.type === 'parent_with_variations'">
            یک کالا انتخاب کنید؛ تمام وزن‌های محصول مادر آن در صفحه اصلی نمایش داده می‌شوند.
          </template>
          <template v-else>
            حداکثر {{ pillar.max_products }} کالا برای این رکن قابل انتخاب است.
          </template>
        </p>
      </div>

      <div class="flex items-center gap-2">
        <span class="shrink-0 rounded-full bg-primary-100 px-2.5 py-1 text-[11px] font-medium text-primary-700">
          {{ pillar.type === 'parent_with_variations' ? 'محصول مادر + وزن‌ها' : 'کالاهای موجود' }}
        </span>
        <button
          v-if="canRemove"
          type="button"
          class="rounded-lg p-2 text-muted transition-colors hover:bg-danger/10 hover:text-danger"
          title="حذف رکن"
          @click="$emit('remove')"
        >
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
      <FormField label="دسته‌بندی رکن" :error="errors?.category_id">
        <AdminSettingsHomePageCategorySelect
          v-model="pillar.category_id"
          placeholder="دسته‌بندی این رکن را انتخاب کنید..."
          @update:model-value="onCategoryChange"
        />
      </FormField>

      <FormField label="نوع رکن">
        <select
          v-model="pillar.type"
          class="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-text focus:border-primary-400 focus:outline-none"
          @change="onTypeChange"
        >
          <option value="parent_with_variations">محصول مادر + تمام وزن‌ها</option>
          <option value="products">کالاهای مشخص</option>
        </select>
      </FormField>

      <FormField
        v-if="pillar.type === 'products'"
        label="حداکثر کالا"
      >
        <input
          v-model.number="pillar.max_products"
          type="number"
          min="1"
          max="6"
          class="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-text focus:border-primary-400 focus:outline-none"
        />
      </FormField>

      <FormField label="عنوان نمایشی رکن" :error="errors?.label">
        <input
          v-model="pillar.label"
          type="text"
          placeholder="مثال: برنج طارم و هاشمی"
          class="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-text focus:border-primary-400 focus:outline-none"
        />
      </FormField>

      <FormField
        v-if="pillar.type === 'parent_with_variations'"
        class="md:col-span-2"
        label="کالای موجود (محصول مادر)"
        :error="errors?.product_inventory_id"
      >
        <AdminSettingsHomePageInventorySearchSelect
          v-model="pillar.product_inventory_id"
          v-model:selected-inventory="parentInventoryPreview"
          :category-id="pillar.category_id"
          placeholder="نام کالا را جستجو کنید..."
          @update:selected-inventory="onParentInventorySelected"
        />
      </FormField>

      <FormField
        v-else
        class="md:col-span-2"
        :label="`کالاهای موجود (${pillar.product_inventory_ids?.length ?? 0} / ${pillar.max_products})`"
        :error="errors?.product_inventory_ids"
      >
        <AdminSettingsHomePageInventoryMultiSelect
          v-model="pillar.product_inventory_ids"
          v-model:selected-inventories="pillar.inventories"
          :category-id="pillar.category_id"
          :max="pillar.max_products"
          placeholder="کالاهای این رکن را جستجو و انتخاب کنید..."
        />
      </FormField>
    </div>
  </article>
</template>

<script setup>
import FormField from '~/components/ui/FormField.vue'

const props = defineProps({
  pillar: {
    type: Object,
    required: true,
  },
  errors: {
    type: Object,
    default: () => ({}),
  },
  canRemove: {
    type: Boolean,
    default: true,
  },
})

defineEmits(['remove'])

const categoryStore = useCategoryStore()

const parentInventoryPreview = computed(() => {
  if (props.pillar.inventories?.length) {
    return props.pillar.inventories[0]
  }

  if (!props.pillar.product_inventory_id) {
    return null
  }

  return {
    id: props.pillar.product_inventory_id,
    label: `کالا #${props.pillar.product_inventory_id}`,
  }
})

function onCategoryChange(categoryId) {
  if (!categoryId) {
    return
  }

  const category = categoryStore.categoriesSimple?.find((item) => item.id === categoryId)

  if (category) {
    props.pillar.label = category.title
    props.pillar.key = `category_${category.id}`
  }
}

function onTypeChange() {
  if (props.pillar.type === 'parent_with_variations') {
    props.pillar.max_products = 1
    props.pillar.product_inventory_ids = []
    props.pillar.inventories = []
  } else {
    props.pillar.product_inventory_id = null
    props.pillar.inventories = []
  }
}

function onParentInventorySelected(inventory) {
  if (!inventory) {
    props.pillar.inventories = []
    return
  }

  props.pillar.inventories = [inventory]
}
</script>
