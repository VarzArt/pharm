'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import type { Product } from '@/app/types/product'
import styles from './ProductCard.module.scss'

type ProductCardProps = {
  product: Product
  onClick: (product: Product) => void
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  const sliderRef = useRef<HTMLDivElement>(null)
  const [activeVariantIndex, setActiveVariantIndex] = useState(0)

  const activeVariant = product.variants[activeVariantIndex]
  const hasSeveralVariants = product.variants.length > 1

  const handleScroll = () => {
    const slider = sliderRef.current
    if (!slider) return

    const index = Math.round(slider.scrollLeft / slider.clientWidth)
    setActiveVariantIndex(index)
  }

  const handleDotClick = (event: React.MouseEvent<HTMLButtonElement>, index: number) => {
    event.stopPropagation()

    const slider = sliderRef.current
    if (!slider) return

    slider.scrollTo({
      left: slider.clientWidth * index,
      behavior: 'smooth',
    })

    setActiveVariantIndex(index)
  }

  return (
    <article className={styles.card} onClick={() => onClick(product)}>
      <div className={styles.card__imageWrap}>
        <div ref={sliderRef} className={styles.card__slider} onScroll={handleScroll}>
          {product.variants.map((variant) => (
            <div className={styles.card__slide} key={variant.id}>
              <Image
                src={variant.image ?? product.image}
                alt={`${product.title} ${variant.label}`}
                width={420}
                height={320}
                className={styles.card__image}
              />
            </div>
          ))}
        </div>

        {hasSeveralVariants && (
          <div className={styles.card__pagination}>
            {product.variants.map((variant, index) => (
              <button
                key={variant.id}
                type="button"
                className={index === activeVariantIndex ? styles.card__dotActive : styles.card__dot}
                onClick={(event) => handleDotClick(event, index)}
                aria-label={`Показать вариант ${variant.label}`}
              />
            ))}
          </div>
        )}
      </div>

      <div className={styles.card__body}>
        <div>
          <h3>{product.title}</h3>
          <span>{activeVariant.dosage}</span>
        </div>

        <div className={styles.card__bottom}>
          <strong>{activeVariant.price.toLocaleString('ru-RU')} ₽</strong>
        </div>
      </div>
    </article>
  )
}
