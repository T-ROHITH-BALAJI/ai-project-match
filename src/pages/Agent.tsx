import { Link } from 'react-router-dom'
import { Button } from '../components/Button'
import { useApp } from '../context/AppContext'
import { AGENT_DISCLAIMER, AGENT_PLAYBOOK, type AgentPlaybookItem } from '../data/communicationAgent'
import { WORKSHOP } from '../data/workshop'

export function Agent() {
  const { session } = useApp()

  function fired(item: AgentPlaybookItem): boolean {
    if (item.firedWhen === 'registered') return !!session.registeredAt
    if (item.firedWhen === 'workshopDay') return session.workshopDay
    if (item.firedWhen === 'completed') return session.workshopCompleted
    if (item.firedWhen === 'missed') return session.attended === false
    if (item.firedWhen === 'kit') return session.starterKitUnlocked
    return false
  }

  return (
    <div>
      <p className="eyebrow mb-2">Cross-cutting system</p>
      <h1 className="font-display text-3xl font-bold text-ink mb-2">AI Communication Agent</h1>
      <p className="text-sm text-ink-soft max-w-2xl mb-2">
        Not a student journey step. This prototype shows how messages would fire beside the funnel —
        confirmation, reminders, kit delivery, and no-show recovery.
      </p>
      <p className="text-xs text-muted mb-6 max-w-2xl">{AGENT_DISCLAIMER}</p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-3">
          {AGENT_PLAYBOOK.map((item) => {
            const on = fired(item)
            return (
              <article key={item.id} className="card p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-wide text-muted">Event</p>
                    <h2 className="font-display font-semibold text-ink">{item.event}</h2>
                  </div>
                  <span
                    className={`text-[10px] uppercase tracking-wide rounded-full px-2.5 py-1 ${
                      on ? 'bg-good-soft text-good' : 'bg-paper-deep text-muted'
                    }`}
                  >
                    {on ? 'Fired in this session' : 'Waiting'}
                  </span>
                </div>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-[10px] uppercase text-muted">Agent action</p>
                    <p className="text-ink-soft">{item.action}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-muted">Channels</p>
                    <p className="text-ink-soft">{item.channels.join(' · ')}</p>
                  </div>
                </div>
                <p className="text-xs text-muted mt-3 leading-relaxed">{item.sample}</p>
              </article>
            )
          })}
        </div>

        <aside className="lg:col-span-4">
          <div className="card p-5 lg:sticky lg:top-24 space-y-3">
            <p className="eyebrow">This session</p>
            <p className="text-sm text-ink-soft">
              Walk the student flow and watch events flip to “Fired”. Nothing is sent to a real inbox
              or WhatsApp number.
            </p>
            <ul className="text-xs text-muted space-y-1">
              <li>Registered: {session.registeredAt ? 'yes' : 'no'}</li>
              <li>Workshop day: {session.workshopDay ? 'yes' : 'no'}</li>
              <li>Completed: {session.workshopCompleted ? 'yes' : 'no'}</li>
              <li>Kit unlocked: {session.starterKitUnlocked ? 'yes' : 'no'}</li>
            </ul>
            <p className="text-xs text-muted">
              {WORKSHOP.title} · future hook points: n8n, Zapier, email API, WhatsApp API.
            </p>
            <Link to="/admin">
              <Button variant="secondary">Admin Workspace</Button>
            </Link>
            <Link to="/analytics">
              <Button variant="secondary">Open growth dashboard</Button>
            </Link>
            <Link to="/">
              <Button variant="ghost">Student experience</Button>
            </Link>
          </div>
        </aside>
      </div>
    </div>
  )
}
