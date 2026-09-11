<template>
  <AdminSettingsHomePageSettingsSection
    title="محصول شاخص (بالای صفحه اصلی)"
    description="یک کالای موجود (با وزن مشخص) به‌صورت برجسته در بالای صفحه اصلی نمایش داده می‌شود."
  >
    <FormField label="انتخاب کالای شاخص" :error="error">
      <AdminSettingsHomePageInventorySearchSelect
        v-model="featuredInventoryId"
        v-model:selected-inventory="featuredInventory"
        placeholder="نام کالا را جستجو کنید..."
      />
    </FormField>

    <div
      v-if="featuredInventory"
      class="mt-4 rounded-lg border border-border bg-background px-4 py-3 text-sm text-text"
    >
      <span class="text-muted">کالای انتخاب‌شده:</span>
      <span class="mr-2 font-medium">{{ featuredInventory.label || featuredInventory.title }}</span>
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
  selectedInventory: {
    type: Object,
    default: null,
  },
  error: {
    type: [String, Array],
    default: '',
  },
})

const emit = defineEmits(['update:modelValue', 'update:selectedInventory'])

const featuredInventoryId = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})

const featuredInventory = computed({
  get() {
    return props.selectedInventory
  },
  set(value) {
    emit('update:selectedInventory', value)
  },
})
</script>
