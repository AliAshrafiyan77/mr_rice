<template>
  <div>
    <div class="mb-6 flex items-center gap-3">
      <NuxtLink
        to="/admin"
        class="rounded-lg p-2 text-muted transition-colors hover:bg-surface"
      >
        <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </NuxtLink>
      <div>
        <h1 class="text-xl font-bold text-text">تنظیمات صفحه اصلی</h1>
        <p class="mt-1 text-sm text-muted">
          محصول شاخص، رکن‌های فروشگاه و بخش محصولات منتخب را مدیریت کنید.
        </p>
      </div>
    </div>

    <div v-if="loading" class="flex items-center justify-center py-16 text-sm text-muted">
      در حال بارگذاری تنظیمات...
    </div>

    <form v-else class="space-y-6" @submit.prevent="handleSubmit">
      <AdminSettingsHomePageFeaturedProductField
        v-model="form.featured_product_inventory_id"
        v-model:selected-inventory="form.featured_product_inventory"
        :error="errors.featured_product_inventory_id"
      />

      <AdminSettingsHomePageStorePillarsSection
        :pillars="form.pillars"
        :errors="errors"
      />

      <AdminSettingsHomePageSelectedProductsSection
        :section="form.selected_products_section"
        :errors="errors"
      />

      <div
        v-if="generalError"
        class="rounded-lg bg-danger/10 px-4 py-3 text-sm text-danger"
      >
        {{ generalError }}
      </div>

      <div
        v-if="successMessage"
        class="rounded-lg bg-success/10 px-4 py-3 text-sm text-success"
      >
        {{ successMessage }}
      </div>

      <div class="flex items-center gap-3 border-t border-border pt-4">
        <button
          type="submit"
          :disabled="submitting"
          class="rounded-lg bg-primary-400 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {{ submitting ? 'در حال ذخیره...' : 'ذخیره تنظیمات' }}
        </button>
        <button
          type="button"
          :disabled="submitting"
          class="rounded-lg px-5 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-background"
          @click="resetForm"
        >
          بازنشانی فرم
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import {
  createDefaultForm,
  useHomePageSettingsForm,
} from '~/composables/useHomePageSettings'

definePageMeta({
  layout: 'admin',
  middleware: ['auth', 'admin'],
})

const {
  form,
  errors,
  generalError,
  submitting,
  loading,
  loadSettings,
  saveSettings,
} = useHomePageSettingsForm()

const successMessage = ref('')

async function handleSubmit() {
  successMessage.value = ''
  const saved = await saveSettings()

  if (saved) {
    successMessage.value = 'تنظیمات صفحه اصلی با موفقیت ذخیره شد.'
  }
}

function resetForm() {
  Object.assign(form, createDefaultForm())
  errors.value = {}
  generalError.value = ''
  successMessage.value = ''
}

onMounted(async () => {
  await loadSettings()
})
</script>
