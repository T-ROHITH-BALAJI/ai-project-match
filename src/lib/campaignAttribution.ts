import {
  type ChannelId,
  type MessageVariantId,
  getMessageVariant,
} from '../data/campaignPlan'

export interface CampaignAttribution {
  channel: ChannelId
  messageVariant: MessageVariantId
  clubSlug: string | null
  referralCode: string | null
  utmCampaign: string | null
}

const ATTRIBUTION_KEY = 'ai-project-match-attribution'
const DEFAULT_VARIANT: MessageVariantId = 'B'

export function parseAttributionFromSearch(search: string): CampaignAttribution {
  const params = new URLSearchParams(search)
  const source = params.get('utm_source')?.toLowerCase()
  const ref = params.get('ref')

  let channel: ChannelId = 'direct'
  if (ref) channel = 'referral'
  else if (source === 'whatsapp') channel = 'whatsapp'
  else if (source === 'instagram') channel = 'instagram'
  else if (source === 'clubs_email' || source === 'club') channel = 'clubs_email'

  const msgParam = params.get('msg')?.toUpperCase()
  const messageVariant: MessageVariantId =
    msgParam === 'A' || msgParam === 'B' || msgParam === 'C' ? msgParam : DEFAULT_VARIANT

  return {
    channel,
    messageVariant,
    clubSlug: params.get('club'),
    referralCode: ref,
    utmCampaign: params.get('utm_campaign'),
  }
}

export function loadStoredAttribution(): CampaignAttribution | null {
  try {
    const raw = sessionStorage.getItem(ATTRIBUTION_KEY)
    return raw ? (JSON.parse(raw) as CampaignAttribution) : null
  } catch {
    return null
  }
}

export function storeAttribution(attr: CampaignAttribution): void {
  sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(attr))
}

export function resolveAttribution(search: string): CampaignAttribution {
  const fromUrl = parseAttributionFromSearch(search)
  const stored = loadStoredAttribution()
  if (!stored) {
    storeAttribution(fromUrl)
    return fromUrl
  }
  // First-touch: keep stored unless URL explicitly carries new campaign params
  const params = new URLSearchParams(search)
  if (params.has('utm_source') || params.has('msg') || params.has('ref')) {
    storeAttribution(fromUrl)
    return fromUrl
  }
  return stored
}

export function buildCampaignQuery(attr: Partial<CampaignAttribution>): string {
  const q = new URLSearchParams()
  if (attr.messageVariant && attr.messageVariant !== 'B') q.set('msg', attr.messageVariant)
  if (attr.referralCode) {
    q.set('ref', attr.referralCode)
    q.set('utm_source', 'referral')
  } else if (attr.channel && attr.channel !== 'direct' && attr.channel !== 'referral') {
    q.set('utm_source', attr.channel === 'clubs_email' ? 'clubs_email' : attr.channel)
  }
  if (attr.clubSlug) q.set('club', attr.clubSlug)
  if (attr.utmCampaign) q.set('utm_campaign', attr.utmCampaign)
  const s = q.toString()
  return s ? `?${s}` : ''
}

export function pathWithCampaign(path: string, attr: CampaignAttribution | null): string {
  if (!attr) return path
  return `${path}${buildCampaignQuery(attr)}`
}

export function messagingForSession(attr: CampaignAttribution) {
  return getMessageVariant(attr.messageVariant)
}
