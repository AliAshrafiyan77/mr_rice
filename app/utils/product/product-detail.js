import { getProductDetailBySlug, mockProductDetail } from '~/data/product-detail'
import { resolveBackendAssetUrl } from '~/composables/useTools'

export function mergeProductDetailFromApi(staticProduct, apiVariation) {
  if (!apiVariation) {
    return staticProduct
  }

  const product = apiVariation.product ?? {}
  const info = product.info ?? {}
  const galleries = Array.isArray(apiVariation.galleries) ? apiVariation.galleries : []
  const galleryImages = galleries
    .filter((item) => item?.url)
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
    .map((item, index) => ({
      src: resolveBackendAssetUrl(item.url),
      alt: product.title ?? staticProduct.gallery?.mainAlt ?? 'تصویر محصول',
      label: index === 0 ? 'نمای اصلی' : `تصویر ${index + 1}`,
    }))

  const mergedGallery = galleryImages.length
    ? {
        ...staticProduct.gallery,
        mainAlt: product.title ?? staticProduct.gallery.mainAlt,
        images: galleryImages,
      }
    : staticProduct.gallery

  const breadcrumbs = [...(staticProduct.breadcrumbs ?? [])]
  if (breadcrumbs.length && product.title) {
    breadcrumbs[breadcrumbs.length - 1] = { label: product.title }
  }

  const weightText = apiVariation.weight != null
    ? String(apiVariation.weight).replace(/\.0+$/, '').replace(/\.$/, '')
    : null

  return {
    ...staticProduct,
    slug: staticProduct.slug,
    sku: apiVariation.sku ?? staticProduct.sku,
    agriculturalId: apiVariation.sku ?? staticProduct.agriculturalId,
    title: product.title ?? staticProduct.title,
    description: info.description ?? staticProduct.description,
    packagingWeight: weightText ?? staticProduct.packagingWeight,
    packagingWeightUnit: product.unit_label ?? staticProduct.packagingWeightUnit,
    packagingDescription: weightText
      ? `بسته‌بندی ${weightText} ${product.unit_label ?? 'کیلوگرم'}`
      : staticProduct.packagingDescription,
    breadcrumbs,
    gallery: mergedGallery,
  }
}

export function getStaticProductDetail(slug) {
  if (slug && mockProductDetail.slug === slug) {
    return mockProductDetail
  }

  return getProductDetailBySlug(slug)
}

export async function fetchProductVariation({ slug, sku }) {
  const { get } = useApi()
  const safeSlug = encodeURIComponent(String(slug ?? '').trim())
  const safeSku = encodeURIComponent(String(sku ?? '').trim())

  const response = await get(`/api/products/${safeSku}?slug=${safeSlug}`)

  if (!response?.status || !response?.productVariation) {
    throw createError({
      statusCode: 404,
      statusMessage: 'محصول پیدا نشد',
    })
  }

  return response.productVariation
}
