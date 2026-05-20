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
      <Image src={logo} alt="main logo" className={styles.main__logo} />

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

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} className={styles.main__modal}>
        <ul>
          <li onClick={() => handleNavigate('about')}>О нас</li>
          <li onClick={() => handleNavigate('catalog')}>Каталог</li>
          <li onClick={() => handleNavigate('benefits')}>Почему мы</li>
          <li onClick={() => handleNavigate('contacts')}>Контакты</li>
        </ul>
      </Modal>

      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  )
}
