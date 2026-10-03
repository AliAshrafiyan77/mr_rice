import { normalizeProductVariationList } from '~/utils/admin/product-variation-label'

export const SELECTED_PRODUCTS_MAX = 6

export const SELECTED_PRODUCTS_SECTION_TITLE = 'محصولات منتخب آتلیه مستر رایس'

export const DEFAULT_SELECTED_PRODUCT_TABS = [
  { key: 'tab_all', label: 'همه محصولات' },
  { key: 'tab_rice', label: 'برنج طارم و هاشمی' },
  { key: 'tab_pulses', label: 'حبوبات سورت‌شده' },
  { key: 'tab_packs', label: 'پک‌های سازمانی و هدیه' },
]

function createTabFromDefaults({ key, label }) {
  return {
    key,
    label,
    product_variation_ids: [],
    product_variations: [],
  }
}

export function createSelectedProductTab(label = '') {
  return createTabFromDefaults({
    key: `tab_${Date.now()}`,
    label,
  })
}

export function createPillar(category = null) {
  const categoryId = category?.id ?? null

  return {
    key: categoryId ? `category_${categoryId}` : `pillar_${Date.now()}`,
    type: 'products',
    label: category?.title ?? 'رکن جدید',
    category_id: categoryId,
    max_products: 2,
    product_variation_id: null,
    product_variation_ids: [],
    product_variations: [],
  }
}

export function createDefaultForm() {
  return {
    featured_product_variation_id: null,
    featured_product_variation: null,
    pillars: [],
    selected_products_section: {
      tabs: DEFAULT_SELECTED_PRODUCT_TABS.map(createTabFromDefaults),
    },
  }
}

export function mapSettingsToForm(settings = {}) {
  const form = createDefaultForm()

  const featured = normalizeProductVariationList([
    settings.featured_product_variation ?? settings.featured_product_variation_id,
  ])[0]

  form.featured_product_variation_id = featured?.id ?? settings.featured_product_variation_id ?? null
  form.featured_product_variation = featured ?? null

  if (Array.isArray(settings.pillars) && settings.pillars.length) {
    form.pillars = settings.pillars.map((pillar) => {
      const variations = normalizeProductVariationList(
        pillar.product_variations ?? pillar.inventories,
      )
      const variationIds = Array.isArray(pillar.product_variation_ids) && pillar.product_variation_ids.length
        ? [...pillar.product_variation_ids]
        : variations.map((item) => item.id)

      return {
        key: pillar.key,
        type: pillar.type ?? 'products',
        label: pillar.label ?? '',
        category_id: pillar.category_id ?? null,
        max_products: pillar.max_products ?? (pillar.type === 'parent_with_variations' ? 1 : 2),
        product_variation_id: pillar.product_variation_id ?? variations[0]?.id ?? null,
        product_variation_ids: pillar.type === 'products' ? variationIds : [],
        product_variations: variations,
      }
    })
  }

  const section = settings.selected_products_section ?? {}

  if (Array.isArray(section.tabs) && section.tabs.length) {
    form.selected_products_section = {
      tabs: section.tabs.map((tab, index) => {
        const defaults = DEFAULT_SELECTED_PRODUCT_TABS[index]
        const variations = normalizeProductVariationList(
          tab.product_variations ?? tab.inventories ?? tab.product_variation_ids,
        )

        return {
          key: tab.key ?? defaults?.key ?? `tab_${index}`,
          label: tab.label ?? defaults?.label ?? '',
          product_variation_ids: variations.map((item) => item.id),
          product_variations: variations,
        }
      }),
    }
  }

  return form
}

export function buildSettingsPayload(form) {
  return {
    featured_product_variation_id: form.featured_product_variation_id,
    pillars: (form.pillars ?? []).map((pillar) => {
      const base = {
        key: pillar.key,
        type: pillar.type,
        label: pillar.label,
        category_id: pillar.category_id,
        max_products: pillar.max_products ?? (pillar.type === 'parent_with_variations' ? 1 : 2),
      }

      if (pillar.type === 'parent_with_variations') {
        return {
          ...base,
          product_variation_id: pillar.product_variation_id,
        }
      }

      return {
        ...base,
        product_variation_ids: pillar.product_variation_ids ?? [],
      }
    }),
    selected_products_section: {
      title: SELECTED_PRODUCTS_SECTION_TITLE,
      tabs: (form.selected_products_section.tabs ?? []).map((tab) => ({
        key: tab.key,
        label: tab.label,
        product_variation_ids: tab.product_variation_ids ?? [],
      })),
    },
  }
}

