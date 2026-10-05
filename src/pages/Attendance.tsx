import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../components/Button'
import { JoiningDetails } from '../components/JoiningDetails'
import { JourneyNav } from '../components/JourneyNav'
import { useApp } from '../context/AppContext'
import { WORKSHOP } from '../data/workshop'

export function Attendance() {
  const navigate = useNavigate()
  const { session, setAttended, startWorkshopDay, completeWorkshop } = useApp()

  useEffect(() => {
    if (!session.registration) navigate('/register', { replace: true })
  }, [session.registration, navigate])

  if (!session.registration) return null

  function finish() {
    completeWorkshop()
    navigate('/starter-kit')
  }

  const firstName = session.registration.name.split(' ')[0]

  return (
    <div>
      <JourneyNav />
      <h1 className="font-display text-3xl font-bold text-ink mb-1">Workshop day</h1>
      <p className="text-sm text-ink-soft mb-6 max-w-2xl">
        Simulated workshop state for {firstName}. The free kit stays locked until you attend and mark
        the workshop complete — it does not appear after registration.
      </p>

      <ol className="flex flex-wrap gap-2 text-xs mb-6">
        <StatusChip on label="Registered" />
        <StatusChip on={session.workshopDay} label="Attended / workshop day" />
        <StatusChip on={session.workshopCompleted} label="Workshop completed" />
        <StatusChip on={session.starterKitUnlocked} label="Free kit unlocked" />
      </ol>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 space-y-4">
          {!session.workshopDay && (
            <div className="card p-5 sm:p-6">
              <p className="eyebrow mb-2">Step 1</p>
              <h2 className="font-display text-xl font-semibold text-ink">Simulate workshop day</h2>
              <p className="text-sm text-ink-soft mt-2">
                Pretend it is {WORKSHOP.date}. Joining details stay visible so you are not hunting for
                a password.
              </p>
              <div className="mt-4 max-w-sm">
                <Button onClick={startWorkshopDay}>Simulate Workshop Day</Button>
              </div>
            </div>
          )}

          {session.workshopDay && !session.workshopCompleted && session.attended !== false && (
            <div className="card p-5 sm:p-6">
              <p className="eyebrow mb-2">Step 2</p>
              <h2 className="font-display text-xl font-semibold text-ink">You are on workshop day</h2>
              <p className="text-sm text-ink-soft mt-2">
                Mark the session complete to unlock the Free AI Builder Kit. Or simulate a no-show —
                the kit stays locked.
              </p>
              <div className="mt-4 space-y-2 max-w-sm">
                <Button onClick={finish}>Mark Workshop Complete</Button>
                <Button variant="secondary" onClick={() => setAttended(false)}>
                  I could not attend
                </Button>
              </div>
            </div>
          )}

          {session.attended === false && !session.workshopCompleted && (
            <div className="card p-5 border-warm/20">
              <p className="text-sm text-ink">Status: did not attend — kit remains locked.</p>
              <p className="text-xs text-muted mt-2">
                For the demo you can remake attendance and complete the workshop.
              </p>
              <div className="mt-4 max-w-sm space-y-2">
                <Button variant="secondary" onClick={startWorkshopDay}>
                  Re-mark as attended
                </Button>
              </div>
            </div>
          )}

          {session.workshopCompleted && (
            <div className="card p-5 bg-good-soft border-good/15">
              <p className="font-display text-lg font-semibold text-ink">Workshop complete</p>
              <p className="text-sm text-ink-soft mt-1">Your Free AI Builder Kit is unlocked.</p>
              <Link to="/starter-kit" className="block mt-4 max-w-sm">
                <Button>Open Free AI Builder Kit</Button>
              </Link>
            </div>
          )}
        </div>

        <div className="lg:col-span-5">
          <JoiningDetails projectName={session.project?.name} showCalendar={false} />
        </div>
      </div>
    </div>
  )
}

function StatusChip({ on, label }: { on: boolean; label: string }) {
  return (
    <li
      className={`rounded-full px-3 py-1 font-medium ${
        on ? 'bg-brand-soft text-brand' : 'bg-paper-deep text-muted'
      }`}
    >
      {on ? '✓ ' : ''}
      {label}
    </li>
  )
}
