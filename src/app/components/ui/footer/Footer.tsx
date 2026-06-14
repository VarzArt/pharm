'use client'

import Image from 'next/image'
import logo from '@/app/assets/images/logo_main.png'
import styles from './Footer.module.scss'

export default function Footer() {
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
    <footer className={styles.footer} id="contacts">
      <div className={styles.footer__inner}>
        <div className={styles.footer__notice}>
          <p className={styles.footer__noticeLabel}>Важная информация</p>

          <p className={styles.footer__noticeText}>
            Вся пептидная продукция, представленная на данном сайте, предназначена исключительно для
            исследовательских и лабораторных целей. Продукция не является лекарственным средством,
            пищевой добавкой или косметическим продуктом и не предназначена для применения человеком
            или животным. Вся информация на сайте носит исключительно ознакомительный и
            образовательный характер.
          </p>

          <a
            href="https://t.me/your_username"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footer__noticeLink}
          >
            Сотрудничество и оптовые заказы →
          </a>
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
                  <button onClick={() => handleNavigate('about')}>О нас</button>
                </li>

                <li>
                  <button onClick={() => handleNavigate('catalog')}>Каталог</button>
                </li>

                <li>
                  <button onClick={() => handleNavigate('benefits')}>Почему мы</button>
                </li>

                <li>
                  <button onClick={() => handleNavigate('contacts')}>Контакты</button>
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
      </div>
    </footer>
  )
}
