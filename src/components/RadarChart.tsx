import { ROLE_META } from '../data/roles'
import type { RoleScore } from '../lib/scoring'

interface Props {
  scores: RoleScore[]
  accent: string
}

// Radar SVG de los 9 roles, dibujado a mano (sin libreria de charts).
export default function RadarChart({ scores, accent }: Props) {
  const size = 320
  const cx = size / 2
  const cy = size / 2
  const r = size / 2 - 56
  const n = scores.length

  // angulo por eje, arrancando arriba
  const angle = (i: number) => (Math.PI * 2 * i) / n - Math.PI / 2
  const point = (i: number, radius: number) => ({
    x: cx + Math.cos(angle(i)) * radius,
    y: cy + Math.sin(angle(i)) * radius,
  })

  const rings = [0.25, 0.5, 0.75, 1]

  // poligono de datos
  const dataPts = scores.map((s, i) => {
    const radius = r * Math.max(0.04, s.percent / 100)
    return point(i, radius)
  })
  const dataPath = dataPts.map((p) => `${p.x},${p.y}`).join(' ')

  return (
    <svg
      className="radar"
      viewBox={`0 0 ${size} ${size}`}
      role="img"
      aria-label="Grafico de los 9 roles de equipo"
    >
      {/* anillos de fondo */}
      {rings.map((ring) => (
        <polygon
          key={ring}
          points={scores
            .map((_, i) => {
              const p = point(i, r * ring)
              return `${p.x},${p.y}`
            })
            .join(' ')}
          fill="none"
          stroke="rgba(255,255,255,0.10)"
          strokeWidth={1}
        />
      ))}

      {/* ejes */}
      {scores.map((_, i) => {
        const p = point(i, r)
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={p.x}
            y2={p.y}
            stroke="rgba(255,255,255,0.10)"
            strokeWidth={1}
          />
        )
      })}

      {/* poligono de datos */}
      <polygon points={dataPath} fill={accent} fillOpacity={0.28} stroke={accent} strokeWidth={2} />

      {/* puntos + iconos */}
      {dataPts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={3.5} fill={accent} />
      ))}
      {scores.map((s, i) => {
        const p = point(i, r + 26)
        const Icon = ROLE_META[s.role].icon
        const sz = 19
        return (
          <Icon
            key={s.role}
            x={p.x - sz / 2}
            y={p.y - sz / 2}
            width={sz}
            height={sz}
            color={ROLE_META[s.role].color}
            strokeWidth={2.4}
          />
        )
      })}
    </svg>
  )
}
