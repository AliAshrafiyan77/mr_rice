<template>
  <div>
    <Multiselect
      dir="rtl"
      v-model="internalValue"
      :options="searchOptions"
      mode="multiple"
      :searchable="true"
      :filter-results="false"
      :resolve-on-load="false"
      :min-chars="1"
      :delay="300"
      :close-on-select="false"
      :disabled="disabled || limitReached"
      :placeholder="placeholder"
      :max="max"
      label="label"
      value-prop="value"
      @select="onSelect"
    />

    <p class="mt-1.5 text-xs text-muted">
      {{ selectedCount }} / {{ max }} محصول انتخاب شده
    </p>

    <p v-if="limitReached" class="mt-1 text-xs text-warning">
      به حداکثر {{ max }} محصول رسیده‌اید.
    </p>
  </div>
</template>

<script setup>
import Multiselect from '@vueform/multiselect'
import '@vueform/multiselect/themes/default.css'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
  selectedProducts: {
    type: Array,
    default: () => [],
  },
  max: {
    type: Number,
    default: 6,
  },
  placeholder: {
    type: String,
    default: 'جستجو و انتخاب محصولات...',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue', 'update:selectedProducts'])

const { get } = useApi()

const resolvedOptions = ref([])

const internalValue = computed({
  get() {
    return Array.isArray(props.modelValue) ? props.modelValue : []
  },
  set(value) {
    const next = Array.isArray(value) ? value.slice(0, props.max) : []
    emit('update:modelValue', next)
    syncSelectedProducts(next)
  },
})

const selectedCount = computed(() => internalValue.value.length)
const limitReached = computed(() => selectedCount.value >= props.max)

watch(
  () => props.selectedProducts,
  (products) => {
    if (!Array.isArray(products) || !products.length) {
      return
    }

    products.forEach((product) => {
      if (!product?.id) {
        return
      }

      const exists = resolvedOptions.value.some((option) => option.value === product.id)
      if (!exists) {
        resolvedOptions.value.push({
          value: product.id,
          label: product.title,
          original: product,
        })
      }
    })
  },
  { immediate: true, deep: true },
)

function syncSelectedProducts(ids) {
  const products = ids.map((id) => {
    const option = resolvedOptions.value.find((item) => item.value === id)
    return option?.original ?? { id, title: String(id) }
  })

  emit('update:selectedProducts', products)
}

function onSelect() {
  if (internalValue.value.length > props.max) {
    internalValue.value = internalValue.value.slice(0, props.max)
  }
}

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

    const merged = [...resolvedOptions.value]
    options.forEach((option) => {
      if (!merged.some((item) => item.value === option.value)) {
        merged.push(option)
      }
    })

    resolvedOptions.value = merged
    return options
  } catch (error) {
    console.error('Product multi-search failed:', error)
    return resolvedOptions.value
  }
}
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
