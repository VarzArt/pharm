'use client'

import Image from 'next/image'
import { type FormEvent, useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { products } from '@/app/data/products'
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
      if (event.key === 'Escape') {
        handleClose()
      }
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

  const totalQuantity = cartItems.reduce((sum, item) => {
    if (!item) return sum

    return sum + item.quantity
  }, 0)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (isSubmitting) return

    setIsSubmitting(true)

    const order = {
      customer: formData,
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
      totalQuantity,
    }

    await new Promise((resolve) => setTimeout(resolve, 900))

    console.log('ORDER:', order)

    toast.success('Заказ успешно оформлен. Скоро с вами свяжется менеджер')

    clearCart()

    setFormData({
      name: '',
      phone: '',
      contactMethod: 'telegram',
      socialLink: '',
    })

    setIsSubmitting(false)
    handleClose()
  }

  const handleChange = (field: keyof OrderFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
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
          <>
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

            <button type="button" className={styles.cart__clear} onClick={clearCart}>
              Очистить корзину
            </button>

            <div className={styles.cart__summary}>
              <span>Итого</span>
              <strong>{totalPrice.toLocaleString('ru-RU')} ₽</strong>
            </div>

            <form className={styles.cart__form} onSubmit={handleSubmit}>
              <h3>Оформление заказа</h3>

              <label>
                <span>Имя</span>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(event) => handleChange('name', event.target.value)}
                  placeholder="Ваше имя"
                  required
                />
              </label>

              <label>
                <span>Номер телефона</span>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(event) => handleChange('phone', event.target.value)}
                  placeholder="+7 999 999-99-99"
                  required
                />
              </label>

              <label>
                <span>Предпочтительный способ связи</span>
                <select
                  value={formData.contactMethod}
                  onChange={(event) =>
                    handleChange('contactMethod', event.target.value as ContactMethod)
                  }
                >
                  <option value="telegram">Telegram</option>
                  <option value="max">Max</option>
                  <option value="vk">ВК</option>
                  <option value="whatsapp">WhatsApp</option>
                </select>
              </label>

              <label>
                <span>Ссылка на соц.сеть</span>
                <input
                  type="text"
                  value={formData.socialLink}
                  onChange={(event) => handleChange('socialLink', event.target.value)}
                  placeholder="@username или ссылка"
                  required
                />
              </label>

              <button className={styles.cart__submit} type="submit" disabled={isSubmitting}>
                {isSubmitting ? <span className={styles.cart__submitLoader} /> : 'Оформить заказ'}
              </button>
            </form>
          </>
        )}
      </aside>
    </div>,
    document.body,
  )
}
