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
      ? 'Know another final-year engineering student?'
      : variant === 'invite'
        ? 'Know another final-year engineering student?'
        : 'Know another final-year engineering student?')

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
        <p className="text-xs text-muted">Invite them to find their AI project. Optional — never required.</p>
        {shareUrl && (
          <p className="text-[10px] text-muted break-all font-mono leading-relaxed">{shareUrl}</p>
        )}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => shareWhatsApp(message)}
            className="flex-1 rounded-lg bg-good-soft border border-good/20 py-2.5 text-xs font-medium text-good"
          >
            Share on WhatsApp
          </button>
          <button
            type="button"
            onClick={handleCopy}
            className="flex-1 rounded-lg bg-white border border-line py-2.5 text-xs font-medium text-ink-soft"
          >
            {copied ? 'Copied!' : 'Copy Referral Link'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="card p-5 mt-4 border-dashed">
      <p className="text-sm text-ink font-medium mb-1">{heading}</p>
      <p className="text-xs text-muted mb-3">
        Invite them to find their AI project. Optional — sharing never blocks your seat or kit.
      </p>
      {shareUrl && (
        <div className="rounded-lg bg-paper border border-line p-2.5 mb-4">
          <p className="text-[10px] uppercase text-muted mb-1">Your referral link</p>
          <p className="text-xs text-brand break-all font-mono leading-relaxed">{shareUrl}</p>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <Button variant="secondary" onClick={() => shareWhatsApp(message)}>
          Share on WhatsApp
        </Button>
        <Button variant="ghost" onClick={handleCopy}>
          {copied ? 'Referral link copied ✓' : 'Copy Referral Link'}
        </Button>
      </div>
    </div>
  )
}
