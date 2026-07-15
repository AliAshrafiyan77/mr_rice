import { useAuth } from "@/composables/useAuth";

export default defineNuxtRouteMiddleware(async () => {
  if (import.meta.server) return;
  const auth = useAuth();
  const authStore = useAuthStore();

  try {
    const response = await auth.user();

    if (response.status) {
      authStore.setUser(response.user);
    } else if (!response.status) {
      return navigateTo("/auth/login");
    }
  } catch (error) {
    console.error("Error while checking login status:", error);
    return navigateTo("/auth/login");
  }
});
