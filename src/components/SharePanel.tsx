import { useMemo, useState } from 'react'
import {
  buildProjectShareMessage,
  buildWorkshopShareMessage,
  copyInviteLink,
  getShareUrl,
  shareWhatsApp,
} from '../lib/share'
import { useApp } from '../context/AppContext'
import { Button } from './Button'

type ShareVariant = 'project' | 'workshop' | 'invite'

interface SharePanelProps {
  variant: ShareVariant
  projectName?: string
  title?: string
  compact?: boolean
}

export function SharePanel({ variant, projectName, title, compact }: SharePanelProps) {
  const { session, attribution } = useApp()
  const [copied, setCopied] = useState(false)

  const ref = session.myReferralCode ?? ''
  const shareUrl = useMemo(
    () => (ref ? getShareUrl(ref, attribution) : ''),
    [ref, attribution]
  )

  const message =
    variant === 'project' && projectName
      ? buildProjectShareMessage(projectName, ref, attribution)
      : buildWorkshopShareMessage(ref, attribution)

  const heading =
    title ??
    (variant === 'project'
      ? 'Challenge your friends: What AI project will they get?'
      : variant === 'invite'
        ? 'Your seat is confirmed. Want to invite a friend?'
        : 'Know a final-year engineering student?')

  async function handleCopy() {
    if (!ref) return
    const ok = await copyInviteLink(ref, attribution)
    if (ok) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  if (compact) {
    return (
      <div className="mt-4 space-y-2">
        {shareUrl && (
          <p className="text-[10px] text-slate-500 break-all font-mono leading-relaxed">{shareUrl}</p>
        )}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => shareWhatsApp(message)}
            className="flex-1 rounded-lg bg-emerald-600/20 border border-emerald-500/40 py-2 text-xs font-medium text-emerald-300"
          >
            WhatsApp
          </button>
          <button
            type="button"
            onClick={handleCopy}
            className="flex-1 rounded-lg bg-slate-800 border border-slate-600 py-2 text-xs font-medium text-slate-300"
          >
            {copied ? 'Copied!' : 'Copy referral link'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="glass rounded-2xl p-4 mt-4 border-dashed border-slate-600">
      <p className="text-sm text-slate-300 mb-3">{heading}</p>
      <p className="text-xs text-slate-500 mb-3">Optional — sharing never blocks your seat or kit.</p>
      {shareUrl && (
        <div className="rounded-lg bg-slate-950/80 border border-slate-700 p-2.5 mb-4">
          <p className="text-[10px] uppercase text-slate-500 mb-1">Your referral link</p>
          <p className="text-xs text-cyan-300/90 break-all font-mono leading-relaxed">{shareUrl}</p>
        </div>
      )}
      <div className="space-y-2">
        <Button variant="secondary" onClick={() => shareWhatsApp(message)}>
          Share on WhatsApp
        </Button>
        <Button variant="ghost" onClick={handleCopy}>
          {copied ? 'Referral link copied ✓' : 'Copy referral link'}
        </Button>
      </div>
    </div>
  )
}
