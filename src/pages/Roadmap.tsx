import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../components/Button'
import { JourneyNav } from '../components/JourneyNav'
import { SharePanel } from '../components/SharePanel'
import { useApp } from '../context/AppContext'
import { buildProjectRoadmap } from '../data/roadmaps'

export function Roadmap() {
  const navigate = useNavigate()
  const { session } = useApp()

  useEffect(() => {
    if (!session.registration) navigate('/register', { replace: true })
  }, [session.registration, navigate])

  if (!session.registration) return null

  const roadmap = buildProjectRoadmap(session.project, session.answers)

  return (
    <div>
      <JourneyNav />
      <p className="eyebrow mb-2">Before the workshop</p>
      <h1 className="font-display text-3xl font-bold text-ink mb-2">Your project roadmap</h1>
      <p className="text-sm text-ink-soft mb-6 max-w-2xl">
        Project: <span className="font-semibold text-ink">{roadmap.projectName}</span>
        {session.project?.fitScore ? (
          <span className="text-muted"> · Fit {session.project.fitScore}%</span>
        ) : null}
        . The live session is the start of this path, not the whole path.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
        <section className="card p-5">
          <h2 className="font-display font-semibold text-ink mb-3">Before the workshop</h2>
          <ol className="space-y-3">
            {roadmap.before.map((step) => (
              <li key={step.title}>
                <p className="text-sm font-medium text-ink">{step.title}</p>
                <p className="text-xs text-muted mt-1 leading-relaxed">{step.detail}</p>
              </li>
            ))}
          </ol>
        </section>
        <section className="card p-5 border-brand/20">
          <h2 className="font-display font-semibold text-ink mb-3">During the workshop</h2>
          <ol className="space-y-3">
            {roadmap.during.map((step, i) => (
              <li key={step.title}>
                <p className="text-sm font-medium text-ink">
                  {i + 1}. {step.title}
                </p>
                <p className="text-xs text-muted mt-1 leading-relaxed">{step.detail}</p>
              </li>
            ))}
          </ol>
        </section>
        <section className="card p-5">
          <h2 className="font-display font-semibold text-ink mb-3">After the workshop</h2>
          <ol className="space-y-3">
            {roadmap.after.map((step) => (
              <li key={step.day}>
                <p className="text-sm font-medium text-ink">
                  Day {step.day} — {step.title}
                </p>
                <p className="text-xs text-muted mt-1 leading-relaxed">{step.detail}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 max-w-xl">
        <Link to="/reminders" className="flex-1">
          <Button>See reminder sequence</Button>
        </Link>
        <Link to="/confirmation" className="flex-1">
          <Button variant="secondary">Back to joining details</Button>
        </Link>
      </div>

      <div className="max-w-xl">
        <SharePanel variant="project" projectName={roadmap.projectName} />
      </div>
    </div>
  )
}
