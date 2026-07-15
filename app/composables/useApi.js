export const useApi = () => {
    const { $api } = useNuxtApp()

    const csrf = () => $api('/sanctum/csrf-cookie')

    async function request(method, url, body = null) {
        const httpMethod = method.toUpperCase()

        const mutatingMethods = ['POST', 'PUT', 'PATCH', 'DELETE']

        try {
            if (mutatingMethods.includes(httpMethod)) {
                await csrf()
            }

            return await $api(url, {
                method: httpMethod,
                body,
            })
        } catch (error) {
            throw error
        }
    }

    const get = (url) => request('GET', url)
    const post = (url, body) => request('POST', url, body)
    const put = (url, body) => request('PUT', url, body)
    const patch = (url, body) => request('PATCH', url, body)
    const destroy = (url) => request('DELETE', url)

    return {
        request,
        get,
        post,
        put,
        patch,
        destroy,
    }
}