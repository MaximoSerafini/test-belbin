import { useEffect } from 'react'
import { Puzzle } from 'lucide-react'
import { ROLE_META, ROLE_ORDER } from '../data/roles'
import type { Translation } from '../i18n'

interface Props {
  t: Translation
  onDone: () => void
}

// Pantalla de transicion antes del reveal. Da suspenso ~1.9s.
export default function Calculating({ t, onDone }: Props) {
  useEffect(() => {
    const id = setTimeout(onDone, 1900)
    return () => clearTimeout(id)
  }, [onDone])

  return (
    <div className="screen calculating fade-in">
      <div className="calc-orbit">
        {ROLE_ORDER.map((id, i) => {
          const Icon = ROLE_META[id].icon
          return (
            <span
              key={id}
              className="calc-dot"
              style={{
                ['--i' as string]: i,
                background: ROLE_META[id].color,
              }}
            >
              <Icon size={20} color="#100f12" strokeWidth={2.4} />
            </span>
          )
        })}
        <div className="calc-core">
          <Puzzle size={32} strokeWidth={2} />
        </div>
      </div>
      <p className="calc-text">{t.ui.calculating}</p>
    </div>
  )
}
