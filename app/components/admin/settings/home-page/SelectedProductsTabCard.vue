<template>
  <article class="rounded-xl border border-border bg-background p-4">
    <div class="mb-4 flex items-start justify-between gap-3">
      <div class="min-w-0 flex-1">
        <FormField label="عنوان تب" :error="labelError">
          <input
            v-model="tab.label"
            type="text"
            placeholder="مثال: برنج طارم و هاشمی"
            class="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text transition-colors focus:border-primary-400 focus:outline-none"
            :class="labelError ? 'border-danger focus:border-danger' : ''"
          />
        </FormField>
      </div>

      <button
        v-if="canRemove"
        type="button"
        class="mt-7 shrink-0 rounded-lg p-2 text-muted transition-colors hover:bg-danger/10 hover:text-danger"
        title="حذف تب"
        @click="$emit('remove')"
      >
        <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>

    <FormField label="کالاهای این تب" :error="productsError">
      <AdminSettingsHomePageInventoryMultiSelect
        v-model="tab.product_inventory_ids"
        v-model:selected-inventories="tab.inventories"
        :max="maxProducts"
        :placeholder="`کالاهای «${tab.label || 'این تب'}» را انتخاب کنید...`"
      />
    </FormField>
  </article>
</template>

<script setup>
import FormField from '~/components/ui/FormField.vue'
import { SELECTED_PRODUCTS_MAX } from '~/composables/useHomePageSettings'

defineProps({
  tab: {
    type: Object,
    required: true,
  },
  labelError: {
    type: [String, Array],
    default: '',
  },
  productsError: {
    type: [String, Array],
    default: '',
  },
  canRemove: {
    type: Boolean,
    default: true,
  },
})

defineEmits(['remove'])

const maxProducts = SELECTED_PRODUCTS_MAX
</script>
