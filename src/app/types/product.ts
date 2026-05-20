export type ProductCategory = 'joints' | 'weight-loss' | 'anti-age'

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
  category: ProductCategory
  description: string
  composition: string[]
  variants: ProductVariant[]
  isAvailable: boolean
}
