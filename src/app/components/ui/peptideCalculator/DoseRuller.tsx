type Props = {
  maxUnits: number
  value: number
}

export function DoseRuler({ maxUnits, value }: Props) {
  const width = 900
  const start = 30
  const end = width - 30

  const safeValue = Math.min(value, maxUnits)

  const progress = start + ((end - start) * safeValue) / maxUnits

  const majorStep = maxUnits === 100 ? 10 : maxUnits === 50 ? 5 : 5

  return (
    <svg width="100%" viewBox={`0 0 ${width} 120`}>
      <line x1={start} y1={50} x2={end} y2={50} stroke="currentColor" strokeWidth="2" />

      {Array.from({
        length: maxUnits + 1,
      }).map((_, i) => {
        const x = start + ((end - start) * i) / maxUnits

        const major = i % majorStep === 0

        return (
          <g key={i}>
            <line x1={x} y1={50} x2={x} y2={major ? 18 : 34} stroke="currentColor" />

            {major && (
              <text x={x} y={85} textAnchor="middle" fontSize="14">
                {i}
              </text>
            )}
          </g>
        )
      })}

      <rect x={start} y={18} width={progress - start} height={32} rx={6} />
    </svg>
  )
}
