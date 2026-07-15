import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const isAuthenticated = computed(() => !!user.value);

  function setUser(data) {
    user.value = data;
  }

  function logout() {
    user.value = null;
  }

  function reset() {
    user.value = null;
    isAuthenticated.value = false;
  }

  return {
    user,
    isAuthenticated,
    setUser,
    logout,
    reset
  };
});
