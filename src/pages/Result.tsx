import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/Button'
import { CampaignLink } from '../components/CampaignLink'
import { FitScore } from '../components/FitScore'
import { SharePanel } from '../components/SharePanel'
import { useApp } from '../context/AppContext'
import { WORKSHOP } from '../data/workshop'

export function Result() {
  const navigate = useNavigate()
  const { session } = useApp()
  const project = session.project
  const answers = session.answers

  useEffect(() => {
    if (!project) navigate('/diagnostic', { replace: true })
  }, [project, navigate])

  if (!project) return null

  return (
    <div>
      <p className="eyebrow mb-2">Your AI project match</p>
      <h1 className="font-display text-3xl sm:text-4xl font-bold text-ink mb-6">{project.name}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        <div className="lg:col-span-7 space-y-4">
          <div className="card p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <FitScore score={project.fitScore} />
              <div className="flex-1">
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="rounded-lg bg-paper px-2.5 py-1 text-xs text-ink-soft border border-line">
                    Difficulty: {project.difficulty}
                  </span>
                  <span className="rounded-lg bg-good-soft px-2.5 py-1 text-xs text-good border border-good/15">
                    {project.careerValue}
                  </span>
                </div>
                <h3 className="text-xs uppercase text-muted mb-1">Suggested stack</h3>
                <p className="text-ink font-medium text-sm">{project.stack}</p>
                <p className="text-sm text-ink-soft leading-relaxed mt-3">{project.description}</p>
              </div>
            </div>
          </div>

          <div className="card p-5 sm:p-6 space-y-4 text-sm">
            <div>
              <h3 className="text-xs uppercase text-muted mb-1">Build first (60 min)</h3>
              <p className="text-ink-soft">{project.buildFirst}</p>
            </div>
            <div>
              <h3 className="text-xs uppercase text-muted mb-1">Future upgrades</h3>
              <ul className="list-disc list-inside text-ink-soft space-y-0.5">
                {project.futureUpgrades.map((u) => (
                  <li key={u}>{u}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs uppercase text-muted mb-1">Suggested AI tools</h3>
              <div className="flex flex-wrap gap-1.5">
                {project.suggestedTools.map((t) => (
                  <span key={t} className="rounded-md bg-brand-soft px-2 py-0.5 text-xs text-brand">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-4">
          <div className="card p-5 sm:p-6">
            <p className="eyebrow mb-3">Why this match?</p>
            {answers && (
              <dl className="grid grid-cols-2 gap-3 mb-4 text-sm">
                <Fact label="Skill level" value={answers.comfort} />
                <Fact label="Interest" value={answers.interest} />
                <Fact label="Goal" value={answers.goal} />
                <Fact label="Available time" value={answers.time} />
              </dl>
            )}
            <p className="text-sm text-ink-soft leading-relaxed">{project.whyMatch}</p>
          </div>

          <div className="card p-5 sm:p-6 border-brand/20">
            <h2 className="font-display font-semibold text-lg text-ink">{WORKSHOP.title}</h2>
            <p className="text-sm text-ink-soft mt-2 leading-relaxed">
              Don&apos;t leave with another AI tutorial. Leave with the foundation of a project you can
              continue building.
            </p>
            <ul className="mt-3 space-y-1 text-xs text-muted">
              <li>✓ Free online workshop · 60 minutes</li>
              <li>✓ Beginner-friendly · Build-oriented</li>
              <li>✓ Made for final-year engineering students</li>
            </ul>
            <CampaignLink to="/register" className="block mt-4">
              <Button>Build the First Version in 60 Minutes</Button>
            </CampaignLink>
            <CampaignLink to="/register" className="block mt-2">
              <Button variant="secondary">Reserve My Free Seat</Button>
            </CampaignLink>
          </div>
        </div>
      </div>

      <div className="max-w-xl mt-2">
        <SharePanel variant="project" projectName={project.name} />
      </div>
    </div>
  )
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-paper px-3 py-2.5">
      <dt className="text-[10px] uppercase tracking-wide text-muted">{label}</dt>
      <dd className="text-ink font-medium text-sm mt-0.5">{value}</dd>
    </div>
  )
}
