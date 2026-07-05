'use client'

import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import styles from './PeptideCalculator.module.scss'
import { DoseRuler } from './DoseRuller'

type PeptideCalculatorModalProps = {
  isOpen: boolean
  onClose: () => void
}

const ANIMATION_DURATION = 320

const toNumber = (value: string) => {
  const normalized = value.replace(',', '.')
  const number = Number(normalized)

  return Number.isFinite(number) ? number : 0
}

export default function PeptideCalculatorModal({ isOpen, onClose }: PeptideCalculatorModalProps) {
  const [isMounted, setIsMounted] = useState(isOpen)
  const [isClosing, setIsClosing] = useState(false)

  const [syringeMl, setSyringeMl] = useState('0.3')
  const [peptideMg, setPeptideMg] = useState('5')
  const [waterMl, setWaterMl] = useState('1')
  const [doseMcg, setDoseMcg] = useState('50')

  const syringeMlNumber = toNumber(syringeMl)
  const peptideMgNumber = toNumber(peptideMg)
  const waterMlNumber = toNumber(waterMl)
  const doseMcgNumber = toNumber(doseMcg)

  const maxUnits = useMemo(() => {
    if (!syringeMlNumber) return 0

    return syringeMlNumber * 100
  }, [syringeMlNumber])

  const units = useMemo(() => {
    if (!peptideMgNumber || !waterMlNumber || !doseMcgNumber) return 0

    return (waterMlNumber * doseMcgNumber) / (peptideMgNumber * 10)
  }, [peptideMgNumber, waterMlNumber, doseMcgNumber])

  const isOverLimit = maxUnits > 0 && units > maxUnits
  const safeUnits = Math.min(Math.max(units, 0), maxUnits || 100)

  const handleClose = () => {
    setIsClosing(true)

    window.setTimeout(() => {
      setIsMounted(false)
      setIsClosing(false)
      onClose()
    }, ANIMATION_DURATION)
  }

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true)
      setIsClosing(false)
    }
  }, [isOpen])

  useEffect(() => {
    if (!isMounted) return

    const htmlOverflow = document.documentElement.style.overflow
    const bodyOverflow = document.body.style.overflow

    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.documentElement.style.overflow = htmlOverflow
      document.body.style.overflow = bodyOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isMounted])

  if (!isMounted) return null

  return createPortal(
    <div
      className={`${styles.overlay} ${isClosing ? styles.overlayClosing : ''}`}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label="Калькулятор дозировки"
    >
      <section
        className={`${styles.calculator} ${isClosing ? styles.calculatorClosing : ''}`}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className={styles.calculator__close}
          type="button"
          onClick={handleClose}
          aria-label="Закрыть калькулятор"
        >
          <X size={22} strokeWidth={1.9} />
        </button>

        <div className={styles.calculator__head}>
          <p className={styles.calculator__label}>Калькулятор</p>
          <h2 className={styles.calculator__title}>Расчёт дозировки</h2>
        </div>

        <div className={styles.calculator__grid}>
          <label className={styles.calculator__field}>
            <span>Объём шприца</span>

            <div className={styles.calculator__inputWrap}>
              <input
                type="text"
                inputMode="decimal"
                value={syringeMl}
                onChange={(event) => setSyringeMl(event.target.value)}
                placeholder="0.3"
              />
              <small>мл</small>
            </div>
          </label>

          <label className={styles.calculator__field}>
            <span>Количество вещества</span>

            <div className={styles.calculator__inputWrap}>
              <input
                type="text"
                inputMode="decimal"
                value={peptideMg}
                onChange={(event) => setPeptideMg(event.target.value)}
                placeholder="5"
              />
              <small>мг</small>
            </div>
          </label>

          <label className={styles.calculator__field}>
            <span>Количество воды</span>

            <div className={styles.calculator__inputWrap}>
              <input
                type="text"
                inputMode="decimal"
                value={waterMl}
                onChange={(event) => setWaterMl(event.target.value)}
                placeholder="1"
              />
              <small>мл</small>
            </div>
          </label>

          <label className={styles.calculator__field}>
            <span>Необходимая дозировка</span>

            <div className={styles.calculator__inputWrap}>
              <input
                type="text"
                inputMode="decimal"
                value={doseMcg}
                onChange={(event) => setDoseMcg(event.target.value)}
                placeholder="50"
              />
              <small>мкг</small>
            </div>
          </label>
        </div>

        <div className={styles.calculator__result}>
          {isOverLimit ? (
            <p className={styles.calculator__error}>
              Для выбранных значений нужно <b>{units.toFixed(1)}</b> дел., но шприц объёмом{' '}
              <b>{syringeMlNumber} мл</b> вмещает только <b>{maxUnits.toFixed(0)}</b> дел. Увеличьте
              объём шприца или измените параметры расчёта.
            </p>
          ) : (
            <p>
              Чтобы получить дозу <b>{doseMcgNumber || 0} мкг</b>, наполните шприц до отметки{' '}
              <b>{safeUnits.toFixed(1)}</b>
            </p>
          )}

          <DoseRuler maxUnits={maxUnits || 100} value={safeUnits} isError={isOverLimit} />
        </div>
      </section>
    </div>,
    document.body,
  )
}
