'use client'

import { useRef, useState } from 'react'
import { BadgeCheck, Droplets, Truck, FlaskConical, Package, HeartHandshake } from 'lucide-react'
import styles from './BenefitsSection.module.scss'

const benefits = [
  {
    icon: BadgeCheck,
    title: 'Фарм. качество',
    text: 'производства',
  },
  {
    icon: Droplets,
    title: 'Чистота',
    text: 'пептидов ≥ 99%',
  },
  {
    icon: Truck,
    title: 'Быстрая доставка',
    text: 'Россия и РБ',
  },
  {
    icon: FlaskConical,
    title: 'Точная дозировка',
    text: 'в каждом флаконе',
  },
  {
    icon: Package,
    title: 'Премиальная',
    text: 'упаковка',
  },
  {
    icon: HeartHandshake,
    title: 'Помощь',
    text: 'в подборе',
  },
]

const PAGE_SIZE = 2
const pagesCount = Math.ceil(benefits.length / PAGE_SIZE)

export default function BenefitsSection() {
  const sliderRef = useRef<HTMLDivElement>(null)
  const [activePage, setActivePage] = useState(0)

  const scrollToPage = (page: number) => {
    const slider = sliderRef.current
    if (!slider) return

    slider.scrollTo({
      left: slider.clientWidth * page,
      behavior: 'smooth',
    })

    setActivePage(page)
  }

  const handleScroll = () => {
    const slider = sliderRef.current
    if (!slider) return

    const page = Math.round(slider.scrollLeft / slider.clientWidth)
    setActivePage(page)
  }

  return (
    <section className={styles.benefits}>
      <p className={styles.benefits__label}>Каталог</p>
      <h2 className={styles.benefits__title}>Наши преимущества</h2>

      <div ref={sliderRef} className={styles.benefits__slider} onScroll={handleScroll}>
        {Array.from({ length: pagesCount }).map((_, pageIndex) => (
          <div className={styles.benefits__page} key={pageIndex}>
            {benefits
              .slice(pageIndex * PAGE_SIZE, pageIndex * PAGE_SIZE + PAGE_SIZE)
              .map((item) => {
                const Icon = item.icon

                return (
                  <article className={styles.benefits__card} key={item.title}>
                    <div className={styles.benefits__icon}>
                      <Icon size={28} strokeWidth={1.8} />
                    </div>

                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </article>
                )
              })}
          </div>
        ))}
      </div>

      <div className={styles.benefits__pagination}>
        {Array.from({ length: pagesCount }).map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => scrollToPage(index)}
            className={index === activePage ? styles.active : ''}
            aria-label={`Перейти к слайду ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
