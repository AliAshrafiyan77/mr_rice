export const ProductUnit = Object.freeze({
  GRAM: 1,
  KILOGRAM: 2,
  TON: 3,
})

export const ProductUnitLabel = Object.freeze({
  [ProductUnit.GRAM]: 'گرم',
  [ProductUnit.KILOGRAM]: 'کیلوگرم',
  [ProductUnit.TON]: 'تن',
})

export const ProductUnitOptions = [
  {
    value: ProductUnit.GRAM,
    label: ProductUnitLabel[ProductUnit.GRAM],
  },
  {
    value: ProductUnit.KILOGRAM,
    label: ProductUnitLabel[ProductUnit.KILOGRAM],
  },
  {
    value: ProductUnit.TON,
    label: ProductUnitLabel[ProductUnit.TON],
  },
]