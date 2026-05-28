'use client'

import { ArrowUp } from 'lucide-react'
import styles from './ScrollTopButton.module.scss'
import { useScrollTop } from '@/app/hooks/useScrollTop'

export default function ScrollTopButton() {
  const { isVisible, scrollToTop } = useScrollTop()

  return (
    <button
      type="button"
      aria-label="Наверх"
      onClick={scrollToTop}
      className={`${styles.button} ${isVisible ? styles.visible : ''}`}
    >
      <ArrowUp size={20} strokeWidth={2.4} />
    </button>
  )
}
