import { ChevronDown } from 'lucide-react'
import { ROLE_META, ROLE_ORDER, GROUP_ORDER } from '../data/roles'
import { SECTIONS } from '../data/questions'
import { fill, type Lang, type Translation } from '../i18n'
import LanguagePicker from './LanguagePicker'

interface Props {
  t: Translation
  lang: Lang
  onLang: (l: Lang) => void
  onStart: () => void
  hasProgress: boolean
  onResume: () => void
}

export default function Intro({ t, lang, onLang, onStart, hasProgress, onResume }: Props) {
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="screen intro fade-in">
      <LanguagePicker value={lang} onChange={onLang} />

      {/* ---- primera vista ---- */}
      <div className="intro-hero">
        <div className="intro-badge">
          <span className="badge-dot" />
          {t.ui.badge}
        </div>
        <h1 className="intro-title">
          {t.ui.titlePre} <span className="grad-text">{t.ui.titleHi}</span>
        </h1>
        <p className="intro-lead">{fill(t.ui.lead, { n: SECTIONS.length })}</p>

        {/* cada grupo con sus 3 roles debajo, centrados */}
        <div className="group-cards">
          {GROUP_ORDER.map((g, gi) => {
            const rolesOfGroup = ROLE_ORDER.filter((id) => ROLE_META[id].group === g)
            return (
              <div
                key={g}
                className={`group-card group-${g}`}
                style={{ animationDelay: `${gi * 90}ms` }}
              >
                <h3>{t.groups[g].label}</h3>
                <p>{t.groups[g].blurb}</p>
                <div className="group-roles">
                  {rolesOfGroup.map((id) => {
                    const Icon = ROLE_META[id].icon
                    return (
                      <div
                        key={id}
                        className="role-chip"
                        style={{ borderColor: ROLE_META[id].color }}
                      >
                        <Icon size={17} color={ROLE_META[id].color} strokeWidth={2.2} />
                        <span className="role-chip-name">{t.roles[id].name}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        <div className="intro-actions">
          <button className="btn btn-primary btn-lg" onClick={onStart}>
            {hasProgress ? t.ui.startNew : t.ui.start}
          </button>
          {hasProgress && (
            <button className="btn btn-ghost btn-lg" onClick={onResume}>
              {t.ui.resume}
            </button>
          )}
        </div>

        <p className="intro-note">{t.ui.note}</p>

        <button className="scroll-hint" onClick={scrollToAbout}>
          <span>{t.about.scrollHint}</span>
          <ChevronDown className="scroll-chevron" size={22} />
        </button>
      </div>

      {/* ---- info del test ---- */}
      <section id="about" className="about">
        <div className="about-block">
          <h2 className="about-h2">{t.about.whatTitle}</h2>
          <p className="about-lead">{t.about.whatBody}</p>
        </div>

        <div className="about-block">
          <h2 className="about-h2">{t.about.historyTitle}</h2>
          <ol className="timeline">
            {t.about.historyItems.map((it, i) => (
              <li key={i} className="timeline-item">
                <span className="timeline-tag">{it.tag}</span>
                <p className="timeline-text">{it.text}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="about-block">
          <h2 className="about-h2">{t.about.advantagesTitle}</h2>
          <div className="adv-grid">
            {t.about.advantages.map((a, i) => (
              <div key={i} className="adv-card">
                <span className="adv-num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{a.title}</h3>
                <p>{a.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="about-cta">
          <button className="btn btn-primary btn-lg" onClick={onStart}>
            {hasProgress ? t.ui.startNew : t.ui.start}
          </button>
        </div>
      </section>
    </div>
  )
}
