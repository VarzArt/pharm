'use client'

import Image from 'next/image'
import logo from '@/app/assets/images/logo_main.png'
import styles from './Footer.module.scss'
import Link from 'next/link'

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
          <p className={styles.footer__noticeText}>
            <strong>
              ВСЕ ПРЕДСТАВЛЕННЫЕ ПРОДУКТЫ НА ЭТОМ САЙТЕ ПРЕДНАЗНАЧЕНЫ ИСКЛЮЧИТЕЛЬНО ДЛЯ
              ИССЛЕДОВАТЕЛЬСКИХ ЦЕЛЕЙ.
            </strong>
            <br></br>Они разработаны для испытаний in vitro и исключительно для лабораторных
            экспериментов. Вся предоставленная на этом веб-сайте информация имеет исключительно
            образовательный характер. Любое введение этого продукта в организм человека или
            животного строго запрещено. Важно, чтобы этим продуктом обращались только
            лицензированные и квалифицированные специалисты. Этот продукт не предназначен для
            использования в качестве лекарства, продукта питания или косметического средства. Его не
            следует ошибочно маркировать, использовать или обозначать как таковой. Его назначение и
            использование строго ограничены исследованиями и научным расследованием.
          </p>

          <a
            href={'https://t.me/XymeraSupport'}
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
              </ul>
            </nav>

            <div className={styles.footer__contacts}>
              <h3>Контакты</h3>

              <ul>
                <li>
                  <Link href={'mailto:Xymera.peptides@yandex.ru'}>Почта</Link>
                </li>
                <li>
                  <Link
                    href={'https://t.me/XymeraSupport'}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Telegram
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.footer__law}>
          <div className={styles.footer__law_docs}>
            <div>
              <a href={'/data/PublicOffer.docx'}>Публичная оферта</a>
              <a href={'/data/PrivacyPolicy.docx'}>Политика конфиденциальности</a>
            </div>
            <div>
              <a href={'/data/Delivery.docx'}>Доставка и оплата</a>
            </div>
          </div>
          <div className={styles.footer__law_info}>
            ИНН: 780452496539 <br></br>
            <br></br>ОГРНИП: 326784700220431
          </div>
        </div>

        <div className={styles.footer__bottom}>
          <p>© 2026 XYMERA. Все права защищены.</p>
        </div>
      </div>
    </footer>
  )
}
