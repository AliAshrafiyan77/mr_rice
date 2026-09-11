import { defineStore } from 'pinia'
import { useApi } from '#imports'

const SETTINGS_ENDPOINT = '/api/admin/settings/home-page'

export const useHomePageSettingsStore = defineStore('homePageSettings', {
  state: () => ({
    settings: null,
    loaded: false,
  }),

  actions: {
    async fetchSettings() {
      const { get } = useApi()

      try {
        const response = await get(SETTINGS_ENDPOINT)

        if (response?.status) {
          this.settings = response.settings ?? response.data ?? null
          this.loaded = true
          return this.settings
        }

        this.settings = null
        this.loaded = false
        return null
      } catch (error) {
        this.settings = null
        this.loaded = false
        throw error
      }
    },

    async saveSettings(payload) {
      const { put } = useApi()
      const response = await put(SETTINGS_ENDPOINT, payload)

      if (response?.status) {
        this.settings = response.settings ?? payload
        this.loaded = true
      }

      return response
    },
  },
})
