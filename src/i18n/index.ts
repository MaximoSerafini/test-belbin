import type { RoleId, GroupId } from '../data/roles'
import { es } from './es'
import { en } from './en'
import { pt } from './pt'

export type Lang = 'es' | 'en' | 'pt'

export interface RoleText {
  name: string
  alias: string
  tagline: string
  contribution: string
  description: string
  strengths: string[]
  weaknesses: string[]
}

export interface GroupText {
  label: string
  blurb: string
}

export interface SectionText {
  title: string
  prompt: string
  /** 9 frases, alineadas por indice con SECTIONS[i].roles */
  statements: string[]
}

export interface AboutText {
  scrollHint: string
  whatTitle: string
  whatBody: string
  historyTitle: string
  historyItems: { tag: string; text: string }[]
  advantagesTitle: string
  advantages: { title: string; body: string }[]
}

export interface UIText {
  // intro
  badge: string
  titlePre: string
  titleHi: string
  lead: string // usa {n}
  start: string
  startNew: string
  resume: string
  note: string
  // question
  sectionOf: string // usa {n} y {total}
  pointsDone: string
  youHave: string
  pointOne: string
  pointMany: string
  toAllocate: string
  back: string
  toIntro: string
  next: string
  finish: string
  // calculating
  calculating: string
  // results
  yourRoleIs: string
  yourPrimary: string
  yourGroup: string
  contributionLabel: string
  strengthsLabel: string
  weaknessesLabel: string
  fullProfile: string
  naturalLabel: string
  naturalHint: string
  acceptableLabel: string
  acceptableHint: string
  avoidLabel: string
  avoidHint: string
  worksWith: string
  retake: string
  scoreOf: string // usa {p} para porcentaje
  // langs
  langName: string
}

export interface Translation {
  ui: UIText
  groups: Record<GroupId, GroupText>
  roles: Record<RoleId, RoleText>
  sections: SectionText[]
  about: AboutText
}

export const TRANSLATIONS: Record<Lang, Translation> = { es, en, pt }

export const LANGS: { id: Lang; flag: string; label: string }[] = [
  { id: 'es', flag: '🇪🇸', label: 'Español' },
  { id: 'en', flag: '🇬🇧', label: 'English' },
  { id: 'pt', flag: '🇧🇷', label: 'Português' },
]

const LANG_KEY = 'belbin.lang.v1'

export function detectLang(): Lang {
  try {
    const saved = localStorage.getItem(LANG_KEY)
    if (saved === 'es' || saved === 'en' || saved === 'pt') return saved
  } catch {
    // ignorar
  }
  const nav = navigator.language.slice(0, 2).toLowerCase()
  if (nav === 'en') return 'en'
  if (nav === 'pt') return 'pt'
  return 'es'
}

export function persistLang(lang: Lang): void {
  try {
    localStorage.setItem(LANG_KEY, lang)
  } catch {
    // ignorar
  }
}

/** Reemplaza placeholders tipo {n} en una cadena. */
export function fill(tpl: string, vars: Record<string, string | number>): string {
  return tpl.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? `{${k}}`))
}
