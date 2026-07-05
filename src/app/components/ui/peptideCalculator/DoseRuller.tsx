type Props = {
  maxUnits: number
  value: number
  isError?: boolean
}

export function DoseRuler({ maxUnits, value, isError = false }: Props) {
  const width = 960
  const height = 128
  const start = 36
  const end = width - 36
  const lineY = 58

  const safeValue = Math.min(Math.max(value, 0), maxUnits)
  const progress = start + ((end - start) * safeValue) / maxUnits
  const majorStep = maxUnits <= 30 ? 5 : maxUnits <= 50 ? 5 : 10

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`}>
      <rect
        x={start}
        y={32}
        width={end - start}
        height={38}
        fill="#f7f7f4"
        stroke="rgba(95,95,95,0.14)"
      />

      <rect
        x={start}
        y={32}
        width={Math.max(progress - start, 0)}
        height={38}
        fill={isError ? '#9b5f5f' : '#5f5f5f'}
      />

      <line
        x1={start}
        y1={lineY}
        x2={end}
        y2={lineY}
        stroke="rgba(66,66,66,0.52)"
        strokeWidth="2"
      />

      {Array.from({ length: Math.round(maxUnits) + 1 }).map((_, i) => {
        const x = start + ((end - start) * i) / maxUnits
        const isMajor = i % majorStep === 0
        const isMiddle = i % 5 === 0

        return (
          <g key={i}>
            <line
              x1={x}
              y1={lineY}
              x2={x}
              y2={isMajor ? 18 : isMiddle ? 30 : 42}
              stroke="rgba(45,45,45,0.72)"
              strokeWidth={isMajor ? 2.4 : isMiddle ? 1.5 : 1}
            />

            {isMajor && (
              <text x={x} y={108} textAnchor="middle" fontSize="19" fontWeight="600" fill="#6a6a6a">
                {i}
              </text>
            )}
          </g>
        )
      })}

      <line
        x1={progress}
        y1={14}
        x2={progress}
        y2={62}
        stroke={isError ? '#9b5f5f' : '#4f4f4f'}
        strokeWidth="3"
      />
    </svg>
  )
}
