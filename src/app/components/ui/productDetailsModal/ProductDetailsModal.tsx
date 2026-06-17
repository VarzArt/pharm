'use client'

import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { createPortal } from 'react-dom'
import { ChevronLeft } from 'lucide-react'
import { products } from '@/app/data/products'
import type { Product } from '@/app/types/product'
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
  const [currentProduct, setCurrentProduct] = useState<Product | null>(product)
  const [history, setHistory] = useState<Product[]>([])
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null)

  const addItem = useCartStore((state) => state.addItem)

  const currentVariant =
    currentProduct?.variants.find((variant) => variant.id === selectedVariantId) ??
    currentProduct?.variants[0] ??
    null

  const relatedProducts = useMemo(() => {
    if (!currentProduct) return []

    return currentProduct.relatedProductIds
      .map((id) => products.find((product) => product.id === id))
      .filter(Boolean) as Product[]
  }, [currentProduct])

  const handleClose = () => {
    setIsClosing(true)

    window.setTimeout(() => {
      setIsMounted(false)
      setIsClosing(false)
      setCurrentProduct(null)
      setHistory([])
      onClose()
    }, ANIMATION_DURATION)
  }

  const handleOpenRelatedProduct = (nextProduct: Product) => {
    if (!currentProduct) return

    setHistory((prev) => [...prev, currentProduct])
    setCurrentProduct(nextProduct)
    setSelectedVariantId(nextProduct.variants[0]?.id ?? null)
  }

  const handleBack = () => {
    setHistory((prev) => {
      const parentProduct = prev.at(-1)

      if (parentProduct) {
        setCurrentProduct(parentProduct)
        setSelectedVariantId(parentProduct.variants[0]?.id ?? null)
      }

      return prev.slice(0, -1)
    })
  }

  useEffect(() => {
    if (product) {
      setIsMounted(true)
      setIsClosing(false)
      setCurrentProduct(product)
      setHistory([])
      setSelectedVariantId(product.variants[0]?.id ?? null)
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
    if (isAdding || !currentProduct || !currentVariant) return

    setIsAdding(true)

    await new Promise((resolve) => setTimeout(resolve, 550))

    addItem(currentProduct.id, currentVariant.id)

    toast.success('Товар добавлен в корзину')
    setIsAdding(false)
  }

  if (!isMounted || !currentProduct || !currentVariant) return null

  return createPortal(
    <div
      className={`${styles.overlay} ${isClosing ? styles.overlayClosing : ''}`}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label={currentProduct.title}
    >
      <article
        className={`${styles.modal} ${isClosing ? styles.modalClosing : ''}`}
        onClick={(event) => event.stopPropagation()}
      >
        {history.length > 0 && (
          <button
            className={styles.modal__back}
            type="button"
            onClick={handleBack}
            aria-label="Вернуться к предыдущему товару"
          >
            <ChevronLeft size={22} strokeWidth={2} />
          </button>
        )}

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
              src={currentProduct.image}
              alt={currentProduct.title}
              width={640}
              height={460}
              className={styles.modal__image}
              priority
            />
          </div>

          <div className={styles.modal__body}>
            <div className={styles.modal__head}>
              <div>
                <h2>{currentProduct.title}</h2>
                <p>{currentProduct.subtitle}</p>
                {currentProduct.variants.length > 1 && (
                  <div className={styles.modal__variants}>
                    {currentProduct.variants.map((variant) => (
                      <button
                        key={variant.id}
                        type="button"
                        className={`${styles.modal__variant} ${
                          currentVariant?.id === variant.id ? styles.modal__variantActive : ''
                        }`}
                        onClick={() => setSelectedVariantId(variant.id)}
                      >
                        {variant.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <strong>{currentVariant.price.toLocaleString('ru-RU')} ₽</strong>
            </div>

            {relatedProducts.length > 0 && (
              <div className={styles.modal__related}>
                <h3>Часто берут с</h3>

                <div className={styles.modal__relatedList}>
                  {relatedProducts.map((relatedProduct) => {
                    const variant = relatedProduct.variants[0]

                    return (
                      <button
                        key={relatedProduct.id}
                        type="button"
                        className={styles.modal__relatedCard}
                        onClick={() => handleOpenRelatedProduct(relatedProduct)}
                      >
                        <Image
                          src={relatedProduct.image}
                          alt={relatedProduct.title}
                          width={72}
                          height={72}
                          className={styles.modal__relatedImage}
                        />

                        <span>
                          <b>{relatedProduct.title}</b>
                          <small>{variant.dosage}</small>
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            <div className={styles.modal__divider} />

            <div className={styles.modal__content}>
              <p>{currentProduct.description}</p>

              <div>
                <h3>Основные эффекты:</h3>

                <ul>
                  {currentProduct.mainEffects.map((effect) => (
                    <li key={effect}>{effect}</li>
                  ))}
                </ul>
              </div>

              {!!currentProduct.composition?.length && (
                <div>
                  <h3>Состав:</h3>

                  <ul>
                    {currentProduct.composition.map((item) => (
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
