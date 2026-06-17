'use client'

import { useMemo, useState } from 'react'
import styles from './PeptideCalculator.module.scss'
import { DoseRuler } from './DoseRuller'

const syringeOptions = [
  {
    label: '0.3 мл',
    volume: 0.3,
    maxUnits: 30,
  },
  {
    label: '0.5 мл',
    volume: 0.5,
    maxUnits: 50,
  },
  {
    label: '1 мл',
    volume: 1,
    maxUnits: 100,
  },
]

const peptideOptions = [5, 10, 15, 20, 30, 40, 50, 60]

const waterOptions = [1, 2, 3, 10]

const doseOptions = [50, 100, 250, 500, 1000, 2000, 5000]

type OptionGroupProps<T> = {
  title: string
  values: T[]
  active: T
  onSelect: (value: T) => void
  suffix?: string
  getLabel?: (value: T) => string
}

function OptionGroup<T>({
  title,
  values,
  active,
  onSelect,
  suffix,
  getLabel,
}: OptionGroupProps<T>) {
  return (
    <div className={styles.group}>
      <h4>{title}</h4>

      <div className={styles.options}>
        {values.map((value) => {
          const label = getLabel ? getLabel(value) : `${value}${suffix ? ` ${suffix}` : ''}`

          const activeLabel = getLabel ? getLabel(active) : String(active)

          const isActive = label === activeLabel

          return (
            <button
              key={label}
              type="button"
              className={`${styles.option} ${isActive ? styles.optionActive : ''}`}
              onClick={() => onSelect(value)}
            >
              {label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default function PeptideCalculator() {
  const [syringe, setSyringe] = useState(syringeOptions[0])

  const [peptideMg, setPeptideMg] = useState(5)
  const [waterMl, setWaterMl] = useState(1)
  const [doseMcg, setDoseMcg] = useState(50)

  const units = useMemo(() => {
    return (waterMl * doseMcg) / (peptideMg * 10)
  }, [peptideMg, waterMl, doseMcg])

  return (
    <section className={styles.calculator}>
      <OptionGroup
        title="1. Объем шприца"
        values={syringeOptions}
        active={syringe}
        onSelect={(item) => setSyringe(item)}
        getLabel={(item) => item.label}
      />

      <OptionGroup
        title="2. Количество вещества"
        values={peptideOptions}
        active={peptideMg}
        onSelect={setPeptideMg}
        suffix="мг"
      />

      <OptionGroup
        title="3. Количество воды"
        values={waterOptions}
        active={waterMl}
        onSelect={setWaterMl}
        suffix="мл"
      />

      <OptionGroup
        title="4. Необходимая дозировка"
        values={doseOptions}
        active={doseMcg}
        onSelect={setDoseMcg}
        suffix="мкг"
      />

      <div className={styles.result}>
        <h3>
          Чтобы получить дозу <b>{doseMcg} мкг</b> наполните шприц до отметки{' '}
          <b>{units.toFixed(1)}</b>
        </h3>

        <DoseRuler maxUnits={syringe.maxUnits} value={units} />
      </div>
    </section>
  )
}
