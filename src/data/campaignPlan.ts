/**
 * Single source of truth: the 7-day / ₹2,000 plan drives landing copy,
 * UTM structure, share templates, and dashboard targets.
 * Your slide deck should mirror this file.
 */

export type ChannelId = 'whatsapp' | 'instagram' | 'clubs_email' | 'referral' | 'direct'
export type MessageVariantId = 'A' | 'B' | 'C'

export const CAMPAIGN_GOAL = {
  registrations: 500,
  budgetInr: 2000,
  durationDays: 7,
  workshopTitle: 'Build Your First AI Project in 60 Minutes',
} as const

/** Section 1 — Understand the student (powers product + messaging, not a student form). */
export const STUDENT_INSIGHT = {
  who: 'Final-year B.Tech students (CSE, AI/DS, ECE, EEE) in India, 3–6 months from placements or final-year project submission.',
  whyTheyCare:
    'They need a concrete AI project for resume/FYP—not another “introduction to AI” lecture. They are unsure which project fits their branch and skill level.',
  whyRegister:
    'Free personalized project match first, then a 60-minute live build session for that exact idea—low risk, immediate value, clear next step.',
  productLink:
    'The 5 diagnostic questions map directly: branch, skill comfort, interest area, goal (placement/FYP/etc.), and time available.',
} as const

export const CHANNELS = [
  {
    id: 'whatsapp' as const,
    priority: 1,
    name: 'WhatsApp batch & placement groups',
    budgetInr: 900,
    why: 'Highest trust; peers forward links; mobile-first matches our asset.',
    tactic: '3 rotating posters + personal forward from campus ambassadors; link includes utm_source=whatsapp.',
    expectedRegs: 280,
  },
  {
    id: 'instagram' as const,
    priority: 2,
    name: 'Instagram Reels + stories (geo: engineering colleges)',
    budgetInr: 700,
    why: 'Reach students outside your immediate network; visual hook = project match result.',
    tactic: '₹100/day boost × 7 days; CTA “Find your project”; utm_source=instagram.',
    expectedRegs: 140,
  },
  {
    id: 'clubs_email' as const,
    priority: 3,
    name: 'IEEE / coding club email + notice board QR',
    budgetInr: 400,
    why: 'Official channel for final-year push; QR to mobile diagnostic.',
    tactic: 'One mail + one poster; utm_source=clubs_email&club=campus_slug.',
    expectedRegs: 50,
  },
  {
    id: 'referral' as const,
    priority: 4,
    name: 'Peer referral after match (organic)',
    budgetInr: 0,
    why: 'Share message includes friend’s project name—more interesting than ads.',
    tactic: 'ref= code after registration; tracked separately.',
    expectedRegs: 30,
  },
] as const

/** A/B/C tests — default landing uses B (planned winner until data says otherwise). */
export const MESSAGE_VARIANTS = [
  {
    id: 'A' as const,
    headline: 'Build Your First AI Project in 60 Minutes',
    subheadline:
      'Start with a free live workshop—then keep building with mentor support and a starter kit.',
    cta: 'Reserve My Free Seat',
    angle: 'Workshop-led',
  },
  {
    id: 'B' as const,
    headline: 'What AI Project Should YOU Build?',
    subheadline:
      'Answer 5 quick questions and get a personalized AI project idea based on your skills, interests and goals.',
    cta: 'Find My AI Project',
    angle: 'Match-first (primary funnel)',
  },
  {
    id: 'C' as const,
    headline: 'Final Year? Put a Real AI Project on Your Resume',
    subheadline:
      'Get a project matched to your branch and goals—then build the first version in a free 60-minute session.',
    cta: 'Get My Project Match',
    angle: 'Placement / resume',
  },
] as const

export const WEEK_PLAN = [
  { day: 1, focus: 'Launch variant B on WhatsApp + Instagram', kpi: '150 diagnostic starts' },
  { day: 2, focus: 'Turn on variant C in placement groups', kpi: '80 registrations cumulative' },
  { day: 3, focus: 'Club email + QR; pause losing variant', kpi: '150 registrations' },
  { day: 4, focus: 'Push referral shares from confirm screen', kpi: '220 registrations' },
  { day: 5, focus: 'Reminder content + “see your match” retarget', kpi: '320 registrations' },
  { day: 6, focus: 'Last-chance workshop seats', kpi: '420 registrations' },
  { day: 7, focus: 'Final push + report funnel', kpi: '500 registrations' },
] as const

export function getMessageVariant(id: MessageVariantId) {
  return MESSAGE_VARIANTS.find((v) => v.id === id) ?? MESSAGE_VARIANTS[1]
}

export function getChannel(id: ChannelId) {
  return CHANNELS.find((c) => c.id === id)
}

export function channelBanner(channel: ChannelId): string | null {
  switch (channel) {
    case 'whatsapp':
      return 'Shared in your batch group — tap below to get your project match.'
    case 'instagram':
      return 'From Instagram — 30 seconds to your personalized AI project.'
    case 'clubs_email':
      return 'From your campus club — free for final-year students.'
    case 'referral':
      return 'A friend thought this would fit you — see your own match.'
    default:
      return null
  }
}
