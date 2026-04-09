function formatCalendarDate(isoDate) {
  const date = new Date(isoDate)

  return date
    .toISOString()
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}Z$/, 'Z')
}

export function downloadEventCalendarFile({
  title,
  description,
  location,
  startDate,
  endDate,
}) {
  const fileContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'BEGIN:VEVENT',
    `UID:${Date.now()}@festflow`,
    `DTSTAMP:${formatCalendarDate(new Date().toISOString())}`,
    `DTSTART:${formatCalendarDate(startDate)}`,
    `DTEND:${formatCalendarDate(endDate)}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${(description || '').replace(/\n/g, ' ')}`,
    `LOCATION:${(location || '').replace(/\n/g, ' ')}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\n')

  const blob = new Blob([fileContent], { type: 'text/calendar;charset=utf-8' })
  const url = window.URL.createObjectURL(blob)
  const anchor = document.createElement('a')

  anchor.href = url
  anchor.download = `${title.replace(/[^a-z0-9]/gi, '-').toLowerCase() || 'event'}.ics`
  anchor.click()

  window.URL.revokeObjectURL(url)
}
