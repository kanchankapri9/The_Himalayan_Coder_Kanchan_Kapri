import { events } from './events'

const registrationSeeds = [
  {
    _id: 'reg-demo-1',
    registrationNumber: 'REG-FF-1024',
    status: 'confirmed',
    amount: 299,
    currency: 'INR',
    quantity: 1,
    event: events[0],
    ticketType: {
      _id: 'ticket-demo-1',
      name: 'General Pass',
      price: 299,
      currency: 'INR',
    },
    attendeeDetails: {
      fullName: 'Junaid Khan',
      email: 'junaid@example.com',
      college: 'DTU',
    },
    createdAt: '2026-04-08T12:00:00.000Z',
  },
  {
    _id: 'reg-demo-2',
    registrationNumber: 'REG-FF-2048',
    status: 'pending',
    amount: 149,
    currency: 'INR',
    quantity: 1,
    event: events[3],
    ticketType: {
      _id: 'ticket-demo-2',
      name: 'Community Entry',
      price: 149,
      currency: 'INR',
    },
    attendeeDetails: {
      fullName: 'Junaid Khan',
      email: 'junaid@example.com',
      college: 'DTU',
    },
    createdAt: '2026-04-09T08:30:00.000Z',
  },
]

const savedEventSeeds = [
  {
    _id: 'saved-demo-1',
    event: events[1],
    savedAt: '2026-04-08T17:45:00.000Z',
  },
  {
    _id: 'saved-demo-2',
    event: events[2],
    savedAt: '2026-04-09T09:05:00.000Z',
  },
]

const passSeeds = [
  {
    _id: 'pass-demo-1',
    registration: {
      _id: 'reg-demo-1',
      registrationNumber: 'REG-FF-1024',
      status: 'confirmed',
    },
    event: events[0],
    user: {
      _id: 'user-demo-1',
      name: 'Junaid Khan',
      email: 'junaid@example.com',
      phone: '9876543210',
    },
    passNumber: 'PASS-FF-1024',
    qrCode: 'FFPASS-1024-QR-CODE',
    status: 'active',
    issuedAt: '2026-04-08T12:05:00.000Z',
    validFrom: events[0].startDate,
    validUntil: events[0].endDate,
  },
]

function formatDate(isoDate, options = {}) {
  return new Date(isoDate).toLocaleString('en-IN', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    ...options,
  })
}

function formatMoney(amount, currency = 'INR') {
  if (!amount) {
    return 'Free'
  }

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount)
}

function getEventLocation(event) {
  if (!event?.venue) {
    return 'Venue to be announced'
  }

  return `${event.venue.name}, ${event.venue.city}`
}

export function getMockRegistrations() {
  return registrationSeeds
}

export function getMockSavedEvents() {
  return savedEventSeeds
}

export function getMockPasses() {
  return passSeeds
}

export function getMockPassById(passId) {
  return passSeeds.find((pass) => pass._id === passId)
}

export function mapRegistrationForCard(registration) {
  return {
    id: registration._id,
    registrationNumber: registration.registrationNumber,
    status: registration.status,
    title: registration.event?.title || 'Event registration',
    image: registration.event?.featuredImage || '',
    date: formatDate(registration.event?.startDate, {
      weekday: 'short',
      hour: 'numeric',
      minute: '2-digit',
    }),
    location: getEventLocation(registration.event),
    ticketName: registration.ticketType?.name || 'Event pass',
    amount: formatMoney(registration.amount, registration.currency),
    createdAt: formatDate(registration.createdAt),
    eventId: registration.event?._id,
  }
}

export function mapSavedEventForCard(savedEvent) {
  const event = savedEvent.event

  return {
    id: savedEvent._id,
    savedAt: formatDate(savedEvent.savedAt),
    title: event?.title || 'Saved event',
    image: event?.featuredImage || '',
    category: event?.category || 'Event',
    date: formatDate(event?.startDate, {
      weekday: 'short',
      hour: 'numeric',
      minute: '2-digit',
    }),
    location: getEventLocation(event),
    eventId: event?._id,
  }
}

export function mapPassForCard(pass) {
  return {
    id: pass._id,
    passNumber: pass.passNumber,
    registrationNumber: pass.registration?.registrationNumber || 'Registration',
    status: pass.status,
    title: pass.event?.title || 'Event pass',
    image: pass.event?.featuredImage || '',
    date: formatDate(pass.event?.startDate, {
      weekday: 'short',
      hour: 'numeric',
      minute: '2-digit',
    }),
    location: getEventLocation(pass.event),
    eventId: pass.event?._id,
    issuedAt: formatDate(pass.issuedAt),
  }
}

export function mapPassForDetails(pass) {
  return {
    id: pass._id,
    title: pass.event?.title || 'Event pass',
    image: pass.event?.featuredImage || '',
    category: pass.event?.category || 'Event',
    passNumber: pass.passNumber,
    registrationNumber: pass.registration?.registrationNumber || 'Registration',
    status: pass.status,
    qrCode: pass.qrCode,
    attendeeName: pass.user?.name || 'Attendee',
    attendeeEmail: pass.user?.email || '',
    location: getEventLocation(pass.event),
    startDate: formatDate(pass.event?.startDate, {
      weekday: 'long',
      hour: 'numeric',
      minute: '2-digit',
    }),
    endDate: formatDate(pass.event?.endDate, {
      weekday: 'long',
      hour: 'numeric',
      minute: '2-digit',
    }),
    issuedAt: formatDate(pass.issuedAt, {
      hour: 'numeric',
      minute: '2-digit',
    }),
  }
}
