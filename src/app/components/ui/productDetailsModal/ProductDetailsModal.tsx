'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { createPortal } from 'react-dom'
import type { Product, ProductVariant } from '@/app/types/product'
import { useCartStore } from '@/app/store/cartStore'
import styles from './ProductDetailsModal.module.scss'

type ProductDetailModalProps = {
  product: Product | null
  onClose: () => void
}

const ANIMATION_DURATION = 320

export default function ProductDetailModal({ product, onClose }: ProductDetailModalProps) {
  const [isMounted, setIsMounted] = useState(Boolean(product))
  const [isClosing, setIsClosing] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product?.variants[0] ?? null,
  )

  const addItem = useCartStore((state) => state.addItem)

  const handleClose = () => {
    setIsClosing(true)

    window.setTimeout(() => {
      setIsMounted(false)
      setIsClosing(false)
      onClose()
    }, ANIMATION_DURATION)
  }

  useEffect(() => {
    if (product) {
      setIsMounted(true)
      setIsClosing(false)
      setSelectedVariant(product.variants[0])
    }
  }, [product])

  useEffect(() => {
    if (!isMounted) return

    const originalHtmlOverflow = document.documentElement.style.overflow
    const originalBodyOverflow = document.body.style.overflow

    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.documentElement.style.overflow = originalHtmlOverflow
      document.body.style.overflow = originalBodyOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isMounted])

  const handleAddToCart = async () => {
    if (isAdding || !product || !selectedVariant) return

    setIsAdding(true)

    await new Promise((resolve) => setTimeout(resolve, 550))

    addItem(product.id, selectedVariant.id)

    toast.success('Товар добавлен в корзину')
    setIsAdding(false)
  }

  if (!isMounted || !product || !selectedVariant) return null

  return createPortal(
    <div
      className={`${styles.overlay} ${isClosing ? styles.overlayClosing : ''}`}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label={product.title}
    >
      <article
        className={`${styles.modal} ${isClosing ? styles.modalClosing : ''}`}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className={styles.modal__close}
          onClick={handleClose}
          type="button"
          aria-label="Закрыть"
        >
          ×
        </button>

        <div className={styles.modal__scroll}>
          <div className={styles.modal__imageWrap}>
            <Image
              src={product.image}
              alt={product.title}
              width={640}
              height={460}
              className={styles.modal__image}
              priority
            />
          </div>

          <div className={styles.modal__body}>
            <div className={styles.modal__head}>
              <div>
                <h2>{product.title}</h2>
                <p>{product.subtitle}</p>
                <span>{selectedVariant.dosage}</span>
              </div>

              <strong>{selectedVariant.price.toLocaleString('ru-RU')} ₽</strong>
            </div>

            <div className={styles.modal__variants}>
              {product.variants.map((variant) => (
                <button
                  key={variant.id}
                  type="button"
                  className={
                    selectedVariant.id === variant.id
                      ? styles.modal__variantActive
                      : styles.modal__variant
                  }
                  onClick={() => setSelectedVariant(variant)}
                >
                  {variant.label}
                </button>
              ))}
            </div>

            <div className={styles.modal__divider} />

            <div className={styles.modal__content}>
              <p>{product.description}</p>

              <div>
                <h3>Основные эффекты:</h3>

                <ul>
                  {product.mainEffects.map((effect) => (
                    <li key={effect}>{effect}</li>
                  ))}
                </ul>
              </div>

              {!!product.composition?.length && (
                <div>
                  <h3>Состав:</h3>

                  <ul>
                    {product.composition.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={styles.modal__action}>
          <button type="button" onClick={handleAddToCart} disabled={isAdding}>
            {isAdding ? <span className={styles.modal__loader} /> : 'Добавить в корзину'}
          </button>
        </div>
      </article>
    </div>,
    document.body,
  )
}
