<template>
  <div>
    <Select2
      :model-value="modelValue"
      class="w-full rounded-lg border border-border bg-background"
      url="/api/admin/product-inventory/search"
      response-key="product_inventories"
      search-param="title"
      label="label"
      value="id"
      mode="tags"
      emit-field="value"
      :create-option="false"
      :close-on-select="false"
      :disabled="disabled || limitReached"
      :placeholder="placeholder"
      :extra-params="extraParams"
      :selected-options="selectedOptions"
      :max="max"
      @update:model-value="onIdsChange"
      @update:selected-items="onSelectedItemsChange"
    />

    <p class="mt-1.5 text-xs text-muted">
      {{ selectedCount }} / {{ max }} کالا انتخاب شده
    </p>

    <p v-if="limitReached" class="mt-1 text-xs text-warning">
      به حداکثر {{ max }} کالا رسیده‌اید.
    </p>
  </div>
</template>

<script setup>
import Select2 from '~/components/admin/Partials/Select2.vue'
import { formatInventoryLabel, normalizeInventoryList } from '~/composables/useInventoryLabel'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
  selectedInventories: {
    type: Array,
    default: () => [],
  },
  categoryId: {
    type: [Number, String, null],
    default: null,
  },
  max: {
    type: Number,
    default: 6,
  },
  placeholder: {
    type: String,
    default: 'جستجو و انتخاب کالاها...',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue', 'update:selectedInventories'])

const extraParams = computed(() => {
  if (!props.categoryId) {
    return {}
  }

  return { category_id: props.categoryId }
})

const selectedOptions = computed(() =>
  normalizeInventoryList(props.selectedInventories).map((item) => ({
    id: item.id,
    label: formatInventoryLabel(item),
  })),
)

const selectedCount = computed(() => (Array.isArray(props.modelValue) ? props.modelValue.length : 0))
const limitReached = computed(() => selectedCount.value >= props.max)

function onIdsChange(ids) {
  const next = Array.isArray(ids) ? ids.slice(0, props.max) : []
  emit('update:modelValue', next)
}

function onSelectedItemsChange(items) {
  emit('update:selectedInventories', Array.isArray(items) ? items : [])
}
</script>
