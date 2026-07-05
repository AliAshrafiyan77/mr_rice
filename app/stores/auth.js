import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const isAuthenticated = computed(() => !!user.value)

  function setUser(data) {
    user.value = data
  }

  function logout() {
    user.value = null
  }

  return {
    user,
    isAuthenticated,
    setUser,
    logout,
  }
})