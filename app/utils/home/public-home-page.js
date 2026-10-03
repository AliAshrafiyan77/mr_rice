import { buildProductDetailPath, resolveBackendAssetUrl } from '~/composables/useTools'

export function mapApiProductToCard(product = {}) {
  const slug = product.slug ?? null
  const sku = product.sku ?? null

  return {
    id: product.id,
    title: product.title ?? '',
    image: resolveBackendAssetUrl(product.image ?? ''),
    price: product.price_label ?? product.price ?? '',
    origin: product.origin ?? '',
    badge: product.badge ?? 'مستر رایس',
    badgeClass: product.badge_class ?? 'bg-primary-200/80 text-primary-900',
    slug,
    sku,
    detailPath: buildProductDetailPath(slug, sku),
  }
}

export function normalizePublicHomePage(response = {}) {
  const homePage = response?.home_page ?? response ?? {}

  return {
    featuredProduct: homePage.featured_product ?? null,
    pillars: Array.isArray(homePage.pillars) ? homePage.pillars : [],
    selectedProductsSection: homePage.selected_products_section ?? {
      title: 'محصولات منتخب آتلیه مستر رایس',
      tabs: [],
    },
  }
}
