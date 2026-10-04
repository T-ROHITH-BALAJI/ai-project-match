import { Link } from 'react-router-dom'
import { Button } from '../components/Button'
import {
  CAMPAIGN_GOAL,
  CHANNELS,
  MESSAGE_VARIANTS,
  STUDENT_INSIGHT,
  WEEK_PLAN,
} from '../data/campaignPlan'
import { pathWithCampaign } from '../lib/campaignAttribution'
import { useApp } from '../context/AppContext'

export function Plan() {
  const { attribution } = useApp()

  const demoLinks = [
    { label: 'WhatsApp + Match-first (B)', qs: '?utm_source=whatsapp&msg=B' },
    { label: 'Instagram + Resume (C)', qs: '?utm_source=instagram&msg=C' },
    { label: 'Club email + Workshop (A)', qs: '?utm_source=clubs_email&msg=A&club=iit_demo' },
    { label: 'Friend referral', qs: '?ref=priya-a1b2' },
  ]

  return (
    <div className="pb-6">
      <p className="text-xs text-amber-400/90 font-medium uppercase tracking-wide mb-1">For your submission</p>
      <h1 className="font-display text-2xl font-bold text-white mb-2">Campaign plan → product</h1>
      <p className="text-sm text-slate-400 mb-6">
        This page mirrors what you put in slides. The live site reads the same data for headlines, UTMs, and
        dashboard targets—not a generic landing page built in isolation.
      </p>

      <section className="glass rounded-2xl p-4 mb-4">
        <h2 className="text-sm font-semibold text-indigo-300 mb-2">1 · Understand the student</h2>
        <dl className="space-y-2 text-sm text-slate-300">
          <div>
            <dt className="text-xs text-slate-500">Who</dt>
            <dd>{STUDENT_INSIGHT.who}</dd>
          </div>
          <div>
            <dt className="text-xs text-slate-500">Why they care</dt>
            <dd>{STUDENT_INSIGHT.whyTheyCare}</dd>
          </div>
          <div>
            <dt className="text-xs text-slate-500">What makes them register</dt>
            <dd>{STUDENT_INSIGHT.whyRegister}</dd>
          </div>
          <div>
            <dt className="text-xs text-slate-500">How the website reflects this</dt>
            <dd className="text-cyan-200/90">{STUDENT_INSIGHT.productLink}</dd>
          </div>
        </dl>
      </section>

      <section className="glass rounded-2xl p-4 mb-4">
        <h2 className="text-sm font-semibold text-indigo-300 mb-2">2 · Campaign (7 days · ₹{CAMPAIGN_GOAL.budgetInr})</h2>
        <p className="text-xs text-slate-500 mb-3">Goal: {CAMPAIGN_GOAL.registrations} workshop registrations</p>
        <ul className="space-y-3">
          {CHANNELS.map((ch) => (
            <li key={ch.id} className="text-sm border-b border-slate-800 pb-3 last:border-0 last:pb-0">
              <div className="flex justify-between gap-2">
                <span className="font-medium text-white">
                  #{ch.priority} {ch.name}
                </span>
                <span className="text-xs text-slate-500 shrink-0">~{ch.expectedRegs} regs</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">₹{ch.budgetInr} · {ch.tactic}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="glass rounded-2xl p-4 mb-4">
        <h2 className="text-sm font-semibold text-indigo-300 mb-2">Message tests (landing copy)</h2>
        <ul className="space-y-2 text-xs">
          {MESSAGE_VARIANTS.map((v) => (
            <li key={v.id} className="rounded-lg bg-slate-900/80 p-3">
              <span className="font-bold text-indigo-400">{v.id}</span> · {v.angle}
              <p className="text-slate-300 mt-1">{v.headline}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="glass rounded-2xl p-4 mb-4">
        <h2 className="text-sm font-semibold text-indigo-300 mb-2">7-day rhythm</h2>
        <ul className="space-y-2 text-xs text-slate-400">
          {WEEK_PLAN.map((d) => (
            <li key={d.day}>
              <span className="text-slate-200 font-medium">Day {d.day}:</span> {d.focus}{' '}
              <span className="text-slate-600">({d.kpi})</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="glass rounded-2xl p-4 mb-6">
        <h2 className="text-sm font-semibold text-indigo-300 mb-2">Try campaign entry links</h2>
        <p className="text-xs text-slate-500 mb-3">Opens home with different hero + channel banner (like real ads).</p>
        <ul className="space-y-2">
          {demoLinks.map((l) => (
            <li key={l.label}>
              <Link
                to={`/${l.qs}`}
                className="block text-sm text-cyan-400 hover:text-cyan-300 py-1"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <Link to={pathWithCampaign('/', attribution)}>
        <Button>Back to student experience</Button>
      </Link>
    </div>
  )
}
