export type ProductCategory =
  | 'energy-recovery'
  | 'joints'
  | 'anti-age'
  | 'weight-control'
  | 'beauty-health'
  | 'neuropeptides'

export type ProductType = 'vial' | 'spray' | 'stick' | 'tabs'

export type ProductKind = 'mix' | 'single'

export type ProductCategoryOption = {
  id: 'all' | ProductCategory
  label: string
}

export type ProductTypeOption = {
  id: 'all' | ProductType
  label: string
}

export type ProductKindOption = {
  id: 'all' | ProductKind
  label: string
}

export type ProductVariant = {
  id: string
  label: string
  dosage: string
  price: number
  type: ProductType
  image?: string
}

export type Product = {
  id: string
  slug: string
  title: string
  ruTitle: string
  subtitle: string
  image: string

  categories: ProductCategory[]

  kind: ProductKind

  isAvailable: boolean
  description: string
  mainEffects: string[]
  dontRecomend?: string[]
  warning?: string[]
  danger?: string[]
  composition?: string[]
  relatedProductIds: string[]
  variants: ProductVariant[]
}
