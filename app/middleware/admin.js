export default defineNuxtRouteMiddleware(async (to) => {
  if (import.meta.server) return;
  const authStore = useAuthStore();

  if (!authStore.user) {
    return navigateTo("/auth/login");
  } else if (authStore.user.is_admin != 1) {
    return navigateTo("/404");
  }
});
