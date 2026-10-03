<template>
  <AdminSettingsHomePageSettingsSection
    title="محصول شاخص (بالای صفحه اصلی)"
    description="یک کالای موجود (با وزن مشخص) به‌صورت برجسته در بالای صفحه اصلی نمایش داده می‌شود."
  >
    <FormField label="انتخاب کالای شاخص" :error="error">
      <AdminSettingsHomePageInventorySearchSelect
        v-model="featuredVariationId"
        v-model:selected-variation="featuredVariation"
        placeholder="نام کالا را جستجو کنید..."
      />
    </FormField>

    <div
      v-if="featuredVariation"
      class="mt-4 rounded-lg border border-border bg-background px-4 py-3 text-sm text-text"
    >
      <span class="text-muted">کالای انتخاب‌شده:</span>
      <span class="mr-2 font-medium">{{ featuredVariation.label || featuredVariation.title }}</span>
    </div>
  </AdminSettingsHomePageSettingsSection>
</template>

<script setup>
import FormField from '~/components/ui/FormField.vue'

const props = defineProps({
  modelValue: {
    type: [Number, String, null],
    default: null,
  },
  selectedVariation: {
    type: Object,
    default: null,
  },
  error: {
    type: [String, Array],
    default: '',
  },
})

const emit = defineEmits(['update:modelValue', 'update:selectedVariation'])

const featuredVariationId = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})

const featuredVariation = computed({
  get() {
    return props.selectedVariation
  },
  set(value) {
    emit('update:selectedVariation', value)
  },
})
</script>
