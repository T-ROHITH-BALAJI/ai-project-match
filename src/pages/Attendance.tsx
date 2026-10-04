import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../components/Button'
import { useApp } from '../context/AppContext'
import { WORKSHOP } from '../data/workshop'

export function Attendance() {
  const navigate = useNavigate()
  const { session, setAttended } = useApp()

  useEffect(() => {
    if (!session.registration) navigate('/register', { replace: true })
  }, [session.registration, navigate])

  if (!session.registration) return null

  function mark(attended: boolean) {
    setAttended(attended)
    if (attended) navigate('/starter-kit')
  }

  return (
    <div>
      <h1 className="font-display text-xl font-bold text-white mb-1">Workshop attendance</h1>
      <p className="text-sm text-slate-400 mb-6">
        Simulate whether {session.registration.name.split(' ')[0]} attended &quot;{WORKSHOP.title}&quot;.
      </p>

      {session.attended !== null && (
        <div
          className={`rounded-xl p-3 mb-4 text-sm ${
            session.attended
              ? 'bg-emerald-900/30 border border-emerald-700 text-emerald-200'
              : 'bg-slate-800 border border-slate-600 text-slate-400'
          }`}
        >
          Current status: {session.attended ? 'Attended ✓' : 'Did not attend'}
        </div>
      )}

      <div className="space-y-2">
        <Button onClick={() => mark(true)}>I attended the workshop</Button>
        <Button variant="secondary" onClick={() => mark(false)}>
          I could not attend
        </Button>
      </div>

      {session.starterKitUnlocked && (
        <Link to="/starter-kit" className="block mt-4">
          <Button variant="ghost">Open AI Builder Starter Kit →</Button>
        </Link>
      )}

      {!session.starterKitUnlocked && session.attended === false && (
        <p className="text-xs text-slate-500 mt-6 text-center">
          Starter Kit unlocks after attendance. You can re-mark as attended for demo purposes.
        </p>
      )}
    </div>
  )
}
