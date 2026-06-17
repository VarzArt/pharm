'use client'

import { type ReactNode, useEffect, useState } from 'react'
import styles from './Modal.module.scss'
import { cn } from '@/lib/utils'
import { createPortal } from 'react-dom'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  title?: string
  className?: string
}

const ANIMATION_DURATION = 320

export default function Modal({ isOpen, onClose, children, title, className }: ModalProps) {
  const [isMounted, setIsMounted] = useState(isOpen)
  const [isClosing, setIsClosing] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true)
      setIsClosing(false)
    }
  }, [isOpen])

  const handleClose = () => {
    setIsClosing(true)

    setTimeout(() => {
      setIsClosing(false)
      onClose()
    }, ANIMATION_DURATION)
  }

  useEffect(() => {
    if (!isMounted) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
    }
  }, [isMounted])

  useEffect(() => {
    if (!isOpen && isMounted) {
      setIsClosing(true)

      const timer = setTimeout(() => {
        setIsMounted(false)
        setIsClosing(false)
      }, ANIMATION_DURATION)

      return () => clearTimeout(timer)
    }
  }, [isOpen, isMounted])

  if (!isMounted) return null

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      handleClose()
    }
  }

  return createPortal(
    <div
      className={cn(styles.overlay, isClosing && styles.overlayClosing, className)}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label={title || 'Modal window'}
    >
      <div className={cn(styles.modal, isClosing && styles.modalClosing)}>
        {title && <h2 className={styles.title}>{title}</h2>}

        <div className={styles.content}>{children}</div>
      </div>
    </div>,
    document.body,
  )
}
