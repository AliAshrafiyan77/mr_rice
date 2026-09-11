<template>
  <Select2
    :model-value="modelValue"
    class="w-full rounded-lg border border-border bg-background"
    url="/api/admin/product-inventory/search"
    response-key="product_inventories"
    search-param="title"
    label="label"
    value="id"
    mode="single"
    emit-field="value"
    :create-option="false"
    :close-on-select="true"
    :disabled="disabled"
    :placeholder="placeholder"
    :extra-params="extraParams"
    :selected-options="selectedOptions"
    @update:model-value="onIdChange"
    @update:selected-item="onSelectedItemChange"
  />
</template>

<script setup>
import Select2 from '~/components/admin/Partials/Select2.vue'
import { formatInventoryLabel, normalizeInventoryOption } from '~/composables/useInventoryLabel'

const props = defineProps({
  modelValue: {
    type: [Number, String, null],
    default: null,
  },
  selectedInventory: {
    type: Object,
    default: null,
  },
  categoryId: {
    type: [Number, String, null],
    default: null,
  },
  placeholder: {
    type: String,
    default: 'جستجو و انتخاب کالا...',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue', 'update:selectedInventory'])

const extraParams = computed(() => {
  if (!props.categoryId) {
    return {}
  }

  return { category_id: props.categoryId }
})

const selectedOptions = computed(() => {
  const item = normalizeInventoryOption(props.selectedInventory)

  if (!item) {
    return []
  }

  return [{
    id: item.id,
    label: formatInventoryLabel(item),
  }]
})

function onIdChange(value) {
  emit('update:modelValue', value ?? null)
}

function onSelectedItemChange(item) {
  emit('update:selectedInventory', item ?? null)
}
</script>
