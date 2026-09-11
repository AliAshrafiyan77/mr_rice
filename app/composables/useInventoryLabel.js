export function formatInventoryLabel(item = {}) {
  if (item.label) {
    return item.label
  }

  const title = item.title ?? 'کالا'
  const weight = item.weight != null
    ? String(item.weight).replace(/\.0+$/, '').replace(/\.$/, '')
    : null

  if (weight) {
    return `${title} — ${weight} کیلو`
  }

  return title
}

export function normalizeInventoryOption(item) {
  if (!item) {
    return null
  }

  if (typeof item === 'object') {
    const id = item.id ?? item.value

    if (!id) {
      return null
    }

    return {
      id,
      title: item.title ?? item.label ?? String(id),
      label: formatInventoryLabel(item),
      weight: item.weight ?? null,
      product_id: item.product_id ?? null,
      category_id: item.category_id ?? null,
    }
  }

  return { id: item, title: String(item), label: String(item) }
}

export function normalizeInventoryList(items) {
  if (!Array.isArray(items)) {
    return []
  }

  return items.map(normalizeInventoryOption).filter(Boolean)
}
