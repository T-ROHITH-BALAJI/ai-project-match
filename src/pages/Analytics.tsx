import { Link } from 'react-router-dom'
import { Button } from '../components/Button'
import { useApp } from '../context/AppContext'
import { CAMPAIGN_GOAL, CHANNELS, MESSAGE_VARIANTS } from '../data/campaignPlan'
import { resetLiveAnalytics, toggleDemoMode } from '../lib/analytics'
import { loadCampaignAnalytics, resetCampaignAnalytics } from '../lib/campaignAnalytics'

export function Analytics() {
  const { displayAnalytics, analytics, refreshAnalytics, resetDemo } = useApp()
  const d = displayAnalytics
  const campaign = loadCampaignAnalytics()
  const progressPct = Math.min(100, Math.round((d.registrations / CAMPAIGN_GOAL.registrations) * 100))
  const referralShare =
    d.registrations > 0 ? Math.round((d.referralRegistrations / d.registrations) * 100) : 0

  const funnel = [
    { label: 'Visitors', value: d.visitors },
    { label: 'Diagnostic starts', value: d.diagnosticStarts, prev: d.visitors },
    { label: 'Diagnostic completions', value: d.diagnosticCompletions, prev: d.diagnosticStarts },
    {
      label: 'Project recommendations',
      value: d.projectRecommendations ?? d.diagnosticCompletions,
      prev: d.diagnosticCompletions,
    },
    {
      label: 'Registrations',
      value: d.registrations,
      prev: d.diagnosticCompletions,
      target: CAMPAIGN_GOAL.registrations,
      accent: true,
    },
    { label: 'Attendance', value: d.attended, prev: d.registrations },
    { label: 'Free kit views', value: d.starterKitViews, prev: d.attended },
  ]

  return (
    <div>
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-6">
        <div>
          <p className="eyebrow mb-2">Internal / simulated growth data</p>
          <h1 className="font-display text-3xl font-bold text-ink">Growth Dashboard</h1>
          <p className="text-sm text-ink-soft mt-1">
            Internal measurement layer — not a step in the student journey. Challenge numbers are a
            simulation, not live campaign results.
          </p>
        </div>
        <span className="self-start rounded-full bg-warm-soft text-warm text-xs font-semibold px-3 py-1.5">
          {analytics.demoMode ? 'Demo seed + live session events' : 'Live session only'}
        </span>
      </div>

      <div className="card p-5 mb-6">
        <div className="flex flex-col sm:flex-row sm:justify-between gap-1 text-xs text-muted mb-2">
          <span>Registration goal · ₹{CAMPAIGN_GOAL.budgetInr} · 7 days</span>
          <span>
            {d.registrations.toLocaleString()} / {CAMPAIGN_GOAL.registrations} · {progressPct}%
          </span>
        </div>
        <div className="h-2 rounded-full bg-paper-deep">
          <div className="h-full rounded-full bg-brand" style={{ width: `${progressPct}%` }} />
        </div>
        <p className="text-xs text-muted mt-3">
          Referral registrations: <strong className="text-ink">{d.referralRegistrations}</strong> — a
          subset of the {d.registrations.toLocaleString()} total ({referralShare}%), not an extra{' '}
          {d.referralRegistrations} on top.
        </p>
      </div>

      <h2 className="text-sm font-semibold text-ink mb-3">Funnel</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 mb-8">
        {funnel.map((row) => (
          <FunnelCard key={row.label} {...row} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <section>
          <h2 className="text-sm font-semibold text-ink mb-2">By channel (live session)</h2>
          <div className="card divide-y divide-line">
            {CHANNELS.map((ch) => {
              const b = campaign.byChannel[ch.id]
              return (
                <div key={ch.id} className="px-4 py-3 flex justify-between gap-3 text-sm">
                  <span className="text-ink-soft">{ch.name}</span>
                  <span className="text-muted text-xs shrink-0">
                    {b.visitors} vis · {b.diagnosticStarts} diag · {b.registrations} reg
                  </span>
                </div>
              )
            })}
          </div>
        </section>
        <section>
          <h2 className="text-sm font-semibold text-ink mb-2">By message variant (live session)</h2>
          <div className="space-y-2">
            {MESSAGE_VARIANTS.map((v) => {
              const b = campaign.byVariant[v.id]
              return (
                <div key={v.id} className="card p-4">
                  <div className="flex justify-between">
                    <span className="font-bold text-brand">{v.id}</span>
                    <span className="text-xs text-muted">
                      {b.visitors} vis · {b.registrations} reg
                    </span>
                  </div>
                  <p className="text-sm text-ink-soft mt-1">{v.headline}</p>
                </div>
              )
            })}
          </div>
        </section>
      </div>

      <h2 className="text-sm font-semibold text-ink mb-2">Referral & kit engagement</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <Stat label="Share clicks" value={d.shareClicks} />
        <Stat label="Referral visits" value={d.referralVisits} />
        <Stat label="Referral registrations" value={d.referralRegistrations} note="subset of regs" />
        <Stat label="E-book downloads" value={d.ebookDownloads} />
        <Stat label="Tools guide opens" value={d.toolsGuideOpens} />
        <Stat label="Checklist opens" value={d.checklistOpens} />
        <Stat label="Prompt pack opens" value={d.promptPackOpens} />
        <Stat label="Kit views" value={d.starterKitViews} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 max-w-3xl">
        <Link to="/admin">
          <Button variant="secondary">Admin Workspace</Button>
        </Link>
        <Link to="/plan">
          <Button variant="secondary">Growth Plan</Button>
        </Link>
        <Link to="/agent">
          <Button variant="secondary">AI Communication Agent</Button>
        </Link>
        <Button
          variant="secondary"
          onClick={() => {
            toggleDemoMode()
            refreshAnalytics()
          }}
        >
          Toggle demo seed ({analytics.demoMode ? 'on' : 'off'})
        </Button>
        <Button
          variant="ghost"
          onClick={() => {
            resetLiveAnalytics()
            resetCampaignAnalytics()
            refreshAnalytics()
          }}
        >
          Reset live counters
        </Button>
        <Button variant="ghost" onClick={resetDemo}>
          Reset user journey
        </Button>
        <Link to="/">
          <Button>Back to experience</Button>
        </Link>
      </div>
    </div>
  )
}

function FunnelCard({
  label,
  value,
  prev,
  accent,
  target,
}: {
  label: string
  value: number
  prev?: number
  accent?: boolean
  target?: number
}) {
  const rate = prev && prev > 0 ? Math.round((value / prev) * 100) : null
  return (
    <div className={`card p-4 min-w-0 ${accent ? 'border-brand/30 bg-brand-soft/40' : ''}`}>
      <p className="text-sm text-ink-soft">{label}</p>
      <p className="font-display text-xl font-bold text-ink mt-1">
        {value.toLocaleString()}
        {target !== undefined && (
          <span className="text-xs font-normal text-muted"> / {target}</span>
        )}
      </p>
      {rate !== null && <p className="text-[10px] text-muted mt-1">{rate}% of previous step</p>}
    </div>
  )
}

function Stat({ label, value, note }: { label: string; value: number; note?: string }) {
  return (
    <div className="card p-3">
      <p className="text-[10px] text-muted uppercase">{label}</p>
      <p className="font-semibold text-ink">{value.toLocaleString()}</p>
      {note && <p className="text-[10px] text-muted mt-0.5">{note}</p>}
    </div>
  )
}
