export function mapApiProductToCard(product = {}) {
  return {
    id: product.id,
    title: product.title ?? '',
    image: product.image ?? '',
    price: product.price_label ?? product.price ?? '',
    origin: product.origin ?? '',
    badge: product.badge ?? 'مستر رایس',
    badgeClass: product.badge_class ?? 'bg-primary-200/80 text-primary-900',
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

export function findPillarByKey(pillars, key) {
  if (!Array.isArray(pillars)) {
    return null
  }

  return pillars.find((pillar) => pillar.key === key) ?? null
}

export function usePublicHomePage() {
  const { get } = useApi()

  async function fetchHomePage() {
    const response = await get('/api/home-page')

    if (!response?.status) {
      return normalizePublicHomePage()
    }

    return normalizePublicHomePage(response)
  }

  return {
    fetchHomePage,
    mapApiProductToCard,
    normalizePublicHomePage,
    findPillarByKey,
  }
}
