<template>
  <Multiselect
    dir="rtl"
    v-model="internalValue"
    :options="options"
    mode="single"
    :searchable="true"
    :disabled="disabled || loading"
    :placeholder="loading ? 'در حال بارگذاری دسته‌بندی‌ها...' : placeholder"
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
  placeholder: {
    type: String,
    default: 'انتخاب دسته‌بندی...',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue'])

const categoryStore = useCategoryStore()
const loading = ref(false)

const internalValue = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value ?? null)
  },
})

const options = computed(() =>
  (categoryStore.categoriesSimple ?? []).map((category) => ({
    value: category.id,
    label: category.title,
  })),
)

onMounted(async () => {
  if (categoryStore.categoriesSimple?.length) {
    return
  }

  loading.value = true
  try {
    await categoryStore.fetchCategorySimpleList()
  } finally {
    loading.value = false
  }
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
