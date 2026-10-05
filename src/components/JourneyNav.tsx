import { Link, useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext'

const steps = [
  { to: '/confirmation', label: 'Confirmed' },
  { to: '/roadmap', label: 'Roadmap' },
  { to: '/reminders', label: 'Reminders' },
  { to: '/attendance', label: 'Workshop' },
  { to: '/starter-kit', label: 'Free Kit' },
] as const

export function JourneyNav() {
  const { pathname } = useLocation()
  const { session } = useApp()

  if (!session.registration) return null

  return (
    <nav
      aria-label="Your workshop journey"
      className="mb-6 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      <ol className="flex min-w-max gap-1.5 text-xs">
        {steps.map((step, i) => {
          const locked = step.to === '/starter-kit' && !session.starterKitUnlocked
          const active = pathname === step.to
          const done =
            (step.to === '/confirmation' && !!session.registration) ||
            (step.to === '/attendance' && session.workshopCompleted) ||
            (step.to === '/starter-kit' && session.starterKitUnlocked)
          return (
            <li key={step.to} className="flex items-center gap-1.5">
              {i > 0 && <span className="text-line px-0.5">→</span>}
              {locked ? (
                <span className="rounded-full px-2.5 py-1 text-muted bg-paper-deep/60">Kit locked</span>
              ) : (
                <Link
                  to={step.to}
                  className={`rounded-full px-2.5 py-1 font-medium ${
                    active
                      ? 'bg-brand text-white'
                      : done
                        ? 'bg-brand-soft text-brand'
                        : 'bg-card border border-line text-ink-soft'
                  }`}
                >
                  {step.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
