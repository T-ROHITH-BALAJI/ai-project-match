import { useState } from 'react'
import { WORKSHOP } from '../data/workshop'
import { copyJoiningDetails } from '../lib/joining'
import { buildGoogleCalendarUrl, downloadIcsFile } from '../lib/calendar'
import { Button } from './Button'

export function JoiningDetails({
  projectName,
  showCalendar = true,
}: {
  projectName?: string
  showCalendar?: boolean
}) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    const ok = await copyJoiningDetails()
    if (ok) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    }
  }

  return (
    <div className="card p-5 sm:p-6">
      <p className="eyebrow mb-3">Workshop access</p>
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        <div className="sm:col-span-2">
          <dt className="text-xs text-muted mb-0.5">Workshop</dt>
          <dd className="font-semibold text-ink">{WORKSHOP.title}</dd>
        </div>
        <div>
          <dt className="text-xs text-muted mb-0.5">Date</dt>
          <dd className="text-ink-soft">{WORKSHOP.date}</dd>
        </div>
        <div>
          <dt className="text-xs text-muted mb-0.5">Time</dt>
          <dd className="text-ink-soft">
            {WORKSHOP.time} {WORKSHOP.timezone}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-muted mb-0.5">Duration</dt>
          <dd className="text-ink-soft">{WORKSHOP.durationMinutes} minutes</dd>
        </div>
        <div>
          <dt className="text-xs text-muted mb-0.5">Meeting ID</dt>
          <dd className="font-mono text-ink font-medium">{WORKSHOP.meetingId}</dd>
        </div>
        <div>
          <dt className="text-xs text-muted mb-0.5">Passcode</dt>
          <dd className="font-mono text-ink font-medium">{WORKSHOP.passcode}</dd>
        </div>
      </dl>

      <div className="mt-5 space-y-2">
        <Button onClick={copy}>{copied ? 'Joining details copied ✓' : 'Copy Joining Details'}</Button>
        <a
          href={WORKSHOP.joinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full rounded-xl px-4 py-3.5 text-sm font-semibold text-center border border-line bg-card hover:bg-paper text-ink"
        >
          Open join link
        </a>
      </div>

      {showCalendar && (
        <div className="mt-4 pt-4 border-t border-line">
          <p className="text-xs text-muted mb-2">Add to calendar</p>
          <div className="flex flex-col sm:flex-row gap-2">
            <a
              href={buildGoogleCalendarUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 rounded-xl bg-card border border-line py-2.5 text-center text-xs font-semibold text-ink hover:bg-paper"
            >
              Add to Google Calendar
            </a>
            <button
              type="button"
              onClick={() => downloadIcsFile(projectName)}
              className="flex-1 rounded-xl bg-card border border-line py-2.5 text-xs font-semibold text-ink hover:bg-paper"
            >
              Download .ics
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
