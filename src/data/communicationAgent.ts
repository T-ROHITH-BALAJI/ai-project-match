export type AgentChannel = 'Email' | 'WhatsApp'

export interface AgentPlaybookItem {
  id: string
  event: string
  action: string
  channels: AgentChannel[]
  sample: string
  /** Session flags that mark this prototype event as already “fired”. */
  firedWhen: 'registered' | 'workshopDay' | 'completed' | 'missed' | 'kit'
}

export const AGENT_DISCLAIMER =
  'Prototype automation — no real messages are sent. Production integrations can be connected through n8n, Zapier, email APIs or WhatsApp APIs.'

export const AGENT_PLAYBOOK: AgentPlaybookItem[] = [
  {
    id: 'reg',
    event: 'Registration completed',
    action: 'Generate and send confirmation message',
    channels: ['Email', 'WhatsApp'],
    sample:
      'You’re in. Workshop access, Meeting ID, passcode, and your project roadmap are ready — no inbox hunt required.',
    firedWhen: 'registered',
  },
  {
    id: 't24',
    event: 'Workshop starts in 24 hours',
    action: 'Generate reminder',
    channels: ['Email', 'WhatsApp'],
    sample: 'Tomorrow: Build Your First AI Project in 60 Minutes. Copy joining details and add it to your calendar.',
    firedWhen: 'workshopDay',
  },
  {
    id: 't1h',
    event: 'Workshop starts in 1 hour',
    action: 'Generate reminder',
    channels: ['Email', 'WhatsApp'],
    sample: 'Your AI workshop starts in 1 hour. Meeting ID and passcode are in this message.',
    firedWhen: 'workshopDay',
  },
  {
    id: 't10',
    event: 'Workshop starts in 10 minutes',
    action: 'Generate final reminder',
    channels: ['WhatsApp'],
    sample: 'Starting soon. Open your laptop and join with the Meeting ID in this chat.',
    firedWhen: 'workshopDay',
  },
  {
    id: 'done',
    event: 'Workshop completed',
    action: 'Generate free-kit delivery message',
    channels: ['Email', 'WhatsApp'],
    sample: 'Workshop complete. Your Free AI Builder Kit — e-book, tools guide, roadmap, and prompt pack — is unlocked.',
    firedWhen: 'completed',
  },
  {
    id: 'miss',
    event: 'Student did not attend',
    action: 'Generate recovery follow-up',
    channels: ['Email', 'WhatsApp'],
    sample: 'We missed you. Reply if you want the recording path or the next cohort seat — the kit unlocks after you complete a session.',
    firedWhen: 'missed',
  },
  {
    id: 'kit',
    event: 'Free kit unlocked',
    action: 'Generate kit engagement message',
    channels: ['Email', 'WhatsApp'],
    sample: 'Open your kit, then use Make My Project Resume-Ready to turn the build into bullets and a README.',
    firedWhen: 'kit',
  },
]
