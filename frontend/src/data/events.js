const mockEvents = [
  {
    _id: '680a1f000000000000000001',
    organizer: {
      _id: '680a1f000000000000010001',
      name: 'NSUT Cultural Committee',
      email: 'culture@nsut.ac.in',
      role: 'organizer',
    },
    title: 'Tech Fest Night 2026',
    description:
      'Tech Fest Night 2026 brings together music, creator performances, student showcases, gaming corners, and sponsor activations in one high-energy evening. The event is designed for students who want a festival-style campus experience with smooth ticketing and easy QR-based entry.',
    category: 'College Fest',
    tags: ['music', 'campus', 'festival'],
    status: 'published',
    eventType: 'offline',
    venue: {
      _id: '680a1f000000000000020001',
      name: 'Open Air Arena',
      addressLine1: 'NSUT Main Campus',
      city: 'Delhi',
      state: 'Delhi',
      country: 'India',
    },
    startDate: '2026-04-12T18:00:00.000Z',
    endDate: '2026-04-12T23:00:00.000Z',
    timezone: 'Asia/Kolkata',
    capacity: 2500,
    featuredImage:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    _id: '680a1f000000000000000002',
    organizer: {
      _id: '680a1f000000000000010002',
      name: 'Mumbai Student Creators',
      email: 'hello@mumbaicreators.in',
      role: 'organizer',
    },
    title: 'Campus Music Pop-up',
    description:
      'A free sunset pop-up where student artists, indie performers, and local youth communities come together for an open-air music experience. Designed for discovery, casual networking, and local culture.',
    category: 'Music',
    tags: ['pop-up', 'music', 'community'],
    status: 'published',
    eventType: 'offline',
    venue: {
      _id: '680a1f000000000000020002',
      name: 'Carter Road Promenade',
      addressLine1: 'Bandra West',
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
    },
    startDate: '2026-04-13T16:30:00.000Z',
    endDate: '2026-04-13T21:00:00.000Z',
    timezone: 'Asia/Kolkata',
    capacity: 800,
    featuredImage:
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
  },
  {
    _id: '680a1f000000000000000003',
    organizer: {
      _id: '680a1f000000000000010003',
      name: 'Creator Circle India',
      email: 'team@creatorcircle.in',
      role: 'organizer',
    },
    title: 'Community Creator Meetup',
    description:
      'A daytime meetup for designers, creators, founders, and student builders who want a practical community event with talks, collaboration spaces, and networking sessions.',
    category: 'Community',
    tags: ['creator', 'meetup', 'networking'],
    status: 'published',
    eventType: 'offline',
    venue: {
      _id: '680a1f000000000000020003',
      name: 'Studio Hall',
      addressLine1: 'Koramangala Social Block',
      city: 'Bengaluru',
      state: 'Karnataka',
      country: 'India',
    },
    startDate: '2026-04-18T10:00:00.000Z',
    endDate: '2026-04-18T17:00:00.000Z',
    timezone: 'Asia/Kolkata',
    capacity: 300,
    featuredImage:
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
  },
  {
    _id: '680a1f000000000000000004',
    organizer: {
      _id: '680a1f000000000000010004',
      name: 'Pune Pop-up Collective',
      email: 'events@punepopup.in',
      role: 'organizer',
    },
    title: 'Street Food and Art Fair',
    description:
      'An evening fair that mixes local food brands, small art vendors, live experiences, and social meetups. Perfect for young audiences who want a low-pressure local outing with friends.',
    category: 'Food & Drink',
    tags: ['food', 'art', 'fair'],
    status: 'published',
    eventType: 'offline',
    venue: {
      _id: '680a1f000000000000020004',
      name: 'Riverside Event Lawn',
      addressLine1: 'Pune City Center',
      city: 'Pune',
      state: 'Maharashtra',
      country: 'India',
    },
    startDate: '2026-04-19T17:00:00.000Z',
    endDate: '2026-04-19T22:00:00.000Z',
    timezone: 'Asia/Kolkata',
    capacity: 1200,
    featuredImage:
      'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=1200&q=80',
  },
]

