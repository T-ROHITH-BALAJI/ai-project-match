import { useEffect, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/Button'
import { CampaignLink } from '../components/CampaignLink'
import { SharePanel } from '../components/SharePanel'
import { startRegistrationTracking, useApp } from '../context/AppContext'
import { pathWithCampaign } from '../lib/campaignAttribution'
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
    navigate(pathWithCampaign('/confirmation', attribution))
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-white mb-1">Reserve your free seat</h1>
      {session.project ? (
        <>
          <p className="text-sm text-slate-400 mb-1">
            Your match: <span className="text-cyan-400 font-medium">{session.project.name}</span>
          </p>
          <p className="text-xs text-slate-500 mb-6">
            Diagnostic answers are saved with this registration (campaign: {attribution.channel}).
          </p>
        </>
      ) : (
        <>
          <p className="text-sm text-slate-400 mb-1">Workshop-first signup — no match yet.</p>
          <p className="text-xs text-slate-500 mb-4">
            <CampaignLink to="/diagnostic" className="text-cyan-400 underline">
              Take the 5-question match
            </CampaignLink>{' '}
            first for a stronger workshop experience (recommended on WhatsApp / Instagram).
          </p>
        </>
      )}

      <form onSubmit={onSubmit} className="space-y-3">
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
            <span className="text-xs text-slate-500 mb-1 block">{label}</span>
            <input
              type={type}
              required={required}
              value={form[key]}
              onChange={(e) => update(key, e.target.value)}
              className="w-full rounded-xl bg-slate-900 border border-slate-700 px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </label>
        ))}
        <Button type="submit" className="mt-2">
          Confirm registration
        </Button>
      </form>

      <SharePanel variant="workshop" compact />
    </div>
  )
}
