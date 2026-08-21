'use client'

import { useMemo, useState } from 'react'
import { products, productCategories, productTypes } from '@/app/data/products'
import type { Product, ProductCategory, ProductType } from '@/app/types/product'
import styles from './CatalogSection.module.scss'
import ProductCard from '@/app/components/ui/productCard/ProductCard'
import ProductDetailModal from '@/app/components/ui/productDetailsModal'

const INITIAL_LIMIT = 6
const LOAD_MORE_STEP = 3

export default function CatalogPage() {
  const [activeCategories, setActiveCategories] = useState<ProductCategory[]>([])

  const [activeType, setActiveType] = useState<'all' | ProductType>('all')

  const [visibleCount, setVisibleCount] = useState(INITIAL_LIMIT)

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null)

  const handleOpenProduct = (product: Product, variantId: string) => {
    setSelectedProduct(product)
    setSelectedVariantId(variantId)
  }

  const handleCloseProduct = () => {
    setSelectedProduct(null)
    setSelectedVariantId(null)
  }

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategories =
        activeCategories.length === 0 ||
        activeCategories.some((category) => product.categories.includes(category))

      const matchesType =
        activeType === 'all' || product.variants.some((variant) => variant.type === activeType)

      return matchesCategories && matchesType
    })
  }, [activeCategories, activeType])

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

  const handleTypeChange = (typeId: 'all' | ProductType) => {
    setVisibleCount(INITIAL_LIMIT)
    setActiveType(typeId)
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

          <div className={styles.catalog__filters}>
            <div className={styles.catalog__filterGroup}>
              <span className={styles.catalog__filterLabel}>Форма выпуска</span>

              <div className={styles.catalog__chips}>
                {productTypes.map((type) => {
                  const isActive = activeType === type.id

                  return (
                    <button
                      key={type.id}
                      type="button"
                      className={isActive ? styles.catalog__chipActive : styles.catalog__chip}
                      onClick={() => handleTypeChange(type.id)}
                    >
                      {type.label}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className={styles.catalog__filterGroup}>
              <span className={styles.catalog__filterLabel}>Направление</span>

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
            </div>
          </div>

          {visibleProducts.length > 0 ? (
            <section className={styles.catalog__grid}>
              {visibleProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  activeType={activeType}
                  onClick={handleOpenProduct}
                />
              ))}
            </section>
          ) : (
            <div className={styles.catalog__empty}>
              <h3>Товары не найдены</h3>

              <p>Нет препаратов, которые подходят под выбранные параметры.</p>
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

      <ProductDetailModal
        product={selectedProduct}
        initialVariantId={selectedVariantId}
        onClose={handleCloseProduct}
      />
    </>
  )
}
