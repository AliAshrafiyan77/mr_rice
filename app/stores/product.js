import { defineStore } from "pinia";
import { useApi } from "#imports";

export const useProductStore = defineStore("product", {
  state: () => ({
    simpleProducts: [],
  }),

  actions: {
    async fetchSimpleProducts() {
      try {
        const { get } = useApi();
        const response = await get('/api/admin/product/simple', {
          method: 'GET',
        });
        
        if (response.status) {
          this.simpleProducts = response.products;
        } else {
          this.simpleProducts = [];
        }
      } catch (error) {
        this.simpleProducts = [];
        console.error('Error fetching simpleProducts:', error);
      }
    },

  }
});