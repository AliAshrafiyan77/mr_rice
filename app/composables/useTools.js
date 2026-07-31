export function useTools() {

    const formatNumber = (value) => {
        if (value === null || value === undefined || value === '') return '0'
        return new Intl.NumberFormat('en-US').format(value)
    };

    const toJalali = (dateString, options = {}) => {
        if (!dateString) return '-'
        const date = new Date(dateString)
        return new Intl.DateTimeFormat('fa-IR', {
            calendar: 'persian',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            ...options,
        }).format(date)
    };

    const toJalaliWithTime = (dateString) => {
        return toJalali(dateString, { hour: '2-digit', minute: '2-digit' })
    };

    return { formatNumber, toJalali, toJalaliWithTime };
}