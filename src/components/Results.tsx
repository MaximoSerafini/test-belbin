import { Dumbbell, TriangleAlert, Handshake, Star, ThumbsUp, Ban, RotateCcw } from 'lucide-react'
import { ROLE_META } from '../data/roles'
import type { RoleId } from '../data/roles'
import type { Result } from '../lib/scoring'
import { fill, type Translation } from '../i18n'
import Confetti from './Confetti'
import RadarChart from './RadarChart'

interface Props {
  t: Translation
  result: Result
  onRetake: () => void
}

export default function Results({ t, result, onRetake }: Props) {
  const primary = result.primary
  const meta = ROLE_META[primary]
  const PrimaryIcon = meta.icon
  const role = t.roles[primary]
  const group = t.groups[meta.group]
  const primaryScore = result.scores.find((s) => s.role === primary)!

  const confettiColors = [meta.color, '#c5f23d', '#ff6a4d', '#f3f0ea']

  const RoleMini = ({ id }: { id: RoleId }) => {
    const Icon = ROLE_META[id].icon
    return (
      <div className="mini-role" style={{ borderColor: ROLE_META[id].color }}>
        <Icon size={18} color={ROLE_META[id].color} strokeWidth={2.2} />
        <span className="mini-name">{t.roles[id].name}</span>
      </div>
    )
  }

  return (
    <div className="screen results">
      <Confetti colors={confettiColors} />

      {/* ---- Reveal del rol principal ---- */}
      <div className="reveal-stage">
        <div className="reveal-label">{t.ui.yourRoleIs}</div>
        <div
          className="hero-card pop-in"
          style={{
            ['--accent' as string]: meta.color,
            boxShadow: `0 0 80px ${meta.color}55`,
          }}
        >
          <div className="hero-glow" style={{ background: meta.color }} />
          <div className="hero-badge">{t.ui.yourPrimary}</div>
          <div className="hero-emoji bounce-in">
            <PrimaryIcon size={86} color={meta.color} strokeWidth={1.7} />
          </div>
          <h1 className="hero-name">{role.name}</h1>
          <div className="hero-alias">{role.alias}</div>
          <p className="hero-tagline">"{role.tagline}"</p>
          <div className="hero-meta">
            <span className={`pill pill-group group-${meta.group}`}>{group.label}</span>
            <span className="pill pill-score">
              {fill(t.ui.scoreOf, { p: primaryScore.percent })}
            </span>
          </div>
        </div>
      </div>

      {/* ---- Detalle del rol ---- */}
      <div className="detail-grid fade-in-up">
        <p className="role-description">{role.description}</p>

        <div className="detail-card">
          <h3>{t.ui.contributionLabel}</h3>
          <p>{role.contribution}</p>
        </div>

        <div className="detail-two">
          <div className="detail-card good">
            <h3>
              <Dumbbell size={17} /> {t.ui.strengthsLabel}
            </h3>
            <ul>
              {role.strengths.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
          <div className="detail-card warn">
            <h3>
              <TriangleAlert size={17} /> {t.ui.weaknessesLabel}
            </h3>
            <ul>
              {role.weaknesses.map((w) => (
                <li key={w}>{w}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="detail-card">
          <h3>
            <Handshake size={17} /> {t.ui.worksWith}
          </h3>
          <div className="mini-role-row">
            {meta.worksWellWith.map((id) => (
              <RoleMini key={id} id={id} />
            ))}
          </div>
        </div>
      </div>

      {/* ---- Perfil completo: radar + ranking ---- */}
      <div className="profile-section fade-in-up">
        <h2 className="section-h2">{t.ui.fullProfile}</h2>
        <div className="profile-grid">
          <RadarChart scores={result.scores} accent={meta.color} />
          <ul className="rank-list">
            {result.scores.map((s, i) => {
              const Icon = ROLE_META[s.role].icon
              return (
                <li key={s.role} className="rank-row">
                  <span className="rank-num">{i + 1}</span>
                  <Icon size={18} color={ROLE_META[s.role].color} strokeWidth={2.2} />
                  <span className="rank-name">{t.roles[s.role].name}</span>
                  <span className="rank-bar-track">
                    <span
                      className="rank-bar-fill"
                      style={{
                        width: `${s.percent}%`,
                        background: ROLE_META[s.role].color,
                        animationDelay: `${i * 70}ms`,
                      }}
                    />
                  </span>
                  <span className="rank-pts">{s.points}</span>
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      {/* ---- 3 / 3 / 3 ---- */}
      <div className="triad fade-in-up">
        <div className="triad-col triad-natural">
          <h3>
            <Star size={17} /> {t.ui.naturalLabel}
          </h3>
          <p className="triad-hint">{t.ui.naturalHint}</p>
          {result.natural.map((id) => (
            <RoleMini key={id} id={id} />
          ))}
        </div>
        <div className="triad-col triad-acceptable">
          <h3>
            <ThumbsUp size={17} /> {t.ui.acceptableLabel}
          </h3>
          <p className="triad-hint">{t.ui.acceptableHint}</p>
          {result.acceptable.map((id) => (
            <RoleMini key={id} id={id} />
          ))}
        </div>
        <div className="triad-col triad-avoid">
          <h3>
            <Ban size={17} /> {t.ui.avoidLabel}
          </h3>
          <p className="triad-hint">{t.ui.avoidHint}</p>
          {result.avoid.map((id) => (
            <RoleMini key={id} id={id} />
          ))}
        </div>
      </div>

      <div className="results-actions">
        <button className="btn btn-primary btn-lg" onClick={onRetake}>
          <RotateCcw size={18} /> {t.ui.retake}
        </button>
      </div>
    </div>
  )
}
