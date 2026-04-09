export function downloadPassFile(pass) {
  const fileLines = [
    `Event: ${pass.title}`,
    `Category: ${pass.category}`,
    `Pass Number: ${pass.passNumber}`,
    `Registration Number: ${pass.registrationNumber}`,
    `Attendee: ${pass.attendeeName}`,
    `Email: ${pass.attendeeEmail}`,
    `Location: ${pass.location}`,
    `Starts: ${pass.startDate}`,
    `Ends: ${pass.endDate}`,
    `QR Code: ${pass.qrCode}`,
    `Status: ${pass.status}`,
  ]

  const blob = new Blob([fileLines.join('\n')], { type: 'text/plain;charset=utf-8' })
  const url = window.URL.createObjectURL(blob)
  const anchor = document.createElement('a')

  anchor.href = url
  anchor.download = `${pass.passNumber || 'festflow-pass'}.txt`
  anchor.click()

  window.URL.revokeObjectURL(url)
}
