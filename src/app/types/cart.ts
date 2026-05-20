export type ContactMethod = 'telegram' | 'max' | 'vk' | 'whatsapp'

export type CartItem = {
  productId: string
  variantId: string
  quantity: number
}

export type OrderFormData = {
  name: string
  phone: string
  contactMethod: ContactMethod
  socialLink: string
}
