'use client'

import Image from 'next/image'
import { type FormEvent, useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { HelpCircle, X } from 'lucide-react'
import { products, promoCodes } from '@/app/data/products'
import toast from 'react-hot-toast'
import type { ContactMethod, OrderFormData } from '@/app/types/cart'
import styles from './CartModal.module.scss'
import { useCartStore } from '@/app/store/cartStore'

type CartModalProps = {
  isOpen: boolean
  onClose: () => void
}

const ANIMATION_DURATION = 320

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const { items, removeItem, incrementItem, decrementItem, clearCart } = useCartStore()

  const [isMounted, setIsMounted] = useState(isOpen)
  const [isClosing, setIsClosing] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [promoValue, setPromoValue] = useState('')
  const [appliedPromo, setAppliedPromo] = useState<(typeof promoCodes)[number] | null>(null)

  const [formData, setFormData] = useState<OrderFormData>({
    name: '',
    phone: '',
    contactMethod: 'telegram',
    socialLink: '',
  })

  const handleClose = () => {
    setIsClosing(true)

    window.setTimeout(() => {
      setIsMounted(false)
      setIsClosing(false)
      onClose()
    }, ANIMATION_DURATION)
  }

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true)
      setIsClosing(false)
    }
  }, [isOpen])

  useEffect(() => {
    if (!isMounted) return

    const htmlOverflow = document.documentElement.style.overflow
    const bodyOverflow = document.body.style.overflow

    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') handleClose()
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.documentElement.style.overflow = htmlOverflow
      document.body.style.overflow = bodyOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isMounted])

  const cartItems = useMemo(() => {
    return items
      .map((item) => {
        const product = products.find((product) => product.id === item.productId)
        const variant = product?.variants.find((variant) => variant.id === item.variantId)

        if (!product || !variant) return null

        return {
          ...item,
          product,
          variant,
          total: variant.price * item.quantity,
        }
      })
      .filter(Boolean)
  }, [items])

  const totalPrice = cartItems.reduce((sum, item) => {
    if (!item) return sum
    return sum + item.total
  }, 0)

  const cartDiscountPercent = (() => {
    if (totalPrice >= 60000) return 15
    if (totalPrice >= 40000) return 10
    if (totalPrice >= 20000) return 5
    return 0
  })()

  const cartDiscountAmount = Math.round((totalPrice * cartDiscountPercent) / 100)
  const priceAfterCartDiscount = totalPrice - cartDiscountAmount

  const promoDiscountAmount = appliedPromo
    ? Math.round((priceAfterCartDiscount * appliedPromo.discountPercent) / 100)
    : 0

  const finalPrice = priceAfterCartDiscount - promoDiscountAmount

  const totalQuantity = cartItems.reduce((sum, item) => {
    if (!item) return sum
    return sum + item.quantity
  }, 0)

  const handleApplyPromo = () => {
    const normalizedPromoValue = promoValue.trim().toUpperCase()

    if (!normalizedPromoValue) {
      toast.error('Введите промокод')
      return
    }

    const foundPromo = promoCodes.find((promo) => promo.code.toUpperCase() === normalizedPromoValue)

    if (!foundPromo) {
      setAppliedPromo(null)
      toast.error('Промокод не найден')
      return
    }

    setAppliedPromo(foundPromo)
    setPromoValue(foundPromo.code)

    toast.success(`Промокод применён: скидка ${foundPromo.discountPercent}%`)
  }

  const handleResetCartState = () => {
    clearCart()
    setPromoValue('')
    setAppliedPromo(null)
    setFormData({
      name: '',
      phone: '',
      contactMethod: 'telegram',
      socialLink: '',
    })
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (isSubmitting) return

    setIsSubmitting(true)

    const order = {
      customer: formData,
      discounts: {
        cart: cartDiscountPercent
          ? {
              discountPercent: cartDiscountPercent,
              discountAmount: cartDiscountAmount,
            }
          : null,
        promo: appliedPromo
          ? {
              code: appliedPromo.code,
              discountPercent: appliedPromo.discountPercent,
              discountAmount: promoDiscountAmount,
            }
          : null,
      },
      items: cartItems.map((item) => {
        if (!item) return null

        return {
          productId: item.product.id,
          productTitle: item.product.title,
          variantId: item.variant.id,
          dosage: item.variant.dosage,
          price: item.variant.price,
          quantity: item.quantity,
          total: item.total,
        }
      }),
      totalPrice,
      finalPrice,
      totalQuantity,
    }

    await new Promise((resolve) => setTimeout(resolve, 900))

    console.log('ORDER:', order)

    toast.success('Заказ успешно оформлен. Скоро с вами свяжется менеджер')

    handleResetCartState()

    setIsSubmitting(false)
    handleClose()
  }

  const handleChange = (field: keyof OrderFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const formatPhone = (value: string) => {
    let digits = value.replace(/\D/g, '')

    if (!digits) return ''

    if (digits.startsWith('8')) {
      digits = `7${digits.slice(1)}`
    }

    if (digits.startsWith('7')) {
      digits = digits.slice(1)
    }

    digits = digits.slice(0, 10)

    const code = digits.slice(0, 3)
    const first = digits.slice(3, 6)
    const second = digits.slice(6, 8)
    const third = digits.slice(8, 10)

    let result = '+7'

    if (code) result += ` (${code}`
    if (code.length === 3) result += ')'
    if (first) result += ` ${first}`
    if (second) result += `-${second}`
    if (third) result += `-${third}`

    return result
  }

  if (!isMounted) return null

  return createPortal(
    <div
      className={`${styles.overlay} ${isClosing ? styles.overlayClosing : ''}`}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label="Корзина"
    >
      <aside
        className={`${styles.cart} ${isClosing ? styles.cartClosing : ''}`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.cart__head}>
          <div>
            <p className={styles.cart__label}>Корзина</p>
            <h2>Ваш заказ</h2>
          </div>

          <button
            className={styles.cart__close}
            type="button"
            onClick={handleClose}
            aria-label="Закрыть корзину"
          >
            <X size={24} strokeWidth={2} />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className={styles.cart__empty}>
            <h3>Корзина пуста</h3>
            <p>Добавьте товары из каталога, чтобы оформить заказ.</p>
          </div>
        ) : (
          <div className={styles.cart__content}>
            <div className={styles.cart__layout}>
              <div className={styles.cart__left}>
                <div className={styles.cart__items}>
                  {cartItems.map((item) => {
                    if (!item) return null
                    return (
                      <article className={styles.cart__item} key={item.variant.id}>
                        <div className={styles.cart__imageWrap}>
                          <Image
                            src={item.product.image}
                            alt={item.product.title}
                            width={80}
                            height={80}
                            className={styles.cart__image}
                          />
                        </div>

                        <div className={styles.cart__itemInfo}>
                          <h3>{item.product.title}</h3>
                          <p>{item.variant.dosage}</p>

                          <div className={styles.cart__quantity}>
                            <button
                              type="button"
                              onClick={() => decrementItem(item.product.id, item.variant.id)}
                            >
                              −
                            </button>

                            <span>{item.quantity}</span>

                            <button
                              type="button"
                              onClick={() => incrementItem(item.product.id, item.variant.id)}
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className={styles.cart__itemPrice}>
                          <strong>{item.total.toLocaleString('ru-RU')} ₽</strong>

                          <button
                            type="button"
                            onClick={() => removeItem(item.product.id, item.variant.id)}
                          >
                            Удалить
                          </button>
                        </div>
                      </article>
                    )
                  })}
                </div>

                <button type="button" className={styles.cart__clear} onClick={handleResetCartState}>
                  Очистить корзину
                </button>
              </div>

              <div className={styles.cart__right}>
                <div className={styles.cart__promo}>
                  <label>
                    <span>Промокод</span>

                    <div className={styles.cart__promoRow}>
                      <input
                        type="text"
                        value={promoValue}
                        onChange={(event) => setPromoValue(event.target.value)}
                        placeholder="Введите промокод"
                      />

                      <button type="button" onClick={handleApplyPromo}>
                        Применить
                      </button>
                    </div>
                  </label>

                  {appliedPromo && <p>Скидка {appliedPromo.discountPercent}% применена</p>}
                </div>

                <div className={styles.cart__bottomPanel}>
                  <div className={styles.cart__summary}>
                    <div className={styles.cart__summaryTitle}>
                      <span>Итого</span>

                      <button
                        type="button"
                        className={styles.cart__discountInfo}
                        aria-label="Условия скидки"
                      >
                        <HelpCircle size={16} strokeWidth={2} />

                        <span className={styles.cart__tooltip}>
                          Скидка от суммы корзины:
                          <br />
                          от 20 000 ₽ — 5%,
                          <br />
                          от 40 000 ₽ — 10%,
                          <br />
                          от 60 000 ₽ — 15%.
                          <br />
                          Промокод применяется после неё.
                        </span>
                      </button>
                    </div>

                    <div className={styles.cart__summaryPrice}>
                      {(cartDiscountPercent > 0 || appliedPromo) && (
                        <del>{totalPrice.toLocaleString('ru-RU')} ₽</del>
                      )}

                      <strong>{finalPrice.toLocaleString('ru-RU')} ₽</strong>
                    </div>
                  </div>

                  {(cartDiscountPercent > 0 || appliedPromo) && (
                    <div className={styles.cart__discounts}>
                      {cartDiscountPercent > 0 && (
                        <p>
                          Скидка за сумму заказа: −{cartDiscountPercent}% (
                          {cartDiscountAmount.toLocaleString('ru-RU')} ₽)
                        </p>
                      )}

                      {appliedPromo && (
                        <p>
                          Промокод {appliedPromo.code}: −{appliedPromo.discountPercent}% (
                          {promoDiscountAmount.toLocaleString('ru-RU')} ₽)
                        </p>
                      )}
                    </div>
                  )}

                  <div className={styles.cart__notice}>
                    <p>
                      * Итоговая стоимость и детали заказа подтверждаются менеджером после обработки
                      заявки.
                    </p>
                  </div>
                </div>
              </div>

              <form className={styles.cart__form} onSubmit={handleSubmit}>
                <h3>Оформление заказа</h3>

                <label>
                  <span>Имя*</span>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(event) => handleChange('name', event.target.value)}
                    placeholder="Ваше имя"
                    required
                  />
                </label>

                <label>
                  <span>Номер телефона*</span>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(event) => handleChange('phone', formatPhone(event.target.value))}
                    placeholder="+7 (999) 999-99-99"
                    required
                  />
                </label>

                <label>
                  <span>Предпочтительный способ связи*</span>
                  <select
                    value={formData.contactMethod}
                    onChange={(event) =>
                      handleChange('contactMethod', event.target.value as ContactMethod)
                    }
                  >
                    <option value="telegram">Telegram</option>
                    <option value="max">MAX</option>
                    <option value="vk">ВК</option>
                  </select>
                </label>

                <label>
                  <span>Ссылка на соц.сеть</span>
                  <input
                    type="text"
                    value={formData.socialLink}
                    onChange={(event) => handleChange('socialLink', event.target.value)}
                    placeholder="@username или ссылка"
                  />
                </label>

                <button className={styles.cart__submit} type="submit" disabled={isSubmitting}>
                  {isSubmitting ? <span className={styles.cart__submitLoader} /> : 'Оформить заказ'}
                </button>
              </form>
            </div>
          </div>
        )}
      </aside>
    </div>,
    document.body,
  )
}
