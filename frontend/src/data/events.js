const eventSeeds = [
  {
    _id: 'event-demo-1',
    title: 'Tech Fest Night 2026',
    description:
      'Tech Fest Night 2026 brings together music, creator performances, student showcases, gaming corners, and sponsor activations in one high-energy evening.',
    category: 'College Fest',
    status: 'published',
    eventType: 'offline',
    featuredImage:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80',
    startDate: '2026-04-12T18:00:00.000Z',
    endDate: '2026-04-12T22:30:00.000Z',
    organizer: {
      _id: 'org-demo-1',
      name: 'NSUT Cultural Committee',
      email: 'nsut@festflow.demo',
    },
    venue: {
      _id: 'venue-demo-1',
      name: 'Open Air Arena',
      city: 'Delhi',
      addressLine1: 'NSUT Main Campus',
    },
    attendeesLabel: '1.2k interested',
    details: [
      'Live performances by campus bands and headline DJ set',
      'Food stalls, art installations, and gaming pop-ups',
      'Separate early entry and general access tickets',
      'QR-based gate entry with organizer check-in support',
    ],
  },
  {
    _id: 'event-demo-2',
    title: 'Campus Music Pop-up',
    description:
      'A free sunset pop-up where student artists, indie performers, and local youth communities come together for an open-air music experience.',
    category: 'Music',
    status: 'published',
    eventType: 'offline',
    featuredImage:
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
    startDate: '2026-04-13T16:30:00.000Z',
    endDate: '2026-04-13T20:00:00.000Z',
    organizer: {
      _id: 'org-demo-2',
      name: 'Mumbai Student Creators',
      email: 'mumbai@festflow.demo',
    },
    venue: {
      _id: 'venue-demo-2',
      name: 'Carter Road Promenade',
      city: 'Mumbai',
      addressLine1: 'Bandra West',
    },
    attendeesLabel: '680 interested',
    details: [
      'Acoustic sets, indie performances, and pop-up art corners',
      'Free registration for quick entry management',
      'Local brand booths and student creator stalls',
      'Best suited for students, creators, and local communities',
    ],
  },
  {
    _id: 'event-demo-3',
    title: 'Community Creator Meetup',
    description:
      'A daytime meetup for designers, creators, founders, and student builders who want a practical community event with talks, collaboration spaces, and networking sessions.',
    category: 'Community',
    status: 'published',
    eventType: 'offline',
    featuredImage:
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    startDate: '2026-04-18T10:00:00.000Z',
    endDate: '2026-04-18T17:00:00.000Z',
    organizer: {
      _id: 'org-demo-3',
      name: 'Creator Circle India',
      email: 'creatorcircle@festflow.demo',
    },
    venue: {
      _id: 'venue-demo-3',
      name: 'Studio Hall',
      city: 'Bengaluru',
      addressLine1: 'Koramangala Social Block',
    },
    attendeesLabel: '940 interested',
    details: [
      'Lightning talks from creators and startup operators',
      'Community networking and collaboration activities',
      'Approval-based registration for limited seating',
      'Great fit for creator communities and startup circles',
    ],
  },
  {
    _id: 'event-demo-4',
    title: 'Street Food and Art Fair',
    description:
      'An evening fair that mixes local food brands, small art vendors, live experiences, and social meetups. Perfect for young audiences who want a low-pressure local outing with friends.',
    category: 'Food & Drink',
    status: 'published',
    eventType: 'offline',
    featuredImage:
      'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=1200&q=80',
    startDate: '2026-04-19T17:00:00.000Z',
    endDate: '2026-04-19T22:00:00.000Z',
    organizer: {
      _id: 'org-demo-4',
      name: 'Pune Pop-up Collective',
      email: 'punepopup@festflow.demo',
    },
    venue: {
      _id: 'venue-demo-4',
      name: 'Riverside Event Lawn',
      city: 'Pune',
      addressLine1: 'Central Riverside Block',
    },
    attendeesLabel: '860 interested',
    details: [
      'Curated local food stalls and visual art vendors',
      'Live acoustic performances through the evening',
      'Family-friendly and student-friendly timing',
      'Fast QR check-in and limited-capacity tickets',
    ],
  },
]

