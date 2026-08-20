import { defineStore } from "pinia";
import { useApi } from "#imports";

export const useCategoryStore = defineStore("category", {
  state: () => ({
    categories: [],
    categoriesSimple: []
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
    },
    async fetchCategorySimpleList(){
      try {
        const { get } = useApi();
        const response = await get('/api/admin/category-simple-list', {
          method: 'GET',
        });
        
        if (response.status) {
          this.categoriesSimple = response.categories;
        } else {
          this.categoriesSimple = [];
        }
      } catch (error) {
        this.categoriesSimple = [];
        console.error('Error fetching category simple list:', error);
      }
    }
  }
});