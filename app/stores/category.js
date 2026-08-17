import { defineStore } from "pinia";
import { useApi } from "#imports";

export const useCategoryStore = defineStore("category", {
  state: () => ({
    categories: []
  }),

  actions: {
    async fetchCategories() {
      try {
        const { get } = useApi();
        const response = await get('/api/admin/category', {
          method: 'GET',
        });
        
        if (response.status) {
          this.categories = response.categories;
        } else {
          this.categories = [];
        }
      } catch (error) {
        this.categories = [];
        console.error('Error fetching categories:', error);
      }
    }
  }
});