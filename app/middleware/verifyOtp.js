export default defineNuxtRouteMiddleware((to) => {
    if (import.meta.server) return;

    const key = to.query.key;
    const expiresAt = Number(localStorage.getItem('otpExpiresAt'));

    // Missing key
    if (!key) {
        return navigateTo('/auth/register');
    }

    // Missing timer
    if (!expiresAt) {
        return navigateTo('/auth/register');
    }

    // OTP expired
    if (Date.now() > expiresAt) {
        localStorage.removeItem('otpExpiresAt');
        return navigateTo('/auth/register');
    }
});