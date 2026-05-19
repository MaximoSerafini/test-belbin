import { SECTIONS, TOTAL_POINTS } from '../data/questions'
import { sectionTotal } from '../lib/scoring'
import { fill, type Translation } from '../i18n'

interface Props {
  t: Translation
  sectionIndex: number
  values: number[]
  onChange: (statementIndex: number, value: number) => void
  onNext: () => void
  onBack: () => void
}

export default function Question({ t, sectionIndex, values, onChange, onNext, onBack }: Props) {
  const section = SECTIONS[sectionIndex]
  const sectionText = t.sections[sectionIndex]
  const used = sectionTotal(values)
  const remaining = TOTAL_POINTS - used
  const complete = remaining === 0
  const progress = ((sectionIndex + (complete ? 1 : 0)) / SECTIONS.length) * 100

  const inc = (i: number) => {
    if (remaining > 0) onChange(i, values[i] + 1)
  }
  const dec = (i: number) => {
    if (values[i] > 0) onChange(i, values[i] - 1)
  }

  return (
    <div className="screen question fade-in" key={section.id}>
      <div className="progress-wrap">
        <div className="progress-meta">
          <span>{fill(t.ui.sectionOf, { n: sectionIndex + 1, total: SECTIONS.length })}</span>
          <span className="progress-title">{sectionText.title}</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <h2 className="question-prompt">{sectionText.prompt}</h2>

      <div className={`points-pill ${complete ? 'done' : ''}`}>
        {complete ? (
          <>{t.ui.pointsDone}</>
        ) : (
          <>
            {t.ui.youHave} <strong>{remaining}</strong>{' '}
            {remaining === 1 ? t.ui.pointOne : t.ui.pointMany} {t.ui.toAllocate}
          </>
        )}
      </div>

      <ul className="statements">
        {sectionText.statements.map((text, i) => {
          const v = values[i]
          return (
            <li key={i} className={`statement ${v > 0 ? 'active' : ''}`}>
              <span className="statement-text">{text}</span>
              <div className="stepper">
                <button
                  className="step-btn"
                  onClick={() => dec(i)}
                  disabled={v === 0}
                  aria-label="-1"
                >
                  −
                </button>
                <span className="step-value">{v}</span>
                <button
                  className="step-btn"
                  onClick={() => inc(i)}
                  disabled={remaining === 0}
                  aria-label="+1"
                >
                  +
                </button>
              </div>
            </li>
          )
        })}
      </ul>

      <div className="question-actions">
        <button className="btn btn-ghost" onClick={onBack}>
          {sectionIndex === 0 ? t.ui.toIntro : t.ui.back}
        </button>
        <button className="btn btn-primary" onClick={onNext} disabled={!complete}>
          {sectionIndex === SECTIONS.length - 1 ? t.ui.finish : t.ui.next}
        </button>
      </div>
    </div>
  )
}
