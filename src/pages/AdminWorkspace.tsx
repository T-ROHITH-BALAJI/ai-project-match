import { Link } from 'react-router-dom'

const tools = [
  {
    to: '/plan',
    title: 'Growth Plan',
    detail: 'Campaign strategy and experiments — student insight, ₹2,000 budget, channels, and 7-day rhythm.',
  },
  {
    to: '/analytics',
    title: 'Growth Dashboard',
    detail: 'Funnel, registrations, attendance, kit metrics, channel and message-variant tracking.',
  },
  {
    to: '/agent',
    title: 'AI Communication Agent',
    detail: 'Event-driven communication automation prototype — confirmation, reminders, and kit delivery.',
  },
]

export function AdminWorkspace() {
  return (
    <div>
      <p className="eyebrow mb-2">Internal Growth Operations</p>
      <h1 className="font-display text-3xl font-bold text-ink mb-2">Admin Workspace</h1>
      <p className="text-sm text-ink-soft max-w-2xl mb-8">
        NxtWave AI Builder — evaluator and operations layer. These tools are not part of the student
        journey. Data here is simulated unless labeled as a live session event.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tools.map((tool) => (
          <Link
            key={tool.to}
            to={tool.to}
            className="card p-5 sm:p-6 hover:border-brand/30 transition-colors block"
          >
            <h2 className="font-display text-lg font-semibold text-ink">{tool.title}</h2>
            <p className="text-sm text-ink-soft mt-2 leading-relaxed">{tool.detail}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
