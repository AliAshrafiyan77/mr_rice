<template>
  <AdminSettingsHomePageSettingsSection
    title="رکن‌های فروشگاه"
    description="هر رکن بر اساس یک دسته‌بندی تعریف می‌شود. کالاها از موجودی انبار (با نام و وزن) انتخاب می‌شوند."
  >
    <div v-if="errors.pillars" class="mb-4 rounded-lg bg-danger/10 px-4 py-3 text-sm text-danger">
      {{ errors.pillars }}
    </div>

    <div class="space-y-4">
      <AdminSettingsHomePagePillarCard
        v-for="(pillar, index) in pillars"
        :key="pillar.key"
        :pillar="pillar"
        :errors="pillarErrors(index)"
        :can-remove="pillars.length > 1"
        @remove="removePillar(index)"
      />
    </div>

    <button
      type="button"
      class="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-background px-4 py-3 text-sm font-medium text-muted transition-colors hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700"
      @click="addPillar"
    >
      <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
      </svg>
      افزودن رکن جدید
    </button>
  </AdminSettingsHomePageSettingsSection>
</template>

<script setup>
import { createPillar } from '~/composables/useHomePageSettings'

const props = defineProps({
  pillars: {
    type: Array,
    required: true,
  },
  errors: {
    type: Object,
    default: () => ({}),
  },
})

function pillarErrors(index) {
  return {
    category_id: props.errors[`pillars.${index}.category_id`],
    label: props.errors[`pillars.${index}.label`],
    product_inventory_id: props.errors[`pillars.${index}.product_inventory_id`],
    product_inventory_ids: props.errors[`pillars.${index}.product_inventory_ids`],
  }
}

function addPillar() {
  props.pillars.push(createPillar())
}

function removePillar(index) {
  if (props.pillars.length <= 1) {
    return
  }

  props.pillars.splice(index, 1)
}
</script>
