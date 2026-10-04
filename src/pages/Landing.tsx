import { CAMPAIGN_GOAL, channelBanner } from '../data/campaignPlan'
import { Button } from '../components/Button'
import { CampaignLink } from '../components/CampaignLink'
import { SharePanel } from '../components/SharePanel'
import { useApp } from '../context/AppContext'
import { messagingForSession } from '../lib/campaignAttribution'
import { WORKSHOP } from '../data/workshop'

export function Landing() {
  const { attribution } = useApp()
  const messaging = messagingForSession(attribution)
  const banner = channelBanner(attribution.channel)

  const isWorkshopFirst = messaging.id === 'A'

  return (
    <div className="animate-in fade-in duration-500">
      {banner && (
        <div className="mb-4 rounded-xl bg-emerald-950/40 border border-emerald-800/50 px-3 py-2 text-xs text-emerald-200/90">
          {banner}
        </div>
      )}

      <div className="pt-2 pb-4">
        <span className="inline-block rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-medium text-indigo-300 border border-indigo-500/30">
          NxtWave · {CAMPAIGN_GOAL.workshopTitle}
        </span>
        <h1 className="mt-5 font-display text-3xl sm:text-4xl font-bold leading-tight text-white">
          {messaging.headline.split('YOU').map((part, i, parts) => (
            <span key={i}>
              {part}
              {i < parts.length - 1 && <span className="text-cyan-400">YOU</span>}
            </span>
          ))}
        </h1>
        <p className="mt-4 text-slate-400 text-base leading-relaxed">{messaging.subheadline}</p>
        <p className="mt-2 text-sm text-slate-500">
          Free · 30 seconds · Built for final-year engineering students
        </p>
        <p className="mt-1 text-[10px] text-slate-600">
          Campaign: {attribution.channel} · Message {attribution.messageVariant}
        </p>
      </div>

      <CampaignLink to={isWorkshopFirst ? '/register' : '/diagnostic'} className="block">
        <Button>{messaging.cta}</Button>
      </CampaignLink>

      {!isWorkshopFirst && (
        <CampaignLink to="/register" className="block mt-2">
          <Button variant="secondary">Skip to workshop seat (already know your idea)</Button>
        </CampaignLink>
      )}

      <div className="glass rounded-2xl p-4 mt-6">
        <p className="text-sm text-slate-300 leading-relaxed">
          {isWorkshopFirst ? (
            <>
              Prefer a recommendation first?{' '}
              <CampaignLink to="/diagnostic" className="text-cyan-400 underline">
                Take the 5-question match
              </CampaignLink>{' '}
              — that&apos;s what we promote on WhatsApp & Instagram.
            </>
          ) : (
            <>
              Want to build your first AI project? Our free workshop shows you how to turn the idea into a
              working prototype in <strong className="text-white font-medium">60 minutes</strong>.
            </>
          )}
        </p>
        <p className="text-xs text-slate-500 mt-2">{WORKSHOP.title}</p>
      </div>

      <SharePanel variant="workshop" title="Know a final-year engineering student?" />

      <div className="mt-8 grid grid-cols-3 gap-2 text-center">
        {[
          { label: 'Match', sub: 'then register' },
          { label: 'Live', sub: '60-min build' },
          { label: 'Kit', sub: 'after attend' },
        ].map((item) => (
          <div key={item.label} className="rounded-xl bg-slate-900/60 py-3 px-2 border border-slate-800">
            <div className="text-sm font-semibold text-slate-200">{item.label}</div>
            <div className="text-[10px] text-slate-500 uppercase tracking-wide">{item.sub}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
