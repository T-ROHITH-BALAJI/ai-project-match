import type { AnalyticsEvent, AnalyticsState } from '../types'
import { ANALYTICS_KEY, loadJson, saveJson } from './storage'

const DEMO_SEED: Omit<AnalyticsState, 'demoMode'> = {
  visitors: 1847,
  diagnosticStarts: 1392,
  diagnosticCompletions: 1156,
  registrationStarts: 620,
  registrations: 468,
  shareClicks: 214,
  referralVisits: 89,
  referralRegistrations: 31,
  attended: 312,
  starterKitViews: 298,
  ebookDownloads: 276,
  toolsGuideOpens: 241,
  checklistOpens: 229,
  promptPackOpens: 198,
}

const LIVE_DEFAULT: AnalyticsState = {
  ...Object.fromEntries(
    Object.keys(DEMO_SEED).map((k) => [k, 0])
  ) as Omit<AnalyticsState, 'demoMode'>,
  demoMode: true,
}

const eventField: Record<AnalyticsEvent, keyof Omit<AnalyticsState, 'demoMode'>> = {
  visitor: 'visitors',
  diagnostic_start: 'diagnosticStarts',
  diagnostic_complete: 'diagnosticCompletions',
  registration_start: 'registrationStarts',
  registration: 'registrations',
  share_click: 'shareClicks',
  referral_visit: 'referralVisits',
  referral_registration: 'referralRegistrations',
  attendance_confirmed: 'attended',
  starter_kit_view: 'starterKitViews',
  ebook_download: 'ebookDownloads',
  tools_guide_open: 'toolsGuideOpens',
  checklist_open: 'checklistOpens',
  prompt_pack_open: 'promptPackOpens',
}

export function loadAnalytics(): AnalyticsState {
  return loadJson(ANALYTICS_KEY, LIVE_DEFAULT)
}

export function trackEvent(event: AnalyticsEvent, delta = 1): AnalyticsState {
  const state = loadAnalytics()
  const field = eventField[event]
  const next = { ...state, [field]: state[field] + delta }
  saveJson(ANALYTICS_KEY, next)
  return next
}

export function getDisplayAnalytics(state: AnalyticsState): AnalyticsState {
  if (!state.demoMode) return state
  const merged = { ...state, demoMode: true }
  for (const key of Object.keys(DEMO_SEED) as (keyof typeof DEMO_SEED)[]) {
    merged[key] = DEMO_SEED[key] + state[key]
  }
  return merged
}

export function toggleDemoMode(): AnalyticsState {
  const state = loadAnalytics()
  const next = { ...state, demoMode: !state.demoMode }
  saveJson(ANALYTICS_KEY, next)
  return next
}

export function resetLiveAnalytics(): AnalyticsState {
  saveJson(ANALYTICS_KEY, LIVE_DEFAULT)
  return LIVE_DEFAULT
}
