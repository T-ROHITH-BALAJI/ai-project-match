import { WORKSHOP } from '../data/workshop'

export function formatJoiningDetails(): string {
  return [
    `You're registered for ${WORKSHOP.title}`,
    '',
    `Date: ${WORKSHOP.date}`,
    `Time: ${WORKSHOP.time} ${WORKSHOP.timezone}`,
    `Duration: ${WORKSHOP.durationMinutes} minutes`,
    '',
    'Workshop access:',
    `Meeting ID: ${WORKSHOP.meetingId}`,
    `Passcode: ${WORKSHOP.passcode}`,
    `Join: ${WORKSHOP.joinUrl}`,
  ].join('\n')
}

export async function copyJoiningDetails(): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(formatJoiningDetails())
    return true
  } catch {
    return false
  }
}
