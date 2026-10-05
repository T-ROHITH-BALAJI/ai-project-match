import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../components/Button'
import { JourneyNav } from '../components/JourneyNav'
import { useApp } from '../context/AppContext'
import { WORKSHOP } from '../data/workshop'
import { copyJoiningDetails } from '../lib/joining'

const reminders = [
  {
    id: 't0',
    timing: 'T+0',
    when: 'Right now — registration confirmation',
    headline: 'You’re registered.',
    action: 'Save joining details and add the workshop to your calendar.',
  },
  {
    id: '24h',
    timing: '24 hours before',
    when: 'Workshop reminder',
    headline: 'Your AI workshop is tomorrow.',
    action: 'Block 60 minutes and confirm your laptop is ready.',
  },
  {
    id: '1h',
    timing: '1 hour before',
    when: 'Workshop reminder',
    headline: 'Your AI workshop starts in 1 hour.',
    action: 'Open the join link and keep Meeting ID + passcode handy.',
  },
  {
    id: '10m',
    timing: '10 minutes before',
    when: 'Final reminder',
    headline: 'Starting soon — grab water and open your laptop.',
    action: 'Join now with the details below.',
  },
]

export function Reminders() {
  const navigate = useNavigate()
  const { session } = useApp()
  const [copiedId, setCopiedId] = useState<string | null>(null)

  useEffect(() => {
    if (!session.registration) navigate('/register', { replace: true })
  }, [session.registration, navigate])

  if (!session.registration) return null

  const project = session.project?.name ?? 'Your AI project'

  async function copy(id: string) {
    const ok = await copyJoiningDetails()
    if (ok) {
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    }
  }

  return (
    <div>
      <JourneyNav />
      <h1 className="font-display text-3xl font-bold text-ink mb-1">Automated reminders</h1>
      <p className="text-sm text-ink-soft mb-2 max-w-2xl">
        Simulated notification flow — in production these connect to email/WhatsApp APIs. Each message
        includes workshop name, time, joining details, and a clear action.
      </p>
      <p className="text-xs text-muted mb-6">Prototype simulation · No real messages are sent</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reminders.map((r, i) => (
          <article key={r.id} className="card p-5 relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand" />
            <div className="pl-2">
              <div className="flex justify-between items-start gap-2 mb-2">
                <span className="text-xs font-semibold text-brand">
                  {r.timing} · {r.when}
                </span>
                {i === 0 && (
                  <span className="text-[10px] uppercase tracking-wide text-good">Sent ✓</span>
                )}
              </div>
              <p className="font-display font-semibold text-ink">{r.headline}</p>
              <p className="text-sm text-ink-soft mt-1">{WORKSHOP.title}</p>
              <p className="text-xs text-muted mt-2">
                {WORKSHOP.date} · {WORKSHOP.time} {WORKSHOP.timezone}
              </p>
              <p className="text-xs text-ink-soft mt-2">
                Meeting ID: {WORKSHOP.meetingId}
                <br />
                Passcode: {WORKSHOP.passcode}
              </p>
              <p className="text-xs text-muted mt-2">Project: {project}</p>
              <p className="text-xs text-ink mt-3 font-medium">{r.action}</p>
              <button
                type="button"
                onClick={() => copy(r.id)}
                className="mt-3 rounded-lg border border-line bg-white px-3 py-2 text-xs font-semibold text-ink hover:bg-paper"
              >
                {copiedId === r.id ? 'Copied ✓' : 'Copy Joining Details'}
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-2 max-w-xl mt-8">
        <Link to="/attendance" className="flex-1">
          <Button>Continue to workshop day</Button>
        </Link>
        <Link to="/roadmap" className="flex-1">
          <Button variant="ghost">Back to roadmap</Button>
        </Link>
      </div>
    </div>
  )
}
