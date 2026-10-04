import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../components/Button'
import { useApp } from '../context/AppContext'
import { WORKSHOP } from '../data/workshop'

const reminders = [
  {
    id: 't0',
    timing: 'T+0 · Right now',
    channel: 'Email + WhatsApp',
    body: (project: string) =>
      `You're registered for "${WORKSHOP.title}" on ${WORKSHOP.date} at ${WORKSHOP.time} ${WORKSHOP.timezone}.\n\nJoin: ${WORKSHOP.joinUrl}\n\nYour project match: ${project}`,
  },
  {
    id: '24h',
    timing: '24 hours before',
    channel: 'WhatsApp',
    body: (project: string) =>
      `Reminder: Your AI workshop is tomorrow 🚀\n\n${WORKSHOP.title}\n${WORKSHOP.date} · ${WORKSHOP.time} IST\n\nJoin: ${WORKSHOP.joinUrl}\n\nProject: ${project}`,
  },
  {
    id: '1h',
    timing: '1 hour before',
    channel: 'WhatsApp + Push',
    body: (project: string) =>
      `Your AI workshop starts in 1 hour 🚀\n\n${WORKSHOP.title}\n\nJoin here:\n${WORKSHOP.joinUrl}\n\nYour project match:\n${project}`,
  },
  {
    id: '10m',
    timing: '10 minutes before',
    channel: 'WhatsApp',
    body: () =>
      `Starting soon! Grab water & open your laptop.\n\nJoin now: ${WORKSHOP.joinUrl}`,
  },
]

export function Reminders() {
  const navigate = useNavigate()
  const { session } = useApp()

  useEffect(() => {
    if (!session.registration) navigate('/register', { replace: true })
  }, [session.registration, navigate])

  if (!session.registration) return null

  const project = session.project?.name ?? 'Your AI project'

  return (
    <div>
      <h1 className="font-display text-xl font-bold text-white mb-1">Automated reminders</h1>
      <p className="text-sm text-slate-400 mb-6">
        Simulated notification flow — in production these connect to email/WhatsApp APIs.
      </p>

      <div className="space-y-3">
        {reminders.map((r, i) => (
          <div key={r.id} className="glass rounded-2xl p-4 relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500 to-cyan-400" />
            <div className="pl-2">
              <div className="flex justify-between items-start gap-2 mb-2">
                <span className="text-xs font-semibold text-indigo-300">{r.timing}</span>
                <span className="text-[10px] text-slate-500">{r.channel}</span>
              </div>
              <pre className="text-xs text-slate-400 whitespace-pre-wrap font-sans leading-relaxed">
                {r.body(project)}
              </pre>
            </div>
            {i === 0 && (
              <span className="mt-2 inline-block text-[10px] uppercase tracking-wide text-emerald-400">
                Sent ✓
              </span>
            )}
          </div>
        ))}
      </div>

      <p className="text-xs text-slate-500 mt-4 text-center">
        To: {session.registration.email} · {session.registration.phone}
      </p>

      <Link to="/attendance" className="block mt-6">
        <Button>Continue to workshop day</Button>
      </Link>
      <Link to="/confirmation" className="block mt-2">
        <Button variant="ghost">Back to confirmation</Button>
      </Link>
    </div>
  )
}
