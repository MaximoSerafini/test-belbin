// Metadatos ESTATICOS de los 9 roles (no dependen del idioma).
// El texto traducible (nombre, descripcion, etc.) vive en src/i18n/.

import {
  Lightbulb,
  Compass,
  Target,
  Flame,
  Scale,
  Handshake,
  Cog,
  BadgeCheck,
  GraduationCap,
  type LucideIcon,
} from 'lucide-react'

export type RoleId =
  | 'cerebro'
  | 'investigador'
  | 'coordinador'
  | 'impulsor'
  | 'evaluador'
  | 'cohesionador'
  | 'implementador'
  | 'finalizador'
  | 'especialista'

export type GroupId = 'accion' | 'mental' | 'social'

export interface RoleMeta {
  id: RoleId
  icon: LucideIcon
  group: GroupId
  color: string
  worksWellWith: RoleId[]
}

export const ROLE_META: Record<RoleId, RoleMeta> = {
  cerebro: { id: 'cerebro', icon: Lightbulb, group: 'mental', color: '#a78bfa', worksWellWith: ['coordinador', 'evaluador'] },
  investigador: { id: 'investigador', icon: Compass, group: 'social', color: '#38bdf8', worksWellWith: ['cohesionador', 'impulsor'] },
  coordinador: { id: 'coordinador', icon: Target, group: 'social', color: '#fbbf24', worksWellWith: ['cerebro', 'cohesionador'] },
  impulsor: { id: 'impulsor', icon: Flame, group: 'accion', color: '#f87171', worksWellWith: ['investigador', 'evaluador'] },
  evaluador: { id: 'evaluador', icon: Scale, group: 'mental', color: '#818cf8', worksWellWith: ['cerebro', 'impulsor'] },
  cohesionador: { id: 'cohesionador', icon: Handshake, group: 'social', color: '#34d399', worksWellWith: ['coordinador', 'investigador'] },
  implementador: { id: 'implementador', icon: Cog, group: 'accion', color: '#fb923c', worksWellWith: ['cerebro', 'coordinador'] },
  finalizador: { id: 'finalizador', icon: BadgeCheck, group: 'accion', color: '#f472b6', worksWellWith: ['implementador', 'coordinador'] },
  especialista: { id: 'especialista', icon: GraduationCap, group: 'mental', color: '#2dd4bf', worksWellWith: ['coordinador', 'evaluador'] },
}

export const ROLE_ORDER: RoleId[] = [
  'cerebro',
  'investigador',
  'coordinador',
  'impulsor',
  'evaluador',
  'cohesionador',
  'implementador',
  'finalizador',
  'especialista',
]

export const GROUP_ORDER: GroupId[] = ['accion', 'mental', 'social']
