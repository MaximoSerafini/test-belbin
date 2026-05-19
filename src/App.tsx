import { useEffect, useMemo, useState } from 'react'
import { SECTIONS } from './data/questions'
import {
  computeResult,
  emptyAnswers,
  type Answers,
  type Result,
} from './lib/scoring'
import {
  clearProgress,
  loadProgress,
  saveProgress,
  saveResult,
} from './lib/storage'
import {
  TRANSLATIONS,
  detectLang,
  persistLang,
  type Lang,
} from './i18n'
import Intro from './components/Intro'
import Question from './components/Question'
import Calculating from './components/Calculating'
import Results from './components/Results'

type Screen = 'intro' | 'test' | 'calculating' | 'results'

export default function App() {
  const [lang, setLang] = useState<Lang>(() => detectLang())
  const [screen, setScreen] = useState<Screen>('intro')
  const [answers, setAnswers] = useState<Answers>(() => emptyAnswers())
  const [sectionIndex, setSectionIndex] = useState(0)
  const [result, setResult] = useState<Result | null>(null)

  // progreso guardado: solo se lee una vez, al inicio
  const [savedProgress] = useState(() => loadProgress())
  const hasProgress = !!savedProgress && savedProgress.sectionIndex > 0

  const t = TRANSLATIONS[lang]

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = t.ui.badge
  }, [lang, t])

  const changeLang = (l: Lang) => {
    setLang(l)
    persistLang(l)
  }

  const startFresh = () => {
    setAnswers(emptyAnswers())
    setSectionIndex(0)
    setResult(null)
    clearProgress()
    setScreen('test')
  }

  const resume = () => {
    if (!savedProgress) return startFresh()
    setAnswers(savedProgress.answers)
    setSectionIndex(savedProgress.sectionIndex)
    setScreen('test')
  }

  const currentSectionId = SECTIONS[sectionIndex].id
  const currentValues = useMemo(
    () => answers[currentSectionId] ?? new Array(9).fill(0),
    [answers, currentSectionId],
  )

  const handleChange = (statementIndex: number, value: number) => {
    setAnswers((prev) => {
      const next = { ...prev }
      const arr = [...(next[currentSectionId] ?? new Array(9).fill(0))]
      arr[statementIndex] = value
      next[currentSectionId] = arr
      return next
    })
  }

  const handleNext = () => {
    if (sectionIndex < SECTIONS.length - 1) {
      const nextIndex = sectionIndex + 1
      setSectionIndex(nextIndex)
      saveProgress({ answers, sectionIndex: nextIndex })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      const r = computeResult(answers)
      setResult(r)
      saveResult(r)
      clearProgress()
      setScreen('calculating')
    }
  }

  const handleBack = () => {
    if (sectionIndex === 0) {
      setScreen('intro')
    } else {
      const prevIndex = sectionIndex - 1
      setSectionIndex(prevIndex)
      saveProgress({ answers, sectionIndex: prevIndex })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const retake = () => {
    setResult(null)
    setScreen('intro')
    window.scrollTo({ top: 0 })
  }

  return (
    <div className="app">
      <main className="app-main">
        {screen === 'intro' && (
          <Intro
            t={t}
            lang={lang}
            onLang={changeLang}
            onStart={startFresh}
            hasProgress={hasProgress}
            onResume={resume}
          />
        )}

        {screen === 'test' && (
          <Question
            t={t}
            sectionIndex={sectionIndex}
            values={currentValues}
            onChange={handleChange}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}

        {screen === 'calculating' && (
          <Calculating t={t} onDone={() => setScreen('results')} />
        )}

        {screen === 'results' && result && (
          <Results t={t} result={result} onRetake={retake} />
        )}
      </main>

      <footer className="app-footer">
        <span>{t.ui.badge}</span>
      </footer>
    </div>
  )
}
