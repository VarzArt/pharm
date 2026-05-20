import { cn } from '@/lib/utils'
import styles from './BurgerButton.module.scss'

type BurgerButtonProps = {
  isOpen: boolean
  onClick: () => void
  className?: string
}

export default function BurgerButton({ className, onClick, isOpen }: BurgerButtonProps) {
  return (
    <button
      className={cn(styles.burger, className, isOpen ? styles.active : '')}
      onClick={onClick}
      aria-label="Menu"
      aria-expanded={isOpen}
      type="button"
    >
      <span />
      <span />
      <span />
    </button>
  )
}
