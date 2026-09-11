<template>
  <Multiselect
    dir="rtl"
    v-model="internalValue"
    :options="searchOptions"
    mode="single"
    :searchable="true"
    :filter-results="false"
    :resolve-on-load="false"
    :min-chars="1"
    :delay="300"
    :close-on-select="true"
    :disabled="disabled"
    :placeholder="placeholder"
    label="label"
    value-prop="value"
  />
</template>

<script setup>
import Multiselect from '@vueform/multiselect'
import '@vueform/multiselect/themes/default.css'

const props = defineProps({
  modelValue: {
    type: [Number, String, null],
    default: null,
  },
  selectedProduct: {
    type: Object,
    default: null,
  },
  placeholder: {
    type: String,
    default: 'جستجو و انتخاب محصول...',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue', 'update:selectedProduct'])

const { get } = useApi()

const internalValue = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value ?? null)
  },
})

const resolvedOptions = ref([])

watch(
  () => props.selectedProduct,
  (product) => {
    if (!product?.id) {
      return
    }

    const exists = resolvedOptions.value.some((option) => option.value === product.id)
    if (!exists) {
      resolvedOptions.value = [
        { value: product.id, label: product.title, original: product },
        ...resolvedOptions.value,
      ]
    }
  },
  { immediate: true },
)

async function searchOptions(query) {
  if (!query || query.length < 1) {
    return resolvedOptions.value
  }

  try {
    const response = await get(`api/admin/product?title=${encodeURIComponent(query)}`)
    const products = response?.products ?? []

    const options = products.map((product) => ({
      value: product.id,
      label: product.title,
      original: product,
    }))

    resolvedOptions.value = options
    return options
  } catch (error) {
    console.error('Product search failed:', error)
    return resolvedOptions.value
  }
}

watch(internalValue, (value) => {
  const match = resolvedOptions.value.find((option) => option.value === value)
  emit('update:selectedProduct', match?.original ?? (value ? { id: value, title: String(value) } : null))
})
</script>

<style scoped>
:deep(.multiselect) {
  border-radius: 0.5rem;
  border: 1px solid #e8e5de;
}

:deep(.multiselect.is-active) {
  border-color: #8faa63;
  box-shadow: none;
}
</style>
