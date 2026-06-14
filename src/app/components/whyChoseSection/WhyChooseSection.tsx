'use client'

import { useRef, useState } from 'react'
import { BadgeCheck, Droplets, Gauge, Truck, PackageCheck, Microscope } from 'lucide-react'
import styles from './WhyChooseSection.module.scss'

const items = [
  {
    icon: BadgeCheck,
    title: 'Фармацевтический стандарт',
    text: 'Каждая партия производится в условиях, соответствующих стандартам GMP.',
  },
  {
    icon: Droplets,
    title: 'Чистота ≥ 99%',
    text: 'Подтверждённая высокая чистота продукта и лабораторная проверка.',
  },
  {
    icon: Gauge,
    title: 'Точная дозировка',
    text: 'Каждый флакон содержит точно заявленное количество вещества.',
  },
  {
    icon: Truck,
    title: 'Быстрая доставка',
    text: 'Отправка по России и Республике Беларусь в надёжной упаковке.',
  },
  {
    icon: PackageCheck,
    title: 'Премиальная упаковка',
    text: 'Защитная упаковка помогает сохранить продукт при транспортировке.',
  },
  {
    icon: Microscope,
    title: 'Научный подход',
    text: 'Формулы основаны на современных исследованиях в области пептидов.',
  },
]

const PAGE_SIZE = 2
const pagesCount = Math.ceil(items.length / PAGE_SIZE)

export default function WhyChooseSection() {
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

    setActivePage(Math.round(slider.scrollLeft / slider.clientWidth))
  }

  return (
    <section className={styles.why} id="benefits">
      <div className={styles.why__inner}>
        <p className={styles.why__label}>Преимущества</p>
        <h2 className={styles.why__title}>Почему нас выбирают</h2>

        <div ref={sliderRef} className={styles.why__slider} onScroll={handleScroll}>
          {Array.from({ length: pagesCount }).map((_, pageIndex) => (
            <div className={styles.why__page} key={pageIndex}>
              {items.slice(pageIndex * PAGE_SIZE, pageIndex * PAGE_SIZE + PAGE_SIZE).map((item) => {
                const Icon = item.icon

                return (
                  <article className={styles.why__card} key={item.title}>
                    <div className={styles.why__icon}>
                      <Icon size={28} strokeWidth={1.7} />
                    </div>

                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </article>
                )
              })}
            </div>
          ))}
        </div>

        <div className={styles.why__pagination}>
          {Array.from({ length: pagesCount }).map((_, index) => (
            <button
              key={index}
              type="button"
              className={index === activePage ? styles.active : ''}
              onClick={() => scrollToPage(index)}
              aria-label={`Перейти к слайду ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
