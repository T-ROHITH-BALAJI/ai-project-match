import { Link } from 'react-router-dom'
import { Button } from '../components/Button'
import { useApp } from '../context/AppContext'
import { CAMPAIGN_GOAL, CHANNELS, MESSAGE_VARIANTS } from '../data/campaignPlan'
import { resetLiveAnalytics, toggleDemoMode } from '../lib/analytics'
import { loadCampaignAnalytics, resetCampaignAnalytics } from '../lib/campaignAnalytics'

function FunnelRow({
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
    <div
      className={`rounded-xl p-3 ${accent ? 'bg-indigo-950/50 border border-indigo-800/50' : 'bg-slate-900/60 border border-slate-800'}`}
    >
      <div className="flex justify-between items-baseline">
        <span className="text-sm text-slate-300">{label}</span>
        <span className="font-display text-lg font-bold text-white">
          {value.toLocaleString()}
          {target !== undefined && (
            <span className="text-xs font-normal text-slate-500"> / {target}</span>
          )}
        </span>
      </div>
      {rate !== null && <p className="text-[10px] text-slate-500 mt-1">{rate}% of previous step</p>}
    </div>
  )
}

export function Analytics() {
  const { displayAnalytics, analytics, refreshAnalytics, resetDemo } = useApp()
  const d = displayAnalytics
  const campaign = loadCampaignAnalytics()

  const funnel = [
    { label: 'Visitors', value: d.visitors },
    { label: 'Diagnostic starts', value: d.diagnosticStarts, prev: d.visitors },
    { label: 'Diagnostic completions', value: d.diagnosticCompletions, prev: d.diagnosticStarts },
    {
      label: 'Registrations',
      value: d.registrations,
      prev: d.diagnosticCompletions,
      target: CAMPAIGN_GOAL.registrations,
      accent: true,
    },
    { label: 'Referrals (registrations)', value: d.referralRegistrations, prev: d.registrations },
    { label: 'Attendance confirmed', value: d.attended, prev: d.registrations },
    { label: 'Starter kit views', value: d.starterKitViews, prev: d.attended },
  ]

  const progressPct = Math.min(100, Math.round((d.registrations / CAMPAIGN_GOAL.registrations) * 100))

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-white mb-1">Growth dashboard</h1>
      <p className="text-sm text-slate-400 mb-2">
        Tied to 7-day plan · ₹{CAMPAIGN_GOAL.budgetInr} · {analytics.demoMode ? 'Demo seed + live' : 'Live only'}
      </p>
      <div className="mb-4">
        <div className="flex justify-between text-xs text-slate-500 mb-1">
          <span>Registration goal</span>
          <span>{progressPct}%</span>
        </div>
        <div className="h-2 rounded-full bg-slate-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      <div className="space-y-2 mb-6">
        {funnel.map((row, i) => (
          <div key={row.label}>
            {i > 0 && <div className="text-center text-slate-600 text-xs py-0.5">↓</div>}
            <FunnelRow
              label={row.label}
              value={row.value}
              prev={row.prev}
              accent={row.accent}
              target={'target' in row ? row.target : undefined}
            />
          </div>
        ))}
      </div>

      <h2 className="text-sm font-semibold text-slate-300 mb-2">By channel (live session)</h2>
      <div className="space-y-2 mb-6 text-xs">
        {CHANNELS.map((ch) => {
          const b = campaign.byChannel[ch.id]
          return (
            <div key={ch.id} className="glass rounded-lg p-3 flex justify-between">
              <span className="text-slate-300">{ch.name}</span>
              <span className="text-slate-500">
                {b.visitors} vis · {b.diagnosticStarts} diag · {b.registrations} reg
              </span>
            </div>
          )
        })}
      </div>

      <h2 className="text-sm font-semibold text-slate-300 mb-2">By message variant (live session)</h2>
      <div className="space-y-2 mb-6 text-xs">
        {MESSAGE_VARIANTS.map((v) => {
          const b = campaign.byVariant[v.id]
          return (
            <div key={v.id} className="glass rounded-lg p-3">
              <div className="flex justify-between">
                <span className="font-bold text-indigo-400">{v.id}</span>
                <span className="text-slate-500">
                  {b.visitors} vis · {b.registrations} reg
                </span>
              </div>
              <p className="text-slate-400 mt-1 truncate">{v.headline}</p>
            </div>
          )
        })}
      </div>

      <h2 className="text-sm font-semibold text-slate-300 mb-2">Referral & kit</h2>
      <div className="grid grid-cols-2 gap-2 mb-6 text-sm">
        <Stat label="Share clicks" value={d.shareClicks} />
        <Stat label="Referral visits" value={d.referralVisits} />
        <Stat label="E-book downloads" value={d.ebookDownloads} />
        <Stat label="Tools guide opens" value={d.toolsGuideOpens} />
      </div>

      <div className="flex flex-col gap-2">
        <Link to="/plan">
          <Button variant="secondary">View campaign plan (for slides)</Button>
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
          <Button variant="primary">Back to experience</Button>
        </Link>
      </div>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg bg-slate-900/80 p-3 border border-slate-800">
      <p className="text-[10px] text-slate-500 uppercase">{label}</p>
      <p className="font-semibold text-white">{value.toLocaleString()}</p>
    </div>
  )
}
