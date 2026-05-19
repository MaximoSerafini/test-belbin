// Estructura ESTATICA del cuestionario: 7 secciones, cada una con 9 frases.
// Solo guarda el ID de seccion y el rol que mapea cada frase (por posicion).
// El texto de cada frase vive en src/i18n/ (es / en / pt), alineado por indice.

import type { RoleId } from './roles'

export interface SectionMeta {
  id: string
  /** rol de cada una de las 9 frases, en orden; debe coincidir con i18n */
  roles: RoleId[]
}

export const TOTAL_POINTS = 10

export const SECTIONS: SectionMeta[] = [
  { id: 's1', roles: ['cerebro', 'investigador', 'coordinador', 'impulsor', 'evaluador', 'cohesionador', 'implementador', 'finalizador', 'especialista'] },
  { id: 's2', roles: ['impulsor', 'finalizador', 'cerebro', 'investigador', 'especialista', 'coordinador', 'evaluador', 'cohesionador', 'implementador'] },
  { id: 's3', roles: ['implementador', 'cerebro', 'finalizador', 'coordinador', 'investigador', 'evaluador', 'impulsor', 'especialista', 'cohesionador'] },
  { id: 's4', roles: ['cohesionador', 'impulsor', 'cerebro', 'evaluador', 'investigador', 'implementador', 'coordinador', 'finalizador', 'especialista'] },
  { id: 's5', roles: ['evaluador', 'cerebro', 'implementador', 'investigador', 'finalizador', 'coordinador', 'impulsor', 'cohesionador', 'especialista'] },
  { id: 's6', roles: ['impulsor', 'evaluador', 'cerebro', 'investigador', 'implementador', 'coordinador', 'finalizador', 'cohesionador', 'especialista'] },
  { id: 's7', roles: ['cohesionador', 'impulsor', 'cerebro', 'evaluador', 'coordinador', 'investigador', 'implementador', 'finalizador', 'especialista'] },
]

// Puntaje maximo por rol = 1 frase por seccion x 7 secciones x 10 pts = 70
export const MAX_ROLE_SCORE = SECTIONS.length * TOTAL_POINTS
