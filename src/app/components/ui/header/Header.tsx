'use client'

import { useState } from 'react'
import { ShoppingBag } from 'lucide-react'
import styles from './Header.module.scss'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import logo from '@/app/assets/images/logo_main.png'
import BurgerButton from '@/app/components/ui/burgerButton'
import Modal from '@/app/components/ui/modal'
import CartModal from '@/app/components/cartModal'
import { useCartStore } from '@/app/store/cartStore'

type HeaderProps = {
  className?: string
}

const navItems = [
  { label: 'О нас', sectionId: 'about' },
  { label: 'Каталог', sectionId: 'catalog' },
  { label: 'Почему мы', sectionId: 'benefits' },
  { label: 'Контакты', sectionId: 'contacts' },
]

export default function Header({ className }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)

  const cartQuantity = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0),
  )

  const handleNavigate = (sectionId: string) => {
    setIsOpen(false)

    setTimeout(() => {
      const element = document.getElementById(sectionId)

      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }
    }, 320)
  }

  return (
    <header className={cn(styles.main, className)}>
      <div className={styles.main__inner}>
        <Image src={logo} alt="main logo" className={styles.main__logo} />

        <nav className={styles.main__desktopNav} aria-label="Основная навигация">
          {navItems.map((item) => (
            <button
              key={item.sectionId}
              type="button"
              onClick={() => handleNavigate(item.sectionId)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className={styles.main__actions}>
          <button
            type="button"
            className={styles.main__cart}
            onClick={() => setIsCartOpen(true)}
            aria-label="Открыть корзину"
          >
            <ShoppingBag size={22} strokeWidth={1.8} />

            {cartQuantity > 0 && <span className={styles.main__cartCount}>{cartQuantity}</span>}
          </button>

          <BurgerButton
            isOpen={isOpen}
            onClick={() => setIsOpen(!isOpen)}
            className={styles.main__burger}
          />
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} className={styles.main__modal}>
        <ul>
          {navItems.map((item) => (
            <li key={item.sectionId} onClick={() => handleNavigate(item.sectionId)}>
              {item.label}
            </li>
          ))}
        </ul>
      </Modal>

      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  )
}
