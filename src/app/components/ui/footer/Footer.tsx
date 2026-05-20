import Image from 'next/image'
import logo from '@/app/assets/images/logo_main.png'
import styles from './Footer.module.scss'

export default function Footer() {
  return (
    <footer className={styles.footer} id="contacts">
      <div className={styles.footer__notice}>
        <p className={styles.footer__noticeLabel}>Важная информация</p>

        <p className={styles.footer__noticeText}>
          Вся пептидная продукция на этом сайте предназначена исключительно для исследовательских
          целей. Она не является лекарством, продуктом питания или косметическим средством и не
          предназначена для применения человеком или животным.
        </p>
      </div>

      <div className={styles.footer__divider} />

      <div className={styles.footer__content}>
        <div className={styles.footer__brand}>
          <Image src={logo} alt="XYMERA" className={styles.footer__logo} />

          <p className={styles.footer__description}>
            Премиальные биоактивные пептиды для исследований
          </p>
        </div>

        <div className={styles.footer__data}>
          <nav className={styles.footer__nav}>
            <h3>Информация</h3>

            <ul>
              <li>
                <a href="#about">О нас</a>
              </li>

              <li>
                <a href="#catalog">Каталог</a>
              </li>
              <li>
                <a href="benefits">Почему мы</a>
              </li>
              <li>
                <a href="contacts">Контакты</a>
              </li>
            </ul>
          </nav>

          <div className={styles.footer__contacts}>
            <h3>Контакты</h3>

            <ul>
              <li>info@xymera.ru</li>
              <li>Telegram</li>
              <li>WhatsApp</li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.footer__bottom}>
        <p>© 2026 XYMERA. Все права защищены.</p>
      </div>
    </footer>
  )
}