const ticketSeeds = [
  { _id: 'ticket-demo-1', event: 'event-demo-1', name: 'General Access', description: 'Entry from 6:00 PM onwards.', price: 199, currency: 'INR', isActive: true },
  { _id: 'ticket-demo-2', event: 'event-demo-1', name: 'Early Entry Pass', description: 'Priority queue and early access.', price: 349, currency: 'INR', isActive: true },
  { _id: 'ticket-demo-3', event: 'event-demo-2', name: 'Free Entry', description: 'Registration required for QR pass.', price: 0, currency: 'INR', isActive: true },
  { _id: 'ticket-demo-4', event: 'event-demo-3', name: 'Standard Seat', description: 'Access to talks and community mixer.', price: 299, currency: 'INR', isActive: true },
  { _id: 'ticket-demo-5', event: 'event-demo-3', name: 'Community Plus', description: 'Priority seating and networking lounge.', price: 499, currency: 'INR', isActive: true },
  { _id: 'ticket-demo-6', event: 'event-demo-4', name: 'General Entry', description: 'Single-day entry.', price: 149, currency: 'INR', isActive: true },
  { _id: 'ticket-demo-7', event: 'event-demo-4', name: 'Group Pass', description: 'Entry for up to 4 people.', price: 499, currency: 'INR', isActive: true },
]

function formatEventDate(dateValue, options = {}) {
  return new Date(dateValue).toLocaleString('en-IN', {
    month: 'short',
    day: 'numeric',
    weekday: 'short',
    hour: 'numeric',
    minute: '2-digit',
    ...options,
  })
}

function formatTicketPrice(ticket) {
  if (!ticket || ticket.price === 0) {
    return 'Free'
  }

  return `From Rs. ${ticket.price}`
}

function getEventLocation(event) {
  if (!event?.venue) {
    return 'Venue to be announced'
  }

  return `${event.venue.name}, ${event.venue.city}`
}

function getOrganizerName(event) {
  return event.organizer?.name || event.organizerName || 'FestFlow Organizer'
}

export const events = eventSeeds
export const tickets = ticketSeeds

export function getTicketsByEventId(eventId) {
  return ticketSeeds.filter((ticket) => {
    const ticketEventId = typeof ticket.event === 'string' ? ticket.event : ticket.event?._id
    return ticketEventId === eventId
  })
}

export function getEventById(eventId) {
  return eventSeeds.find((event) => event._id === eventId)
}

export function mapEventForCard(event) {
  const eventTickets = getTicketsByEventId(event._id)
  const primaryTicket = eventTickets[0]

  return {
    id: event._id,
    image: event.featuredImage,
    date: formatEventDate(event.startDate),
    title: event.title,
    location: getEventLocation(event),
    price: formatTicketPrice(primaryTicket),
  }
}

export function mapEventForDetails(event, eventTickets = getTicketsByEventId(event._id)) {
  const primaryTicket = eventTickets[0]

  return {
    id: event._id,
    image: event.featuredImage,
    date: formatEventDate(event.startDate, {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }),
    title: event.title,
    venue: getEventLocation(event),
    price: formatTicketPrice(primaryTicket),
    organizerName: getOrganizerName(event),
    attendees: event.attendeesLabel || 'Students and communities attending',
    category: event.category || 'Event',
    about: event.description,
    details: event.details || [],
    tickets: eventTickets.map((ticket) => ({
      id: ticket._id,
      name: ticket.name,
      note: ticket.description,
      description: ticket.description,
      price: ticket.price === 0 ? 'Free' : `Rs. ${ticket.price}`,
    })),
  }
}
