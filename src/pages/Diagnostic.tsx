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
    <div>
      <ProgressBar current={step + 1} total={diagnosticQuestions.length} />
      <h2 className="font-display text-xl font-semibold text-white mb-1">{q.question}</h2>
      <p className="text-xs text-slate-500 mb-5">Tap the option that fits you best</p>

      <ul className="space-y-2 mb-6">
        {q.options.map((opt) => (
          <li key={opt}>
            <button
              type="button"
              onClick={() => selectOption(opt)}
              className={`w-full text-left rounded-xl px-4 py-3.5 text-sm font-medium transition-all border ${
                selected === opt
                  ? 'bg-indigo-600/30 border-indigo-500 text-white ring-1 ring-indigo-400/50'
                  : 'bg-slate-900/80 border-slate-700 text-slate-300 hover:border-slate-500'
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
  )
}