const mockTicketTypes = [
  {
    _id: '680a1f000000000000100001',
    event: '680a1f000000000000000001',
    name: 'General Access',
    description: 'Entry from 6:00 PM onwards',
    price: 199,
    currency: 'INR',
    totalQuantity: 1500,
  },
  {
    _id: '680a1f000000000000100002',
    event: '680a1f000000000000000001',
    name: 'Early Entry Pass',
    description: 'Priority queue and early access',
    price: 349,
    currency: 'INR',
    totalQuantity: 500,
  },
  {
    _id: '680a1f000000000000100003',
    event: '680a1f000000000000000002',
    name: 'Free Entry',
    description: 'Registration required for QR pass',
    price: 0,
    currency: 'INR',
    totalQuantity: 800,
  },
  {
    _id: '680a1f000000000000100004',
    event: '680a1f000000000000000003',
    name: 'Standard Seat',
    description: 'Access to talks and community mixer',
    price: 299,
    currency: 'INR',
    totalQuantity: 200,
  },
  {
    _id: '680a1f000000000000100005',
    event: '680a1f000000000000000003',
    name: 'Community Plus',
    description: 'Priority seating and networking lounge',
    price: 499,
    currency: 'INR',
    totalQuantity: 100,
  },
  {
    _id: '680a1f000000000000100006',
    event: '680a1f000000000000000004',
    name: 'General Entry',
    description: 'Single-day entry',
    price: 149,
    currency: 'INR',
    totalQuantity: 900,
  },
]

function formatDateTime(isoDate) {
  return new Date(isoDate).toLocaleString('en-IN', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

function formatPrice(ticketTypes) {
  if (!ticketTypes.length) {
    return 'Ticket details coming soon'
  }

  const prices = ticketTypes.map((ticket) => ticket.price)
  const minPrice = Math.min(...prices)

  if (minPrice === 0) {
    return 'Free'
  }

  return `From Rs. ${minPrice}`
}

function formatVenue(venue) {
  if (!venue) {
    return 'Venue to be announced'
  }

  return `${venue.name}, ${venue.city}`
}

export const events = mockEvents
export const ticketTypes = mockTicketTypes

export function getTicketsByEventId(eventId) {
  return ticketTypes.filter((ticket) => {
    const ticketEventId = typeof ticket.event === 'string' ? ticket.event : ticket.event?._id
    return ticketEventId === eventId
  })
}

export function getEventById(eventId) {
  return events.find((event) => event._id === eventId)
}

export function mapEventForCard(event) {
  const eventTickets = getTicketsByEventId(event._id)

  return {
    _id: event._id,
    title: event.title,
    image: event.featuredImage,
    date: formatDateTime(event.startDate),
    location: formatVenue(event.venue),
    price: formatPrice(eventTickets),
  }
}

export function mapEventForDetails(event, providedTickets = null) {
  const eventTickets = providedTickets || getTicketsByEventId(event._id)

  return {
    _id: event._id,
    title: event.title,
    category: event.category,
    image: event.featuredImage,
    date: formatDateTime(event.startDate),
    venue: event.venue
      ? `${event.venue.name}, ${event.venue.addressLine1}, ${event.venue.city}, ${event.venue.state || ''}, ${event.venue.country}`
          .replace(', ,', ',')
      : 'Venue to be announced',
    location: formatVenue(event.venue),
    organizerName: event.organizer?.name || 'Organizer',
    attendees: `${event.capacity || 0} capacity`,
    about: event.description,
    details: [
      `${event.eventType === 'offline' ? 'Offline' : 'Online'} event experience`,
      `Category: ${event.category}`,
      `Status: ${event.status}`,
      `Timezone: ${event.timezone}`,
    ],
    price: formatPrice(eventTickets),
    tickets: eventTickets.map((ticket) => ({
      id: ticket._id,
      name: ticket.name,
      price: ticket.price === 0 ? 'Free' : `Rs. ${ticket.price}`,
      note: ticket.description || 'Ticket access details will be shared after booking',
    })),
  }
}
