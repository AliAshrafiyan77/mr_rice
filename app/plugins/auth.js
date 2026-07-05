import { useAuthStore } from "#imports";
import { useAuth } from "@/composables/useAuth";

export default defineNuxtPlugin(async () => {
  const auth = useAuth();
  const authStore = useAuthStore();

  try {
    const response = await auth.user();
    
    if (response.status) {
        authStore.setUser(response.user);
    }
  } catch (e) {
    console.log(e);
  }
});
