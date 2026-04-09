const organizerMockEvents = [
  {
    _id: 'org-event-1',
    title: 'TechPulse 2026',
    description:
      'A large campus tech fest with startup showcases, robotics demos, speaker sessions, and evening performances.',
    category: 'Tech Fest',
    status: 'published',
    eventType: 'offline',
    capacity: 3000,
    featuredImage:
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    startDate: '2026-05-16T10:00:00.000Z',
    endDate: '2026-05-16T21:30:00.000Z',
    venue: {
      name: 'DTU Main Ground',
      city: 'Delhi',
      addressLine1: 'Delhi Technological University Campus',
    },
    analytics: {
      totalRegistrations: 2410,
      pendingApprovals: 82,
      checkedIn: 0,
      revenue: 178400,
    },
    tickets: [
      { name: 'General Pass', price: 299, sold: 1580 },
      { name: 'Pro Pass', price: 699, sold: 320 },
    ],
  },
  {
    _id: 'org-event-2',
    title: 'StreetPop Creator Market',
    description:
      'A curated pop-up experience for student creators, thrift labels, food brands, and local community collaborations.',
    category: 'Pop-Up',
    status: 'published',
    eventType: 'offline',
    capacity: 450,
    featuredImage:
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80',
    startDate: '2026-05-23T11:00:00.000Z',
    endDate: '2026-05-23T19:00:00.000Z',
    venue: {
      name: 'Hauz Khas Creative Courtyard',
      city: 'Delhi',
      addressLine1: 'Block A, Hauz Khas Village',
    },
    analytics: {
      totalRegistrations: 362,
      pendingApprovals: 18,
      checkedIn: 0,
      revenue: 54280,
    },
    tickets: [
      { name: 'Community Entry', price: 149, sold: 242 },
      { name: 'VIP Early Access', price: 399, sold: 42 },
    ],
  },
  {
    _id: 'org-event-3',
    title: 'Campus Creator Summit',
    description:
      'A networking-focused creator summit for students with practical brand-building sessions and portfolio reviews.',
    category: 'Community Event',
    status: 'draft',
    eventType: 'hybrid',
    capacity: 800,
    featuredImage:
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
    startDate: '2026-06-01T09:30:00.000Z',
    endDate: '2026-06-01T17:00:00.000Z',
    venue: {
      name: 'Noida Innovation Auditorium',
      city: 'Noida',
      addressLine1: 'Sector 62 Knowledge Park',
    },
    analytics: {
      totalRegistrations: 0,
      pendingApprovals: 0,
      checkedIn: 0,
      revenue: 0,
    },
    tickets: [
      { name: 'Student Pass', price: 249, sold: 0 },
      { name: 'Online Pass', price: 99, sold: 0 },
    ],
  },
]

