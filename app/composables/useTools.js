const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']

export function toPersianDigits(value) {
  return String(value).replace(/\d/g, (d) => PERSIAN_DIGITS[Number(d)] ?? d)
}

export function buildProductDetailPath(slug, sku) {
  const normalizedSlug = String(slug ?? '').trim()
  const normalizedSku = String(sku ?? '').trim()

  if (!normalizedSlug || !normalizedSku) {
    return null
  }

  return `/products/${normalizedSlug}/${encodeURIComponent(normalizedSku)}`
}

/** Turn /storage/... or relative paths into absolute backend URLs for img src. */
export function resolveBackendAssetUrl(url) {
  if (!url) {
    return url
  }

  const value = String(url).trim()

  if (/^https?:\/\//i.test(value)) {
    return value
  }

  const config = useRuntimeConfig()
  const base = String(config.public.baseUrl ?? '').replace(/\/$/, '')

  if (!base) {
    return value
  }

  const path = value.startsWith('/') ? value : `/${value}`

  return `${base}${path}`
}

export function useTools() {
  const formatNumber = (value) => {
    if (value === null || value === undefined || value === '') return '0'
    return new Intl.NumberFormat('en-US').format(value)
  }
  const unformatNumber = (value) => {
    if (value === null || value === undefined || value === '') return '0'
    return value.replace(/,/g, '')
  }

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
  }

  const toJalaliWithTime = (dateString) => {
    return toJalali(dateString, { hour: '2-digit', minute: '2-digit' })
  }

  return {
    formatNumber,
    toJalali,
    toJalaliWithTime,
    unformatNumber,
    toPersianDigits,
    buildProductDetailPath,
    resolveBackendAssetUrl,
  }
}
