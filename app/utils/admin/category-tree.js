/**
 * Build a nested tree from a flat category list (parent_id relationship).
 */
export function buildCategoryTree(categories) {
  if (!categories?.length) {
    return []
  }

  const map = new Map()
  const roots = []

  categories.forEach((category) => {
    map.set(category.id, { ...category, children: [] })
  })

  categories.forEach((category) => {
    const node = map.get(category.id)

    if (category.parent_id && map.has(category.parent_id)) {
      map.get(category.parent_id).children.push(node)
    } else {
      roots.push(node)
    }
  })

  return roots
}
