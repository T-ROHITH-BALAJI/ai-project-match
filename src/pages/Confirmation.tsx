import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../components/Button'
import { JoiningDetails } from '../components/JoiningDetails'
import { JourneyNav } from '../components/JourneyNav'
import { SharePanel } from '../components/SharePanel'
import { useApp } from '../context/AppContext'
import { buildProjectRoadmap } from '../data/roadmaps'

export function Confirmation() {
  const navigate = useNavigate()
  const { session } = useApp()

  useEffect(() => {
    if (!session.registration) navigate('/register', { replace: true })
  }, [session.registration, navigate])

  if (!session.registration) return null

  const projectName = session.project?.name ?? 'Your AI project'
  const roadmap = buildProjectRoadmap(session.project, session.answers)

  return (
    <div>
      <JourneyNav />
      <div className="mb-6">
        <p className="text-3xl mb-2">🎉</p>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-ink">You&apos;re In!</h1>
        <p className="text-sm text-ink-soft mt-1">
          Hi {session.registration.name.split(' ')[0]}, you don&apos;t need to search email for access —
          everything is here.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 space-y-4">
          <JoiningDetails projectName={projectName} />
          {session.myReferralCode && (
            <p className="text-xs text-muted font-mono">Your referral code: {session.myReferralCode}</p>
          )}
        </div>

        <div className="lg:col-span-5 space-y-4">
          <div className="card p-5">
            <p className="eyebrow mb-2">Your project</p>
            <p className="font-display text-lg font-semibold text-ink">{roadmap.projectName}</p>
            {session.project?.fitScore ? (
              <p className="text-sm text-brand font-medium mt-1">Project Fit: {session.project.fitScore}%</p>
            ) : null}
            <p className="text-xs text-muted mt-2">{roadmap.stack}</p>
            <p className="text-sm text-ink-soft mt-3">
              Next: walk your personalized roadmap so the workshop feels like day one of a project — not
              a one-off lecture.
            </p>
            <Link to="/roadmap" className="block mt-4">
              <Button>View my project roadmap</Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
            <Link to="/reminders">
              <Button variant="secondary">View reminder timeline</Button>
            </Link>
            <Link to="/attendance">
              <Button variant="ghost">Simulate workshop day →</Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-xl">
        <SharePanel variant="invite" />
      </div>
    </div>
  )
}
