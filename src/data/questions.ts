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

// Clave de puntuacion oficial del Belbin Self-Perception Inventory.
// Cada frase (a-i, por indice) suma al rol indicado. Roles internos:
// cerebro=Plant, investigador=Resource Investigator, coordinador=Co-ordinator,
// impulsor=Shaper, evaluador=Monitor Evaluator, cohesionador=Teamworker,
// implementador=Implementer, finalizador=Completer Finisher, especialista=Specialist.
export const SECTIONS: SectionMeta[] = [
  { id: 's1', roles: ['investigador', 'cohesionador', 'cerebro', 'coordinador', 'finalizador', 'impulsor', 'implementador', 'evaluador', 'especialista'] },
  { id: 's2', roles: ['implementador', 'coordinador', 'investigador', 'evaluador', 'impulsor', 'cohesionador', 'cerebro', 'finalizador', 'especialista'] },
  { id: 's3', roles: ['coordinador', 'finalizador', 'impulsor', 'cerebro', 'cohesionador', 'investigador', 'evaluador', 'implementador', 'especialista'] },
  { id: 's4', roles: ['cohesionador', 'impulsor', 'evaluador', 'implementador', 'cerebro', 'finalizador', 'investigador', 'coordinador', 'especialista'] },
  { id: 's5', roles: ['evaluador', 'implementador', 'cohesionador', 'impulsor', 'investigador', 'coordinador', 'finalizador', 'cerebro', 'especialista'] },
  { id: 's6', roles: ['cerebro', 'cohesionador', 'coordinador', 'finalizador', 'evaluador', 'implementador', 'impulsor', 'investigador', 'especialista'] },
  { id: 's7', roles: ['impulsor', 'evaluador', 'finalizador', 'investigador', 'implementador', 'cerebro', 'coordinador', 'cohesionador', 'especialista'] },
]

// Puntaje maximo por rol = 1 frase por seccion x 7 secciones x 10 pts = 70
export const MAX_ROLE_SCORE = SECTIONS.length * TOTAL_POINTS
