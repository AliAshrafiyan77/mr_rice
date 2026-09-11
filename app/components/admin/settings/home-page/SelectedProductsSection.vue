<template>
  <AdminSettingsHomePageSettingsSection
    title="محصولات منتخب"
    description="تب‌های فیلتر بخش محصولات منتخب را مدیریت کنید. عنوان بخش ثابت است و در صفحه اصلی نمایش داده می‌شود."
  >
    <div class="mb-6 rounded-xl border border-dashed border-primary-200 bg-primary-50/50 p-4">
      <p class="mb-1 text-xs font-medium text-muted">عنوان ثابت بخش (غیرقابل ویرایش)</p>
      <p class="text-base font-bold text-primary-900 md:text-lg">
        {{ sectionTitle }}
      </p>
      <p class="mt-2 text-xs text-muted">
        زیرنویس «انتخاب سرآشپزان و خانواده‌های اصیل» هم در صفحه اصلی ثابت است.
      </p>
    </div>

    <div v-if="tabsError" class="mb-4 rounded-lg bg-danger/10 px-4 py-3 text-sm text-danger">
      {{ tabsError }}
    </div>

    <div class="space-y-4">
      <AdminSettingsHomePageSelectedProductsTabCard
        v-for="(tab, index) in section.tabs"
        :key="tab.key"
        :tab="tab"
        :label-error="errors[`selected_products.tabs.${index}.label`]"
        :products-error="errors[`selected_products.tabs.${index}.product_inventory_ids`]"
        :can-remove="section.tabs.length > 1"
        @remove="removeTab(index)"
      />
    </div>

    <button
      type="button"
      class="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-background px-4 py-3 text-sm font-medium text-muted transition-colors hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700"
      @click="addTab"
    >
      <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
      </svg>
      افزودن تب جدید
    </button>

    <div class="mt-4 rounded-lg bg-background px-4 py-3">
      <p class="mb-2 text-xs font-medium text-muted">پیش‌نمایش تب‌ها در صفحه اصلی</p>
      <div class="no-scrollbar flex items-center gap-1.5 overflow-x-auto pb-1">
        <span
          v-for="(tab, index) in section.tabs"
          :key="tab.key"
          class="shrink-0 rounded-full px-3 py-1 text-xs transition-colors"
          :class="index === 0
            ? 'bg-primary-900 font-semibold text-white'
            : 'bg-primary-100 font-medium text-text'"
        >
          {{ tab.label || 'تب بدون عنوان' }}
        </span>
      </div>
    </div>
  </AdminSettingsHomePageSettingsSection>
</template>

<script setup>
import {
  SELECTED_PRODUCTS_SECTION_TITLE,
  createSelectedProductTab,
} from '~/composables/useHomePageSettings'

const props = defineProps({
  section: {
    type: Object,
    required: true,
  },
  errors: {
    type: Object,
    default: () => ({}),
  },
})

const sectionTitle = SELECTED_PRODUCTS_SECTION_TITLE

const tabsError = computed(() => props.errors.selected_products_tabs ?? '')

function addTab() {
  props.section.tabs.push(createSelectedProductTab('تب جدید'))
}

function removeTab(index) {
  if (props.section.tabs.length <= 1) {
    return
  }

  props.section.tabs.splice(index, 1)
}
</script>
