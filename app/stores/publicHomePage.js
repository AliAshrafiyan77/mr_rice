import { defineStore } from 'pinia'
import { normalizePublicHomePage } from '~/composables/usePublicHomePage'

const PUBLIC_HOME_PAGE_ENDPOINT = '/api/home-page'

export const usePublicHomePageStore = defineStore('publicHomePage', {
  state: () => ({
    featuredProduct: null,
    pillars: [],
    selectedProductsSection: {
      title: 'محصولات منتخب آتلیه مستر رایس',
      tabs: [],
    },
    loaded: false,
  }),

  actions: {
    async fetchHomePage() {
      const { get } = useApi()

      try {
        const response = await get(PUBLIC_HOME_PAGE_ENDPOINT)

        if (response?.status) {
          const data = normalizePublicHomePage(response)
          this.featuredProduct = data.featuredProduct
          this.pillars = data.pillars
          this.selectedProductsSection = data.selectedProductsSection
          this.loaded = true
          return data
        }

        this.loaded = false
        return normalizePublicHomePage()
      } catch (error) {
        this.loaded = false
        throw error
      }
    },
  },
})
