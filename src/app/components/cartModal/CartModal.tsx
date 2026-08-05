'use client'

import Image from 'next/image'
import { type FormEvent, useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { HelpCircle, X } from 'lucide-react'
import { products, promoCodes } from '@/app/data/products'
import toast from 'react-hot-toast'
import type { OrderFormData } from '@/app/types/cart'
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
    socialLink: '',
  })

  const [isPrivacyAccepted, setIsPrivacyAccepted] = useState(false)
  const [isOfferAccepted, setIsOfferAccepted] = useState(false)

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

  const promoDiscountAmount = appliedPromo
    ? Math.round((totalPrice * appliedPromo.discountPercent) / 100)
    : 0

  const finalPrice = totalPrice - promoDiscountAmount

  const totalQuantity = cartItems.reduce((sum, item) => {
    if (!item) return sum
    return sum + item.quantity
  }, 0)

  const phoneDigits = formData.phone.replace(/\D/g, '')

  const isNameValid = formData.name.trim().length >= 2
  const isPhoneValid = phoneDigits.length === 11 && phoneDigits.startsWith('7')
  const isSocialLinkValid = formData.socialLink.trim().length > 0

  const isFormValid =
    isNameValid && isPhoneValid && isSocialLinkValid && isPrivacyAccepted && isOfferAccepted

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
      socialLink: '',
    })

    setIsPrivacyAccepted(false)
    setIsOfferAccepted(false)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (isSubmitting || !isFormValid) return

    setIsSubmitting(true)

    const order = {
      customer: {
        ...formData,
        socialLink: `@${formData.socialLink}`,
      },
      discounts: {
        promo: appliedPromo
          ? {
              code: appliedPromo.code,
              discountPercent: appliedPromo.discountPercent,
              discountAmount: promoDiscountAmount,
            }
          : null,
      },
      items: cartItems
        .map((item) => {
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
        })
        .filter(Boolean),
      totalPrice,
      finalPrice,
      totalQuantity,
    }

    try {
      const response = await fetch('/api/order/telegram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      })

      if (!response.ok) {
        throw new Error('Telegram sending failed')
      }

      toast.success('Заказ успешно оформлен. Скоро с вами свяжется менеджер')

      handleResetCartState()
      handleClose()
    } catch {
      toast.error('Не удалось отправить заказ. Попробуйте ещё раз')
    } finally {
      setIsSubmitting(false)
    }
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
                      {appliedPromo && <del>{totalPrice.toLocaleString('ru-RU')} ₽</del>}

                      <strong>{finalPrice.toLocaleString('ru-RU')} ₽</strong>
                    </div>
                  </div>

                  {appliedPromo && (
                    <div className={styles.cart__discounts}>
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
                    minLength={2}
                    autoComplete="name"
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
                    autoComplete="tel"
                  />
                </label>

                <label>
                  <span>Никнейм в Telegram*</span>

                  <input
                    type="text"
                    value={formData.socialLink}
                    onChange={(e) => {
                      const value = e.target.value.replace(/^@+/, '')
                      handleChange('socialLink', value)
                    }}
                    required
                    placeholder="username"
                    autoComplete="off"
                  />
                  <p>*Обязателен для связи менеджеру!</p>
                </label>

                <div className={styles.cart__agreements}>
                  <label className={styles.cart__agreement}>
                    <input
                      type="checkbox"
                      checked={isPrivacyAccepted}
                      onChange={(event) => setIsPrivacyAccepted(event.target.checked)}
                      required
                    />

                    <span className={styles.cart__checkbox} aria-hidden="true" />

                    <span className={styles.cart__agreementText}>
                      Я даю согласие на обработку персональных данных и принимаю условия{' '}
                      <a
                        href="/data/PrivacyPolicy.docx"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(event) => event.stopPropagation()}
                      >
                        политики конфиденциальности
                      </a>
                      .
                    </span>
                  </label>

                  <label className={styles.cart__agreement}>
                    <input
                      type="checkbox"
                      checked={isOfferAccepted}
                      onChange={(event) => setIsOfferAccepted(event.target.checked)}
                      required
                    />

                    <span className={styles.cart__checkbox} aria-hidden="true" />

                    <span className={styles.cart__agreementText}>
                      Я ознакомился и принимаю условия{' '}
                      <a
                        href="/data/PublicOffer.docx"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(event) => event.stopPropagation()}
                      >
                        публичной оферты
                      </a>
                      .
                    </span>
                  </label>
                </div>

                <button
                  className={styles.cart__submit}
                  type="submit"
                  disabled={isSubmitting || !isFormValid}
                >
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
