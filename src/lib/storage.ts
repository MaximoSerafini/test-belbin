import type { Answers, Result } from './scoring'

const PROGRESS_KEY = 'belbin.progress.v1'
const HISTORY_KEY = 'belbin.history.v1'

interface Progress {
  answers: Answers
  sectionIndex: number
}

export function saveProgress(p: Progress): void {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(p))
  } catch {
    // localStorage no disponible: el test sigue funcionando en memoria
  }
}

export function loadProgress(): Progress | null {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY)
    return raw ? (JSON.parse(raw) as Progress) : null
  } catch {
    return null
  }
}

export function clearProgress(): void {
  try {
    localStorage.removeItem(PROGRESS_KEY)
  } catch {
    // ignorar
  }
}

export function saveResult(result: Result): void {
  try {
    const history = loadHistory()
    history.unshift(result)
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, 20)))
  } catch {
    // ignorar
  }
}

export function loadHistory(): Result[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY)
    return raw ? (JSON.parse(raw) as Result[]) : []
  } catch {
    return []
  }
}
