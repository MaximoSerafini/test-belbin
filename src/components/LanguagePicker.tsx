import { LANGS, type Lang } from '../i18n'

interface Props {
  value: Lang
  onChange: (lang: Lang) => void
}

// Selector de idioma: 3 botones con bandera.
export default function LanguagePicker({ value, onChange }: Props) {
  return (
    <div className="lang-picker" role="group" aria-label="Idioma / Language">
      {LANGS.map((l) => (
        <button
          key={l.id}
          className={`lang-btn ${value === l.id ? 'active' : ''}`}
          onClick={() => onChange(l.id)}
          aria-pressed={value === l.id}
          title={l.label}
        >
          <span className="lang-flag">{l.flag}</span>
          <span className="lang-label">{l.label}</span>
        </button>
      ))}
    </div>
  )
}
