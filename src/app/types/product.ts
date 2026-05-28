export type ProductCategory =
  | 'energy-recovery'
  | 'joints'
  | 'anti-age'
  | 'weight-control'
  | 'beauty-health'

export type ProductCategoryOption = {
  id: 'all' | ProductCategory
  label: string
}

export type ProductVariant = {
  id: string
  label: string
  dosage: string
  price: number
}

export type Product = {
  id: string
  slug: string
  title: string
  subtitle: string
  image: string
  categories: ProductCategory[]
  isAvailable: boolean
  description: string
  mainEffects: string[]
  composition?: string[]
  variants: ProductVariant[]
}
