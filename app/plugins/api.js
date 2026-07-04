export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig()

    const api = $fetch.create({
        baseURL: config.public.baseUrl,

        credentials: 'include',

        async onRequest({ options }) {
            const token = useCookie('XSRF-TOKEN').value

            if (token) {
                options.headers = {
                    ...options.headers,
                    'X-XSRF-TOKEN': decodeURIComponent(token),
                    Accept: 'application/json',
                }
            }
        }
    })

    return {
        provide: {
            api
        }
    }
})