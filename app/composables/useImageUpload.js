// type:1 = پوستر (تصویر اصلی)، type:2 = گالری
export const GALLERY_TYPE_POSTER = 1
export const GALLERY_TYPE_GALLERY = 2

export function buildUploadMeta(uploadType, entityId) {
  return {
    purpose: 'image',
    upload_type: uploadType,
    ...(entityId ? { entity_id: String(entityId) } : {}),
  }
}

export function assignTypes(files) {
  return files.map((file, index) => ({
    ...file,
    type: index === 0 ? GALLERY_TYPE_POSTER : GALLERY_TYPE_GALLERY,
  }))
}

export function assignSortOrder(files) {
  return files.map((file, index) => ({
    ...file,
    sort_order: index,
  }))
}

export function reorderFiles(files, fromIndex, toIndex) {
  if (fromIndex === toIndex || fromIndex < 0 || toIndex < 0) {
    return [...files]
  }

  const result = [...files]
  const [moved] = result.splice(fromIndex, 1)
  result.splice(toIndex, 0, moved)

  return result
}

export function normalizeUploadedFile(uploaded) {
  if (!uploaded) {
    return null
  }

  const relativePath = uploaded.stored_name || uploaded.path?.replace(/^uploads\//, '') || ''

  return {
    id: uploaded.id,
    filename: relativePath,
    stored_name: relativePath,
    path: uploaded.path || `uploads/${relativePath}`,
    url: uploaded.url,
    purpose: uploaded.purpose || 'image',
  }
}

export function toUploadedPayload(files) {
  const withOrder = assignSortOrder(assignTypes(files))

  return withOrder.map((file) => ({
    filename: file.filename || file.stored_name,
    stored_name: file.stored_name || file.filename,
    path: file.path,
    url: file.url,
    type: file.type,
    sort_order: file.sort_order,
  }))
}

export function resolveImageUploadEndpoint(baseUrl) {
  const normalizedBase = (baseUrl || '').replace(/\/$/, '')

  if (!normalizedBase) {
    throw new Error('BASE_URL در تنظیمات Nuxt تعریف نشده است')
  }

  return `${normalizedBase}/api/admin/upload-images`
}

export function toRelativeFilename(pathOrStoredName) {
  if (!pathOrStoredName) {
    return ''
  }

  return pathOrStoredName.replace(/^uploads\//, '')
}

export function useImageUpload() {
  const config = useRuntimeConfig()

  return {
    buildUploadMeta,
    assignTypes,
    assignSortOrder,
    reorderFiles,
    normalizeUploadedFile,
    toUploadedPayload,
    toRelativeFilename,
    resolveEndpoint: () => resolveImageUploadEndpoint(config.public.baseUrl),
    GALLERY_TYPE_POSTER,
    GALLERY_TYPE_GALLERY,
  }
}
