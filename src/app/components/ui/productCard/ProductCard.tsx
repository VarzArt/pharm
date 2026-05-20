import Image from 'next/image'
import type { Product } from '@/app/types/product'
import styles from './ProductCard.module.scss'

type ProductCardProps = {
  product: Product
  onClick: (product: Product) => void
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  const defaultVariant = product.variants[0]

  return (
    <article className={styles.card} onClick={() => onClick(product)}>
      <div className={styles.card__imageWrap}>
        <Image
          src={product.image}
          alt={product.title}
          width={420}
          height={320}
          className={styles.card__image}
        />
      </div>

      <div className={styles.card__body}>
        <div>
          <h3>{product.title}</h3>
          <p>{product.subtitle}</p>
          <span>{defaultVariant.dosage}</span>
        </div>

        <div className={styles.card__bottom}>
          <strong>{defaultVariant.price.toLocaleString('ru-RU')} ₽</strong>
        </div>
      </div>
    </article>
  )
}
