'use client'

import styles from './HeroSection.module.scss'
import Image from 'next/image'
import productImage from '@/app/assets/images/prosuctImage.png'

export default function HeroSection() {
  const handleNavigate = (sectionId: string) => {
    const element = document.getElementById(sectionId)

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  return (
    <section className={styles.hero} id="about">
      <div className={styles.hero__inner}>
        <div className={styles.hero__head}>
          <p className={styles.hero__label}>Premium Bioactive Peptides</p>
          <h1 className={styles.hero__title}>Точность в каждой молекуле</h1>
        </div>

        <div className={styles.hero__content}>
          <div className={styles.hero__imageWrap}>
            <Image
              src={productImage}
              alt="XYMERA BPC-157"
              className={styles.hero__image}
              priority
            />
          </div>

          <div className={styles.hero__text}>
            <p className={styles.hero__subtitle}>Чистая наука. Чистый результат.</p>

            <p className={styles.hero__description}>
              XYMERA — премиальные биоактивные пептиды фармацевтического качества. Высокая чистота,
              точная дозировка и современные научные формулы для поддержки вашего организма.
            </p>

            <a className={styles.hero__button} onClick={() => handleNavigate('catalog')}>
              Перейти к каталогу
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
