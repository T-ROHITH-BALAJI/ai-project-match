import { useEffect, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/Button'
import { CampaignLink } from '../components/CampaignLink'
import { SharePanel } from '../components/SharePanel'
import { startRegistrationTracking, useApp } from '../context/AppContext'
import { pathWithCampaign } from '../lib/campaignAttribution'
import { WORKSHOP } from '../data/workshop'
import type { RegistrationData } from '../types'

export function Register() {
  const navigate = useNavigate()
  const { session, register, attribution } = useApp()
  const [form, setForm] = useState<RegistrationData>({
    name: '',
    email: '',
    phone: '',
    college: '',
    branch: session.answers?.branch ?? '',
    graduationYear: '2026',
  })

  useEffect(() => {
    startRegistrationTracking()
  }, [])

  function update(field: keyof RegistrationData, value: string) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    register(form)
    void fetch('https://nxtwave-ai-builder.app.n8n.cloud/webhook/nxtwave-registration', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        project: session.project?.name ?? 'Your AI project',
        workshop: WORKSHOP.title,
        date: WORKSHOP.date,
        time: `${WORKSHOP.time} ${WORKSHOP.timezone}`,
        meetingId: WORKSHOP.meetingId,
      }),
    })
      .then((res) => {
        if (!res.ok) console.error('n8n registration webhook failed', res.status)
      })
      .catch((err) => {
        console.error('n8n registration webhook failed', err)
      })
    navigate(pathWithCampaign('/confirmation', attribution))
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-7">
        <h1 className="font-display text-3xl font-bold text-ink mb-1">Reserve your free seat</h1>
        {session.project ? (
          <>
            <p className="text-sm text-ink-soft mb-1">
              Your match: <span className="text-brand font-medium">{session.project.name}</span>
              {session.project.fitScore ? (
                <span className="text-muted"> · Project Fit {session.project.fitScore}%</span>
              ) : null}
            </p>
            <p className="text-xs text-muted mb-6">
              Diagnostic answers are saved with this registration (campaign: {attribution.channel}).
            </p>
          </>
        ) : (
          <>
            <p className="text-sm text-ink-soft mb-1">Workshop-first signup — no match yet.</p>
            <p className="text-xs text-muted mb-4">
              <CampaignLink to="/diagnostic" className="text-brand underline">
                Take the 5-question match
              </CampaignLink>{' '}
              first for a stronger workshop experience (recommended on WhatsApp / Instagram).
            </p>
          </>
        )}

        <form onSubmit={onSubmit} className="card p-5 sm:p-6 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {(
              [
                ['name', 'Full name', 'text', true],
                ['email', 'Email', 'email', true],
                ['phone', 'Phone / WhatsApp', 'tel', true],
                ['college', 'College', 'text', true],
                ['branch', 'Branch', 'text', true],
                ['graduationYear', 'Graduation year', 'text', true],
              ] as const
            ).map(([key, label, type, required]) => (
              <label key={key} className="block">
                <span className="text-xs text-muted mb-1 block">{label}</span>
                <input
                  type={type}
                  required={required}
                  value={form[key]}
                  onChange={(e) => update(key, e.target.value)}
                  className="w-full rounded-xl bg-card border border-line px-4 py-3 text-sm text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand/40"
                />
              </label>
            ))}
          </div>
          <Button type="submit" className="mt-2">
            Confirm registration
          </Button>
        </form>

        <SharePanel variant="workshop" compact />
      </div>

      <aside className="lg:col-span-5">
        <div className="card p-5 sm:p-6 lg:sticky lg:top-24">
          <p className="eyebrow mb-3">Workshop</p>
          <h2 className="font-display text-xl font-semibold text-ink">{WORKSHOP.title}</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between gap-4 border-b border-line pb-2">
              <dt className="text-muted">Date</dt>
              <dd className="text-ink font-medium text-right">{WORKSHOP.date}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-line pb-2">
              <dt className="text-muted">Time</dt>
              <dd className="text-ink font-medium">
                {WORKSHOP.time} {WORKSHOP.timezone}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Duration</dt>
              <dd className="text-ink font-medium">{WORKSHOP.durationMinutes} minutes</dd>
            </div>
          </dl>
          <p className="text-xs text-muted mt-4 leading-relaxed">
            After you register you immediately get Meeting ID, passcode, calendar files, and your
            personalized project roadmap. The free kit unlocks only after you complete the workshop.
          </p>
        </div>
      </aside>
    </div>
  )
}
