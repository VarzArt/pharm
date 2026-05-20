import styles from './HeroSection.module.scss'
import Image from 'next/image'
import productImage from '@/app/assets/images/prosuctImage.png'

export default function HeroSection() {
  return (
    <section className={styles.hero} id="about">
      <div className={styles.hero__content}>
        <div className={styles.hero__text}>
          <p className={styles.hero__label}>Premium Bioactive Peptides</p>

          <h1 className={styles.hero__title}>Точность в каждой молекуле</h1>

          <div className={styles.hero__imageWrap}>
            <Image
              src={productImage}
              alt="XYMERA BPC-157"
              className={styles.hero__image}
              priority
            />
          </div>

          <p className={styles.hero__subtitle}>Чистая наука. Чистый результат.</p>

          <p className={styles.hero__description}>
            XYMERA — премиальные биоактивные пептиды фармацевтического качества. Высокая чистота,
            точная дозировка и современные научные формулы для поддержки вашего организма.
          </p>

          <a className={styles.hero__button} href="#catalog">
            Перейти к каталогу
          </a>
        </div>
      </div>
    </section>
  )
}
