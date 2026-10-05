import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/Button'
import { ProgressBar } from '../components/ProgressBar'
import { startDiagnosticTracking, useApp } from '../context/AppContext'
import { pathWithCampaign } from '../lib/campaignAttribution'
import { diagnosticQuestions } from '../data/diagnosticQuestions'
import type { DiagnosticAnswers } from '../types'

export function Diagnostic() {
  const navigate = useNavigate()
  const { setAnswers, attribution } = useApp()
  const [step, setStep] = useState(0)
  const [draft, setDraft] = useState<Partial<DiagnosticAnswers>>({})
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (!started) {
      startDiagnosticTracking()
      setStarted(true)
    }
  }, [started])

  const q = diagnosticQuestions[step]
  if (!q) return null

  const selected = draft[q.id]

  function selectOption(value: string) {
    setDraft((d) => ({ ...d, [q.id]: value }))
  }

  function next() {
    if (!selected) return
    if (step < diagnosticQuestions.length - 1) {
      setStep((s) => s + 1)
    } else {
      setAnswers(draft as DiagnosticAnswers)
      navigate(pathWithCampaign('/result', attribution))
    }
  }

  function back() {
    if (step === 0) navigate(pathWithCampaign('/', attribution))
    else setStep((s) => s - 1)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-7 xl:col-span-6">
        <ProgressBar current={step + 1} total={diagnosticQuestions.length} />
        <h2 className="font-display text-2xl font-semibold text-ink mb-1">{q.question}</h2>
        <p className="text-xs text-muted mb-5">Tap the option that fits you best</p>

        <ul className="space-y-2 mb-6">
          {q.options.map((opt) => (
            <li key={opt}>
              <button
                type="button"
                onClick={() => selectOption(opt)}
                className={`w-full text-left rounded-xl px-4 py-3.5 text-sm font-medium transition-all border min-h-12 ${
                  selected === opt
                    ? 'bg-brand-soft border-brand text-ink ring-1 ring-brand/30'
                    : 'bg-card border-line text-ink-soft hover:border-brand/40'
                }`}
              >
                {opt}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex gap-2">
          <Button variant="ghost" className="!w-auto flex-1" onClick={back}>
            Back
          </Button>
          <Button className="flex-[2]" disabled={!selected} onClick={next}>
            {step === diagnosticQuestions.length - 1 ? 'See my match' : 'Next'}
          </Button>
        </div>
      </div>

      <aside className="hidden lg:block lg:col-span-5 xl:col-span-4 lg:col-start-9">
        <div className="card p-5 sticky top-24">
          <p className="eyebrow mb-2">Why we ask</p>
          <p className="text-sm text-ink-soft leading-relaxed">
            Branch, skill, interest, goal, and time are what the recommendation uses — not a generic
            “intro to AI” quiz. Your answers stay with the registration so the workshop and roadmap
            match you.
          </p>
          <p className="text-xs text-muted mt-3">30 seconds · 5 questions · no account required yet</p>
        </div>
      </aside>
    </div>
  )
}
