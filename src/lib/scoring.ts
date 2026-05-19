import { ROLE_ORDER, type RoleId } from '../data/roles'
import { SECTIONS, MAX_ROLE_SCORE } from '../data/questions'

// answers: por cada seccion, un array de 9 numeros alineado con SECTIONS[i].roles
export type Answers = Record<string, number[]>

export interface RoleScore {
  role: RoleId
  points: number
  percent: number // 0-100 respecto del maximo posible
}

export interface Result {
  scores: RoleScore[] // ordenado de mayor a menor
  primary: RoleId
  natural: RoleId[] // 3 puntajes mas altos
  acceptable: RoleId[] // 3 puntajes del medio
  avoid: RoleId[] // 3 puntajes mas bajos
  finishedAt: number
}

export function emptyAnswers(): Answers {
  const a: Answers = {}
  for (const s of SECTIONS) a[s.id] = new Array(s.roles.length).fill(0)
  return a
}

export function sectionTotal(values: number[]): number {
  return values.reduce((acc, n) => acc + n, 0)
}

export function computeResult(answers: Answers): Result {
  const totals: Record<RoleId, number> = {
    cerebro: 0, investigador: 0, coordinador: 0, impulsor: 0,
    evaluador: 0, cohesionador: 0, implementador: 0, finalizador: 0, especialista: 0,
  }

  for (const section of SECTIONS) {
    const values = answers[section.id] ?? []
    section.roles.forEach((role, i) => {
      totals[role] += values[i] ?? 0
    })
  }

  const scores: RoleScore[] = ROLE_ORDER.map((role) => ({
    role,
    points: totals[role],
    percent: Math.round((totals[role] / MAX_ROLE_SCORE) * 100),
  })).sort((a, b) => b.points - a.points)

  return {
    scores,
    primary: scores[0].role,
    natural: scores.slice(0, 3).map((s) => s.role),
    acceptable: scores.slice(3, 6).map((s) => s.role),
    avoid: scores.slice(6, 9).map((s) => s.role),
    finishedAt: Date.now(),
  }
}
