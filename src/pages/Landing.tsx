import { CAMPAIGN_GOAL, channelBanner } from '../data/campaignPlan'
import { Button } from '../components/Button'
import { CampaignLink } from '../components/CampaignLink'
import { SharePanel } from '../components/SharePanel'
import { useApp } from '../context/AppContext'
import { messagingForSession } from '../lib/campaignAttribution'
import { WORKSHOP } from '../data/workshop'

const journey = [
  { n: '01', title: 'Discover', sub: 'Find the right AI project' },
  { n: '02', title: 'Match', sub: 'Personalized recommendation' },
  { n: '03', title: 'Register', sub: 'Seat + joining details' },
  { n: '04', title: 'Build', sub: '60-minute live workshop' },
  { n: '05', title: 'Grow', sub: 'Kit, roadmap, resume' },
]

export function Landing() {
  const { attribution } = useApp()
  const messaging = messagingForSession(attribution)
  const banner = channelBanner(attribution.channel)
  const isWorkshopFirst = messaging.id === 'A'

  return (
    <div>
      {banner && (
        <div className="mb-5 rounded-xl bg-good-soft border border-good/15 px-4 py-2.5 text-xs text-good">
          {banner}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        <div className="lg:col-span-7">
          <span className="inline-block rounded-full bg-brand-soft px-3 py-1 text-xs font-medium text-brand border border-brand/15">
            {CAMPAIGN_GOAL.workshopTitle}
          </span>
          <h1 className="mt-6 font-display text-4xl sm:text-5xl font-bold leading-[1.12] tracking-tight text-ink text-balance">
            {messaging.headline.split('YOU').map((part, i, parts) => (
              <span key={i}>
                {part}
                {i < parts.length - 1 && <span className="text-warm">YOU</span>}
              </span>
            ))}
          </h1>
          <p className="mt-4 text-ink-soft text-base sm:text-lg leading-relaxed max-w-xl">
            {messaging.subheadline}
          </p>
          <p className="mt-3 text-sm text-muted">
            Free · 30 seconds · Built for final-year engineering students
          </p>
          <p className="mt-1 text-[10px] text-muted">
            Campaign: {attribution.channel} · Message {attribution.messageVariant}
          </p>

          <div className="mt-7 max-w-md space-y-2">
            <CampaignLink to={isWorkshopFirst ? '/register' : '/diagnostic'} className="block">
              <Button>
                {isWorkshopFirst ? messaging.cta : 'Find My Project → Build It in 60 Min'}
              </Button>
            </CampaignLink>
            {!isWorkshopFirst && (
              <CampaignLink to="/register" className="block">
                <Button variant="secondary">Skip to workshop seat (already know your idea)</Button>
              </CampaignLink>
            )}
          </div>

          <div className="card p-5 sm:p-6 mt-8 max-w-xl">
            <p className="eyebrow mb-2">Workshop</p>
            <p className="text-sm text-ink-soft leading-relaxed">
              {isWorkshopFirst ? (
                <>
                  Prefer a recommendation first?{' '}
                  <CampaignLink to="/diagnostic" className="text-brand underline">
                    Take the 5-question match
                  </CampaignLink>{' '}
                  — that&apos;s what we promote on WhatsApp & Instagram.
                </>
              ) : (
                <>
                  Want to build your first AI project? Our free workshop shows you how to turn the idea
                  into a working prototype in <strong className="text-ink font-medium">60 minutes</strong>.
                </>
              )}
            </p>
            <p className="text-xs text-muted mt-2">
              {WORKSHOP.title} · {WORKSHOP.date} · {WORKSHOP.time} {WORKSHOP.timezone}
            </p>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="card p-5 sm:p-6">
            <p className="eyebrow mb-4">Your growth path</p>
            <ol className="space-y-3">
              {journey.map((item) => (
                <li key={item.n} className="flex gap-3 items-start">
                  <span className="font-display text-sm font-bold text-brand w-7 shrink-0">{item.n}</span>
                  <div>
                    <p className="text-sm font-semibold text-ink">{item.title}</p>
                    <p className="text-xs text-muted">{item.sub}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="text-xs text-muted mt-5 leading-relaxed">
              First we give you a project that fits. Then we make the workshop easy to attend. Then we
              help you turn the build into career value.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-3">
            {[
              { label: 'Match', sub: 'then register' },
              { label: 'Live', sub: '60-min build' },
              { label: 'Kit', sub: 'after you finish' },
            ].map((item) => (
              <div key={item.label} className="card py-3 px-2 text-center">
                <div className="text-sm font-semibold text-ink">{item.label}</div>
                <div className="text-[10px] text-muted uppercase tracking-wide">{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-xl">
        <SharePanel variant="workshop" title="Know another final-year engineering student?" />
      </div>

      <section className="card p-5 sm:p-6 mt-10 max-w-xl">
        <h2 className="font-display text-base font-semibold text-ink">Questions or need help?</h2>
        <p className="text-sm text-ink-soft mt-2">Email: support@nxtwave.example</p>
        <p className="text-sm text-ink-soft">Phone: +91 XXXXX XXXXX</p>
        <p className="text-xs text-muted mt-2">Placeholder / demo contact details — not a real inbox or phone line.</p>
      </section>
    </div>
  )
}
