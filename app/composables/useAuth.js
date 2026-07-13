export const useAuth = () => {
    const { $api } = useNuxtApp()

    const csrf = () => $api('/sanctum/csrf-cookie')

    const register = async (payload) => {
        await csrf()

        return $api('/api/register', {
            method: 'POST',
            body: payload
        })
    }

    const verifyOtp = async (payload) => {
        return $api('/api/register/verify-otp', {
            method: 'POST',
            body: payload
        })
    }

    const user = () => $api('/api/user')

    const logout = async () => {
        await csrf()

        return $api('/api/logout', {
            method: 'POST'
        })
    }

    const loginWithPassword = async (payload) => {
    
        await csrf();

        return $api('/api/login/password', {
            method: 'POST',
            body: payload
        })
    }

    return {
        register,
        verifyOtp,
        user,
        logout,
        loginWithPassword
    }
}