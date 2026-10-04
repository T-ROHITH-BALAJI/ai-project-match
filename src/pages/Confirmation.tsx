import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../components/Button'
import { SharePanel } from '../components/SharePanel'
import { useApp } from '../context/AppContext'
import { WORKSHOP } from '../data/workshop'
import { buildGoogleCalendarUrl, downloadIcsFile } from '../lib/calendar'

export function Confirmation() {
  const navigate = useNavigate()
  const { session } = useApp()

  useEffect(() => {
    if (!session.registration) navigate('/register', { replace: true })
  }, [session.registration, navigate])

  if (!session.registration) return null

  const projectName = session.project?.name ?? 'Your AI project'

  return (
    <div>
      <div className="text-center pt-4 pb-6">
        <div className="text-4xl mb-2">🎉</div>
        <h1 className="font-display text-2xl font-bold text-white">You&apos;re In!</h1>
        <p className="text-sm text-slate-400 mt-1">Hi {session.registration.name.split(' ')[0]}, see you in the workshop.</p>
      </div>

      <div className="glass rounded-2xl p-4 space-y-3 text-sm">
        <Row label="Workshop" value={WORKSHOP.title} highlight />
        <Row label="Date" value={WORKSHOP.date} />
        <Row label="Time" value={`${WORKSHOP.time} ${WORKSHOP.timezone}`} />
        <Row label="Duration" value={`${WORKSHOP.durationMinutes} minutes`} />
        <div>
          <p className="text-xs text-slate-500 mb-2">Join link</p>
          <a
            href={WORKSHOP.joinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full rounded-xl bg-indigo-600 hover:bg-indigo-500 text-center py-3 font-semibold text-white"
          >
            Join Workshop
          </a>
        </div>
        <div className="pt-2 border-t border-slate-700">
          <p className="text-xs text-slate-500 mb-2">Add to calendar</p>
          <div className="flex gap-2">
            <a
              href={buildGoogleCalendarUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 rounded-lg bg-slate-800 py-2.5 text-center text-xs font-medium text-slate-200 border border-slate-600"
            >
              Google Calendar
            </a>
            <button
              type="button"
              onClick={() => downloadIcsFile(projectName)}
              className="flex-1 rounded-lg bg-slate-800 py-2.5 text-xs font-medium text-slate-200 border border-slate-600"
            >
              Download .ics
            </button>
          </div>
        </div>
        <div className="pt-2">
          <p className="text-xs text-slate-500">Your personalized project</p>
          <p className="text-cyan-400 font-semibold">{projectName}</p>
        </div>
      </div>

      {session.myReferralCode && (
        <p className="text-xs text-slate-500 mt-4 text-center font-mono">
          Your referral code: {session.myReferralCode}
        </p>
      )}

      <SharePanel variant="invite" />

      <Link to="/reminders" className="block mt-4">
        <Button variant="secondary">View reminder timeline (simulated)</Button>
      </Link>
      <Link to="/attendance" className="block mt-2">
        <Button variant="ghost">Simulate workshop day →</Button>
      </Link>
    </div>
  )
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div>
      <p className="text-xs text-slate-500">{label}</p>
      <p className={highlight ? 'text-white font-medium' : 'text-slate-300'}>{value}</p>
    </div>
  )
}