const organizerMockRegistrations = [
  {
    _id: 'org-reg-1',
    eventId: 'org-event-1',
    registrationNumber: 'REG-TP-1001',
    status: 'confirmed',
    amount: 299,
    currency: 'INR',
    quantity: 1,
    createdAt: '2026-04-08T10:10:00.000Z',
    ticketType: {
      _id: 'ticket-org-1',
      name: 'General Pass',
      price: 299,
    },
    attendeeDetails: {
      fullName: 'Aarav Sharma',
      email: 'aarav@example.com',
      phone: '9876500011',
      college: 'DTU',
    },
  },
  {
    _id: 'org-reg-2',
    eventId: 'org-event-1',
    registrationNumber: 'REG-TP-1002',
    status: 'pending',
    amount: 699,
    currency: 'INR',
    quantity: 1,
    createdAt: '2026-04-08T11:30:00.000Z',
    ticketType: {
      _id: 'ticket-org-2',
      name: 'Pro Pass',
      price: 699,
    },
    attendeeDetails: {
      fullName: 'Nisha Verma',
      email: 'nisha@example.com',
      phone: '9876500012',
      college: 'NSUT',
    },
  },
  {
    _id: 'org-reg-3',
    eventId: 'org-event-1',
    registrationNumber: 'REG-TP-1003',
    status: 'pending',
    amount: 299,
    currency: 'INR',
    quantity: 1,
    createdAt: '2026-04-08T13:20:00.000Z',
    ticketType: {
      _id: 'ticket-org-1',
      name: 'General Pass',
      price: 299,
    },
    attendeeDetails: {
      fullName: 'Karan Mehta',
      email: 'karan@example.com',
      phone: '9876500013',
      college: 'MAIT',
    },
  },
  {
    _id: 'org-reg-4',
    eventId: 'org-event-2',
    registrationNumber: 'REG-SP-2001',
    status: 'confirmed',
    amount: 149,
    currency: 'INR',
    quantity: 1,
    createdAt: '2026-04-09T08:45:00.000Z',
    ticketType: {
      _id: 'ticket-org-3',
      name: 'Community Entry',
      price: 149,
    },
    attendeeDetails: {
      fullName: 'Ritika Gupta',
      email: 'ritika@example.com',
      phone: '9876500014',
      college: 'IPU',
    },
  },
  {
    _id: 'org-reg-5',
    eventId: 'org-event-2',
    registrationNumber: 'REG-SP-2002',
    status: 'waitlisted',
    amount: 399,
    currency: 'INR',
    quantity: 1,
    createdAt: '2026-04-09T09:05:00.000Z',
    ticketType: {
      _id: 'ticket-org-4',
      name: 'VIP Early Access',
      price: 399,
    },
    attendeeDetails: {
      fullName: 'Mehul Arora',
      email: 'mehul@example.com',
      phone: '9876500015',
      college: 'Amity',
    },
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

function formatMoney(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount || 0)
}

export function getMockOrganizerEvents() {
  return organizerMockEvents
}

export function getMockOrganizerEventById(eventId) {
  return organizerMockEvents.find((event) => event._id === eventId)
}

export function mapOrganizerEventForCard(event) {
  return {
    id: event._id,
    title: event.title,
    image: event.featuredImage,
    category: event.category,
    date: formatDate(event.startDate, {
      weekday: 'short',
      hour: 'numeric',
      minute: '2-digit',
    }),
    location: `${event.venue?.name || 'Venue'}, ${event.venue?.city || 'City'}`,
    status: event.status,
    registrations: event.analytics?.totalRegistrations || 0,
    pendingApprovals: event.analytics?.pendingApprovals || 0,
    revenue: formatMoney(event.analytics?.revenue || 0),
  }
}

export function getOrganizerSummary(events) {
  const totalEvents = events.length
  const publishedEvents = events.filter((event) => event.status === 'published').length
  const totalRegistrations = events.reduce((sum, event) => sum + (event.analytics?.totalRegistrations || 0), 0)
  const totalRevenue = events.reduce((sum, event) => sum + (event.analytics?.revenue || 0), 0)

  return [
    {
      label: 'Total events',
      value: totalEvents,
      note: `${publishedEvents} are already published and visible`,
    },
    {
      label: 'Registrations',
      value: totalRegistrations,
      note: 'Across your current live and draft event pipeline',
    },
    {
      label: 'Revenue',
      value: formatMoney(totalRevenue),
      note: 'Estimated from your current ticket sales data',
    },
  ]
}

export function mapOrganizerEventDetails(event) {
  return {
    ...event,
    formattedStartDate: formatDate(event.startDate, {
      weekday: 'long',
      hour: 'numeric',
      minute: '2-digit',
    }),
    formattedEndDate: formatDate(event.endDate, {
      weekday: 'long',
      hour: 'numeric',
      minute: '2-digit',
    }),
    formattedRevenue: formatMoney(event.analytics?.revenue || 0),
  }
}

export function getMockOrganizerRegistrations(eventId) {
  return organizerMockRegistrations.filter((registration) => registration.eventId === eventId)
}

export function getOrganizerRegistrationSummary(registrations) {
  const confirmed = registrations.filter((item) => item.status === 'confirmed').length
  const pending = registrations.filter((item) => item.status === 'pending').length
  const totalRevenue = registrations.reduce((sum, item) => sum + (item.amount || 0), 0)

  return [
    {
      label: 'Total requests',
      value: registrations.length,
      note: 'Every booking or request submitted for this event',
    },
    {
      label: 'Pending approvals',
      value: pending,
      note: 'Needs organizer action before the attendee flow continues',
    },
    {
      label: 'Confirmed revenue',
      value: formatMoney(totalRevenue),
      note: `${confirmed} registrations are already approved or confirmed`,
    },
  ]
}

export function mapOrganizerRegistrationForRow(registration) {
  return {
    id: registration._id,
    registrationNumber: registration.registrationNumber,
    attendeeName: registration.attendeeDetails?.fullName || 'Attendee',
    email: registration.attendeeDetails?.email || '',
    college: registration.attendeeDetails?.college || 'Not provided',
    phone: registration.attendeeDetails?.phone || 'Not provided',
    status: registration.status,
    ticketName: registration.ticketType?.name || 'Ticket',
    amount: formatMoney(registration.amount, registration.currency),
    createdAt: formatDate(registration.createdAt, {
      weekday: 'short',
      hour: 'numeric',
      minute: '2-digit',
    }),
  }
}
