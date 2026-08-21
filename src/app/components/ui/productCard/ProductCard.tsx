'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import type { Product, ProductType } from '@/app/types/product'
import styles from './ProductCard.module.scss'

type ProductCardProps = {
  product: Product
  activeType: 'all' | ProductType
  onClick: (product: Product, variantId: string) => void
}

export default function ProductCard({ product, activeType, onClick }: ProductCardProps) {
  const [activeVariantIndex, setActiveVariantIndex] = useState(0)

  useEffect(() => {
    if (activeType === 'all') {
      setActiveVariantIndex(0)
      return
    }

    const variantIndex = product.variants.findIndex((variant) => variant.type === activeType)

    if (variantIndex !== -1) {
      setActiveVariantIndex(variantIndex)
    }
  }, [activeType, product.variants])

  const activeVariant = product.variants[activeVariantIndex]
  const hasSeveralVariants = product.variants.length > 1

  const handleVariantClick = (event: React.MouseEvent<HTMLButtonElement>, variantIndex: number) => {
    event.stopPropagation()
    setActiveVariantIndex(variantIndex)
  }

  return (
    <article className={styles.card} onClick={() => onClick(product, activeVariant.id)}>
      <div className={styles.card__imageWrap}>
        <Image
          src={activeVariant.image ?? product.image}
          alt={`${product.title} ${activeVariant.label}`}
          width={420}
          height={320}
          className={styles.card__image}
        />
      </div>

      <div className={styles.card__body}>
        <div>
          <h3>{product.title}</h3>

          <span className={styles.card__body_subtitle}>{product.ruTitle}</span>

          {hasSeveralVariants ? (
            <div className={styles.card__variants}>
              {product.variants.map((variant, index) => (
                <button
                  key={variant.id}
                  type="button"
                  className={
                    index === activeVariantIndex ? styles.card__variantActive : styles.card__variant
                  }
                  onClick={(event) => handleVariantClick(event, index)}
                  aria-label={`Выбрать вариант ${variant.label}`}
                >
                  {variant.dosage}
                </button>
              ))}
            </div>
          ) : (
            <span className={styles.card__dosage}>{activeVariant.dosage}</span>
          )}
        </div>

        <div className={styles.card__bottom}>
          <strong>{activeVariant.price.toLocaleString('ru-RU')} ₽</strong>
        </div>
      </div>
    </article>
  )
}
