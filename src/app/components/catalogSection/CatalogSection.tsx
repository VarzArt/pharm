'use client'

import { useMemo, useState } from 'react'
import { products, productCategories } from '@/app/data/products'
import type { Product, ProductCategory } from '@/app/types/product'
import styles from './CatalogSection.module.scss'
import ProductCard from '@/app/components/ui/productCard/ProductCard'
import ProductDetailModal from '@/app/components/ui/productDetailsModal'

const INITIAL_LIMIT = 6
const LOAD_MORE_STEP = 3

export default function CatalogPage() {
  const [activeCategory, setActiveCategory] = useState<'all' | ProductCategory>('all')
  const [visibleCount, setVisibleCount] = useState(INITIAL_LIMIT)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'all') return products

    return products.filter((product) => product.category === activeCategory)
  }, [activeCategory])

  const visibleProducts = filteredProducts.slice(0, visibleCount)

  const handleCategoryChange = (category: 'all' | ProductCategory) => {
    setActiveCategory(category)
    setVisibleCount(INITIAL_LIMIT)
  }

  const remainingCount = filteredProducts.length - visibleProducts.length

  return (
    <>
      <main className={styles.catalog} id="catalog">
        <div className={styles.catalog__head}>
          <div>
            <p className={styles.catalog__label}>Каталог</p>
            <h1 className={styles.catalog__title}>Наша продукция</h1>
          </div>

          <span className={styles.catalog__count}>{filteredProducts.length} продуктов</span>
        </div>

        <div className={styles.catalog__chips}>
          {productCategories.map((category) => (
            <button
              key={category.id}
              type="button"
              className={
                activeCategory === category.id ? styles.catalog__chipActive : styles.catalog__chip
              }
              onClick={() => handleCategoryChange(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>

        <section className={styles.catalog__grid}>
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} onClick={setSelectedProduct} />
          ))}
        </section>

        {remainingCount > 0 && (
          <button
            type="button"
            className={styles.catalog__more}
            onClick={() => setVisibleCount((count) => count + LOAD_MORE_STEP)}
          >
            Показать ещё {Math.min(LOAD_MORE_STEP, remainingCount)} товаров
          </button>
        )}
      </main>

      <ProductDetailModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </>
  )
}
