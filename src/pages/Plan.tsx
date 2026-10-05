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
      <p className="eyebrow mb-2">Internal Growth Operations · not in the student journey</p>
      <h1 className="font-display text-3xl font-bold text-ink mb-2">Growth Plan</h1>
      <p className="text-sm text-ink-soft mb-8 max-w-2xl">
        This page mirrors the slide story. The live site reads the same data for headlines, UTMs, and
        dashboard targets — not a generic landing page built in isolation.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <section className="card p-5">
          <h2 className="text-sm font-semibold text-brand mb-3">1 · Understand the student</h2>
          <dl className="space-y-3 text-sm text-ink-soft">
            <div>
              <dt className="text-xs text-muted">Who</dt>
              <dd>{STUDENT_INSIGHT.who}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted">Why they care</dt>
              <dd>{STUDENT_INSIGHT.whyTheyCare}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted">What makes them register</dt>
              <dd>{STUDENT_INSIGHT.whyRegister}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted">How the website reflects this</dt>
              <dd className="text-brand">{STUDENT_INSIGHT.productLink}</dd>
            </div>
          </dl>
        </section>

        <section className="card p-5">
          <h2 className="text-sm font-semibold text-brand mb-2">
            2 · Campaign (7 days · ₹{CAMPAIGN_GOAL.budgetInr})
          </h2>
          <p className="text-xs text-muted mb-3">Goal: {CAMPAIGN_GOAL.registrations} workshop registrations</p>
          <ul className="space-y-3">
            {CHANNELS.map((ch) => (
              <li key={ch.id} className="text-sm border-b border-line pb-3 last:border-0 last:pb-0">
                <div className="flex justify-between gap-2">
                  <span className="font-medium text-ink">
                    #{ch.priority} {ch.name}
                  </span>
                  <span className="text-xs text-muted shrink-0">~{ch.expectedRegs} regs</span>
                </div>
                <p className="text-xs text-muted mt-1">
                  ₹{ch.budgetInr} · {ch.tactic}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <section className="card p-5">
          <h2 className="text-sm font-semibold text-brand mb-3">Message tests (landing copy)</h2>
          <ul className="space-y-2 text-sm">
            {MESSAGE_VARIANTS.map((v) => (
              <li key={v.id} className="rounded-lg bg-paper p-3">
                <span className="font-bold text-brand">{v.id}</span> · {v.angle}
                <p className="text-ink-soft mt-1">{v.headline}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="card p-5">
          <h2 className="text-sm font-semibold text-brand mb-3">7-day rhythm</h2>
          <ul className="space-y-2 text-sm text-ink-soft">
            {WEEK_PLAN.map((d) => (
              <li key={d.day}>
                <span className="text-ink font-medium">Day {d.day}:</span> {d.focus}{' '}
                <span className="text-muted">({d.kpi})</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="card p-5 mb-6">
        <h2 className="text-sm font-semibold text-brand mb-2">Try campaign entry links</h2>
        <p className="text-xs text-muted mb-3">
          Opens home with different hero + channel banner (like real ads).
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {demoLinks.map((l) => (
            <li key={l.label}>
              <Link to={`/${l.qs}`} className="block text-sm text-brand hover:underline py-1">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <div className="flex flex-col sm:flex-row gap-2 max-w-xl">
        <Link to="/admin" className="flex-1">
          <Button variant="secondary">Admin Workspace</Button>
        </Link>
        <Link to={pathWithCampaign('/', attribution)} className="flex-1">
          <Button>Back to student experience</Button>
        </Link>
      </div>
    </div>
  )
}