export function validateHomePageSettings(form) {
  const errors = {}

  if (!form.featured_product_variation_id) {
    errors.featured_product_variation_id = 'کالای شاخص صفحه اصلی را انتخاب کنید.'
  }

  const pillars = form.pillars ?? []

  if (!pillars.length) {
    errors.pillars = 'حداقل یک رکن فروشگاه اضافه کنید.'
  }

  pillars.forEach((pillar, index) => {
    if (!pillar.category_id) {
      errors[`pillars.${index}.category_id`] = 'دسته‌بندی این رکن الزامی است.'
    }

    if (!pillar.label?.trim()) {
      errors[`pillars.${index}.label`] = 'عنوان رکن الزامی است.'
    }

    if (pillar.type === 'parent_with_variations' && !pillar.product_variation_id) {
      errors[`pillars.${index}.product_variation_id`] = 'یک کالا برای این رکن انتخاب کنید (بقیه وزن‌های محصول مادر خودکار نمایش داده می‌شوند).'
    }

    if (pillar.type === 'products') {
      const count = pillar.product_variation_ids?.length ?? 0
      const max = pillar.max_products ?? 2

      if (count === 0) {
        errors[`pillars.${index}.product_variation_ids`] = 'حداقل یک کالا برای این رکن انتخاب کنید.'
      }

      if (count > max) {
        errors[`pillars.${index}.product_variation_ids`] = `حداکثر ${max} کالا برای این رکن مجاز است.`
      }
    }
  })

  const tabs = form.selected_products_section.tabs ?? []

  if (!tabs.length) {
    errors.selected_products_tabs = 'حداقل یک تب برای بخش محصولات منتخب اضافه کنید.'
  }

  tabs.forEach((tab, index) => {
    const label = tab.label?.trim()

    if (!label) {
      errors[`selected_products.tabs.${index}.label`] = 'عنوان تب الزامی است.'
    }

    const selectedCount = tab.product_variation_ids?.length ?? 0

    if (selectedCount === 0) {
      errors[`selected_products.tabs.${index}.product_variation_ids`] = 'حداقل یک کالا برای این تب انتخاب کنید.'
    }

    if (selectedCount > SELECTED_PRODUCTS_MAX) {
      errors[`selected_products.tabs.${index}.product_variation_ids`] = `حداکثر ${SELECTED_PRODUCTS_MAX} کالا برای هر تب مجاز است.`
    }
  })

  return errors
}

export function useHomePageSettingsForm() {
  const form = reactive(createDefaultForm())
  const errors = ref({})
  const generalError = ref('')
  const submitting = ref(false)
  const loading = ref(false)

  const homePageSettingsStore = useHomePageSettingsStore()

  const hasErrors = computed(() => Object.keys(errors.value).length > 0)

  async function loadSettings() {
    loading.value = true
    generalError.value = ''
    errors.value = {}

    try {
      const data = await homePageSettingsStore.fetchSettings()
      Object.assign(form, mapSettingsToForm(data))
    } catch (error) {
      if (error?.statusCode === 404 || error?.status === 404) {
        Object.assign(form, createDefaultForm())
      } else {
        generalError.value = 'بارگذاری تنظیمات با خطا مواجه شد.'
      }
    } finally {
      loading.value = false
    }
  }

  async function saveSettings() {
    submitting.value = true
    errors.value = {}
    generalError.value = ''

    const clientErrors = validateHomePageSettings(form)
    if (Object.keys(clientErrors).length) {
      errors.value = clientErrors
      submitting.value = false
      return false
    }

    const payload = buildSettingsPayload(form)

    try {
      const response = await homePageSettingsStore.saveSettings(payload)

      if (response?.settings) {
        Object.assign(form, mapSettingsToForm(response.settings))
      }

      return true
    } catch (error) {
      const validationErrors = error?.data?.error?.errors

      if (validationErrors) {
        errors.value = validationErrors
      } else {
        generalError.value = 'ذخیره تنظیمات با خطا مواجه شد.'
      }

      return false
    } finally {
      submitting.value = false
    }
  }

  return {
    form,
    errors,
    generalError,
    submitting,
    loading,
    hasErrors,
    loadSettings,
    saveSettings,
  }
}
