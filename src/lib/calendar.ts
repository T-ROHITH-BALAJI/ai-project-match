import { WORKSHOP } from '../data/workshop'

function pad(n: number): string {
  return String(n).padStart(2, '0')
}

export function buildGoogleCalendarUrl(): string {
  const start = `${WORKSHOP.dateIso.replace(/-/g, '')}T${WORKSHOP.time24.replace(':', '')}00`
  const endHour = parseInt(WORKSHOP.time24.split(':')[0]!, 10) + 1
  const end = `${WORKSHOP.dateIso.replace(/-/g, '')}T${pad(endHour)}0000`
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: WORKSHOP.calendarTitle,
    dates: `${start}/${end}`,
    details: `${WORKSHOP.calendarDescription}\n\nJoin: ${WORKSHOP.joinUrl}`,
    location: WORKSHOP.joinUrl,
    ctz: 'Asia/Kolkata',
  })
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

export function downloadIcsFile(projectName?: string): void {
  const start = `${WORKSHOP.dateIso.replace(/-/g, '')}T${WORKSHOP.time24.replace(':', '')}00`
  const endHour = parseInt(WORKSHOP.time24.split(':')[0]!, 10) + 1
  const end = `${WORKSHOP.dateIso.replace(/-/g, '')}T${pad(endHour)}0000`
  const desc = projectName
    ? `${WORKSHOP.calendarDescription}\\nYour project match: ${projectName}\\nJoin: ${WORKSHOP.joinUrl}`
    : `${WORKSHOP.calendarDescription}\\nJoin: ${WORKSHOP.joinUrl}`

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//NxtWave//AI Project Match//EN',
    'BEGIN:VEVENT',
    `DTSTART;TZID=Asia/Kolkata:${start}`,
    `DTEND;TZID=Asia/Kolkata:${end}`,
    `SUMMARY:${WORKSHOP.calendarTitle}`,
    `DESCRIPTION:${desc}`,
    `LOCATION:${WORKSHOP.joinUrl}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'nxtwave-ai-workshop.ics'
  a.click()
  URL.revokeObjectURL(url)
}
