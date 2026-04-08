export const events = [
  {
    slug: 'tech-fest-night-2026',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80',
    date: 'Sat, Apr 12, 6:00 PM',
    title: 'Tech Fest Night 2026',
    location: 'NSUT, Delhi',
    venue: 'Open Air Arena, NSUT Main Campus, Delhi',
    price: 'From Rs. 199',
    organizer: 'NSUT Cultural Committee',
    attendees: '1.2k interested',
    category: 'College Fest',
    about:
      'Tech Fest Night 2026 brings together music, creator performances, student showcases, gaming corners, and sponsor activations in one high-energy evening. The event is designed for students who want a festival-style campus experience with smooth ticketing and easy QR-based entry.',
    details: [
      'Live performances by campus bands and headline DJ set',
      'Food stalls, art installations, and gaming pop-ups',
      'Separate early entry and general access tickets',
      'QR-based gate entry with organizer check-in support',
    ],
    tickets: [
      { name: 'General Access', price: 'Rs. 199', note: 'Entry from 6:00 PM onwards' },
      { name: 'Early Entry Pass', price: 'Rs. 349', note: 'Priority queue and early access' },
    ],
  },
  {
    slug: 'campus-music-pop-up',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
    date: 'Sun, Apr 13, 4:30 PM',
    title: 'Campus Music Pop-up',
    location: 'Bandra, Mumbai',
    venue: 'Carter Road Promenade, Bandra West, Mumbai',
    price: 'Free',
    organizer: 'Mumbai Student Creators',
    attendees: '680 interested',
    category: 'Music',
    about:
      'A free sunset pop-up where student artists, indie performers, and local youth communities come together for an open-air music experience. Designed for discovery, casual networking, and local culture.',
    details: [
      'Acoustic sets, indie performances, and pop-up art corners',
      'Free registration for quick entry management',
      'Local brand booths and student creator stalls',
      'Best suited for students, creators, and local communities',
    ],
    tickets: [
      { name: 'Free Entry', price: 'Free', note: 'Registration required for QR pass' },
    ],
  },
  {
    slug: 'community-creator-meetup',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    date: 'Fri, Apr 18, 10:00 AM',
    title: 'Community Creator Meetup',
    location: 'Koramangala, Bengaluru',
    venue: 'Studio Hall, Koramangala Social Block, Bengaluru',
    price: 'From Rs. 299',
    organizer: 'Creator Circle India',
    attendees: '940 interested',
    category: 'Community',
    about:
      'A daytime meetup for designers, creators, founders, and student builders who want a practical community event with talks, collaboration spaces, and networking sessions.',
    details: [
      'Lightning talks from creators and startup operators',
      'Community networking and collaboration activities',
      'Approval-based registration for limited seating',
      'Great fit for creator communities and startup circles',
    ],
    tickets: [
      { name: 'Standard Seat', price: 'Rs. 299', note: 'Access to talks and community mixer' },
      { name: 'Community Plus', price: 'Rs. 499', note: 'Priority seating and networking lounge' },
    ],
  },
  {
    slug: 'street-food-and-art-fair',
    image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=1200&q=80',
    date: 'Sat, Apr 19, 5:00 PM',
    title: 'Street Food and Art Fair',
    location: 'Pune City',
    venue: 'Riverside Event Lawn, Pune',
    price: 'From Rs. 149',
    organizer: 'Pune Pop-up Collective',
    attendees: '860 interested',
    category: 'Food & Drink',
    about:
      'An evening fair that mixes local food brands, small art vendors, live experiences, and social meetups. Perfect for young audiences who want a low-pressure local outing with friends.',
    details: [
      'Curated local food stalls and visual art vendors',
      'Live acoustic performances through the evening',
      'Family-friendly and student-friendly timing',
      'Fast QR check-in and limited-capacity tickets',
    ],
    tickets: [
      { name: 'General Entry', price: 'Rs. 149', note: 'Single-day entry' },
      { name: 'Group Pass', price: 'Rs. 499', note: 'Entry for up to 4 people' },
    ],
  },
]

export function getEventBySlug(slug) {
  return events.find((event) => event.slug === slug)
}
