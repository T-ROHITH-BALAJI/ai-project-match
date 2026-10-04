import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/Button'
import { CampaignLink } from '../components/CampaignLink'
import { SharePanel } from '../components/SharePanel'
import { useApp } from '../context/AppContext'
import { WORKSHOP } from '../data/workshop'

export function Result() {
  const navigate = useNavigate()
  const { session } = useApp()
  const project = session.project

  useEffect(() => {
    if (!project) navigate('/diagnostic', { replace: true })
  }, [project, navigate])

  if (!project) return null

  return (
    <div className="pb-4">
      <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400 mb-2">Your AI project match</p>
      <h1 className="font-display text-2xl font-bold text-white mb-1">{project.name}</h1>
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="rounded-lg bg-slate-800 px-2.5 py-1 text-xs text-slate-300">
          Difficulty: {project.difficulty}
        </span>
        <span className="rounded-lg bg-emerald-900/40 px-2.5 py-1 text-xs text-emerald-300 border border-emerald-700/40">
          {project.careerValue}
        </span>
      </div>

      <div className="glass rounded-2xl p-4 space-y-4 text-sm">
        <div>
          <h3 className="text-xs uppercase text-slate-500 mb-1">Suggested stack</h3>
          <p className="text-slate-200">{project.stack}</p>
        </div>
        <div>
          <h3 className="text-xs uppercase text-slate-500 mb-1">Project</h3>
          <p className="text-slate-300 leading-relaxed">{project.description}</p>
        </div>
        <div>
          <h3 className="text-xs uppercase text-slate-500 mb-1">Why this project</h3>
          <p className="text-slate-400 leading-relaxed">{project.whyMatch}</p>
        </div>
        <div>
          <h3 className="text-xs uppercase text-slate-500 mb-1">Build first (60 min)</h3>
          <p className="text-slate-300">{project.buildFirst}</p>
        </div>
        <div>
          <h3 className="text-xs uppercase text-slate-500 mb-1">Future upgrades</h3>
          <ul className="list-disc list-inside text-slate-400 space-y-0.5">
            {project.futureUpgrades.map((u) => (
              <li key={u}>{u}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xs uppercase text-slate-500 mb-1">Suggested AI tools</h3>
          <div className="flex flex-wrap gap-1.5">
            {project.suggestedTools.map((t) => (
              <span key={t} className="rounded-md bg-indigo-950/80 px-2 py-0.5 text-xs text-indigo-200">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="glass rounded-2xl p-4 mt-6 border-indigo-500/20">
        <h2 className="font-display font-semibold text-lg text-white">{WORKSHOP.title}</h2>
        <p className="text-sm text-slate-400 mt-2 leading-relaxed">
          Don&apos;t leave with another AI tutorial. Leave with the foundation of a project you can continue
          building.
        </p>
        <ul className="mt-3 space-y-1 text-xs text-slate-500">
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

      <SharePanel variant="project" projectName={project.name} />
    </div>
  )
}
