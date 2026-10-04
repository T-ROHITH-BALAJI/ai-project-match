import type { ChannelId, MessageVariantId } from '../data/campaignPlan'
import { loadJson, saveJson } from './storage'

const CAMPAIGN_ANALYTICS_KEY = 'ai-project-match-campaign-analytics'

export interface BucketCounts {
  visitors: number
  diagnosticStarts: number
  registrations: number
}

export interface CampaignAnalyticsState {
  byChannel: Record<ChannelId, BucketCounts>
  byVariant: Record<MessageVariantId, BucketCounts>
}

const emptyBucket = (): BucketCounts => ({
  visitors: 0,
  diagnosticStarts: 0,
  registrations: 0,
})

function defaultState(): CampaignAnalyticsState {
  const channels: ChannelId[] = ['whatsapp', 'instagram', 'clubs_email', 'referral', 'direct']
  const variants: MessageVariantId[] = ['A', 'B', 'C']
  return {
    byChannel: Object.fromEntries(channels.map((c) => [c, emptyBucket()])) as Record<
      ChannelId,
      BucketCounts
    >,
    byVariant: Object.fromEntries(variants.map((v) => [v, emptyBucket()])) as Record<
      MessageVariantId,
      BucketCounts
    >,
  }
}

export function loadCampaignAnalytics(): CampaignAnalyticsState {
  return loadJson(CAMPAIGN_ANALYTICS_KEY, defaultState())
}

export type CampaignMetric = keyof BucketCounts

export function trackCampaign(
  channel: ChannelId,
  variant: MessageVariantId,
  metric: CampaignMetric,
  delta = 1
): void {
  const state = loadCampaignAnalytics()
  state.byChannel[channel][metric] += delta
  state.byVariant[variant][metric] += delta
  saveJson(CAMPAIGN_ANALYTICS_KEY, state)
}

export function resetCampaignAnalytics(): void {
  saveJson(CAMPAIGN_ANALYTICS_KEY, defaultState())
}
