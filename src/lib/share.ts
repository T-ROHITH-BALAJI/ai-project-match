import type { CampaignAttribution } from './campaignAttribution'
import { buildCampaignQuery } from './campaignAttribution'
import { trackEvent } from './analytics'

export function getShareUrl(ref: string, attr?: Partial<CampaignAttribution>): string {
  const base = typeof window !== 'undefined' ? window.location.origin : 'https://ai-project-match.nxtwave.example'
  const url = new URL(base)
  url.pathname = '/'
  const shareAttr: Partial<CampaignAttribution> = {
    messageVariant: attr?.messageVariant ?? 'B',
    referralCode: ref,
  }
  const qs = buildCampaignQuery(shareAttr)
  url.search = qs.startsWith('?') ? qs.slice(1) : qs
  return url.toString()
}

export function buildProjectShareMessage(projectName: string, ref: string, attr?: CampaignAttribution): string {
  return `I just got my personalized AI project recommendation 👀
Mine is: ${projectName}.

Find your own AI project:
${getShareUrl(ref, attr)}

Free 60-minute workshop to build the first version.`
}

export function buildWorkshopShareMessage(ref: string, attr?: CampaignAttribution): string {
  return `Final-year engineers — find YOUR AI project in 5 questions 🚀

${getShareUrl(ref, attr)}

Then join the free "Build Your First AI Project in 60 Minutes" workshop.`
}

export async function copyInviteLink(ref: string, attr?: CampaignAttribution): Promise<boolean> {
  trackEvent('share_click')
  try {
    await navigator.clipboard.writeText(getShareUrl(ref, attr))
    return true
  } catch {
    return false
  }
}

export function shareWhatsApp(text: string): void {
  trackEvent('share_click')
  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer')
}
