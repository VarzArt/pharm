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
  const [activeCategories, setActiveCategories] = useState<ProductCategory[]>([])
  const [visibleCount, setVisibleCount] = useState(INITIAL_LIMIT)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const filteredProducts = useMemo(() => {
    if (activeCategories.length === 0) return products

    return products.filter((product) =>
      product.categories.some((category) => activeCategories.includes(category)),
    )
  }, [activeCategories])

  const visibleProducts = filteredProducts.slice(0, visibleCount)

  const handleCategoryChange = (categoryId: 'all' | ProductCategory) => {
    setVisibleCount(INITIAL_LIMIT)

    if (categoryId === 'all') {
      setActiveCategories([])
      return
    }

    setActiveCategories((prev) => {
      if (prev.includes(categoryId)) {
        return prev.filter((category) => category !== categoryId)
      }

      return [...prev, categoryId]
    })
  }

  const remainingCount = filteredProducts.length - visibleProducts.length

  return (
    <>
      <main className={styles.catalog} id="catalog">
        <div className={styles.catalog__inner}>
          <div className={styles.catalog__head}>
            <div>
              <p className={styles.catalog__label}>Каталог</p>
              <h1 className={styles.catalog__title}>Наша продукция</h1>
            </div>

            <span className={styles.catalog__count}>{filteredProducts.length} продуктов</span>
          </div>

          <div className={styles.catalog__chips}>
            {productCategories.map((category) => {
              const isActive =
                category.id === 'all'
                  ? activeCategories.length === 0
                  : activeCategories.includes(category.id)

              return (
                <button
                  key={category.id}
                  type="button"
                  className={isActive ? styles.catalog__chipActive : styles.catalog__chip}
                  onClick={() => handleCategoryChange(category.id)}
                >
                  {category.label}
                </button>
              )
            })}
          </div>

          {visibleProducts.length > 0 ? (
            <section className={styles.catalog__grid}>
              {visibleProducts.map((product) => (
                <ProductCard key={product.id} product={product} onClick={setSelectedProduct} />
              ))}
            </section>
          ) : (
            <div className={styles.catalog__empty}>
              <h3>Товары не найдены</h3>
              <p>Нет препаратов, которые подходят под выбранные категории.</p>
            </div>
          )}

          {remainingCount > 0 && (
            <button
              type="button"
              className={styles.catalog__more}
              onClick={() => setVisibleCount((count) => count + LOAD_MORE_STEP)}
            >
              Показать ещё {Math.min(LOAD_MORE_STEP, remainingCount)} товаров
            </button>
          )}
        </div>
      </main>

      <ProductDetailModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </>
  )
}
