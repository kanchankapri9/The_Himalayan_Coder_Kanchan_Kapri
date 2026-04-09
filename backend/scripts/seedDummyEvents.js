const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const connectDB = require("../config/db");
const User = require("../models/User");
const OrganizerProfile = require("../models/OrganizerProfile");
const Venue = require("../models/Venue");
const Event = require("../models/Event");
const TicketType = require("../models/TicketType");
const { USER_ROLES } = require("../constants/enums");

dotenv.config();

const organizerSeed = {
  name: "FestFlow Demo Organizer",
  email: "organizer@festflow.demo",
  password: "Demo@12345",
  role: USER_ROLES.ORGANIZER,
  phone: "9876543210",
  college: "Delhi Tech University",
  avatar:
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=500&q=80",
};

const organizerProfileSeed = {
  organizationName: "FestFlow Events Club",
  bio: "We host hyper-local college fests, creator pop-ups, and youth community experiences.",
  website: "https://festflow.demo",
  logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=500&q=80",
  coverImage:
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80",
  contactEmail: "organizer@festflow.demo",
  contactPhone: "9876543210",
  city: "Delhi",
  verified: true,
  socialLinks: {
    instagram: "https://instagram.com/festflow.demo",
    linkedin: "https://linkedin.com/company/festflow-demo",
  },
};

const venueSeeds = [
  {
    key: "dtu-ground",
    name: "DTU Main Ground",
    description: "An open fest arena perfect for concerts, food stalls, and headline performances.",
    addressLine1: "Delhi Technological University Campus",
    city: "Delhi",
    state: "Delhi",
    country: "India",
    postalCode: "110042",
    latitude: 28.7499,
    longitude: 77.1177,
    landmark: "Near Sports Complex Gate",
    capacity: 3500,
    amenities: ["Parking", "Food court", "First aid", "Restrooms"],
  },
  {
    key: "hauz-khas-pop-up",
    name: "Hauz Khas Creative Courtyard",
    description: "A compact urban venue for pop-ups, workshops, and indie community gatherings.",
    addressLine1: "Block A, Hauz Khas Village",
    city: "Delhi",
    state: "Delhi",
    country: "India",
    postalCode: "110016",
    latitude: 28.5494,
    longitude: 77.2001,
    landmark: "Opposite Deer Park Gate 3",
    capacity: 500,
    amenities: ["Cafe", "Wi-Fi", "Accessible entry"],
  },
  {
    key: "noida-auditorium",
    name: "Noida Innovation Auditorium",
    description: "Indoor auditorium for speaker sessions, product showcases, and creator meetups.",
    addressLine1: "Sector 62 Knowledge Park",
    city: "Noida",
    state: "Uttar Pradesh",
    country: "India",
    postalCode: "201309",
    latitude: 28.6304,
    longitude: 77.3649,
    landmark: "Near Metro Station Exit 2",
    capacity: 900,
    amenities: ["Projector", "Air conditioning", "Security"],
  },
];

const eventSeeds = [
  {
    title: "TechPulse 2026",
    slug: "techpulse-2026",
    description:
      "A high-energy college tech fest with hackathons, robotics demos, startup booths, and music performances.",
    category: "Tech Fest",
    tags: ["technology", "college", "hackathon", "robotics"],
    status: "published",
    eventType: "offline",
    venueKey: "dtu-ground",
    startDate: "2026-05-16T10:00:00.000Z",
    endDate: "2026-05-16T21:30:00.000Z",
    timezone: "Asia/Kolkata",
    capacity: 3000,
    featured: true,
    visibility: "public",
    featuredImage:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=1200&q=80",
    ],
    tickets: [
      {
        name: "General Pass",
        description: "Access to all public fest areas and evening performances.",
        price: 299,
        totalQuantity: 1800,
        maxPerUser: 2,
        benefits: ["Fest access", "Main stage entry"],
      },
      {
        name: "Pro Pass",
        description: "Includes workshop entry and startup networking zone.",
        price: 699,
        totalQuantity: 600,
        maxPerUser: 2,
        benefits: ["Workshop access", "Networking zone", "Priority check-in"],
      },
    ],
  },
  {
    title: "StreetPop Creator Market",
    slug: "streetpop-creator-market",
    description:
      "A curated pop-up for indie creators, thrift sellers, food brands, and student-run labels.",
    category: "Pop-Up",
    tags: ["pop-up", "fashion", "food", "community"],
    status: "published",
    eventType: "offline",
    venueKey: "hauz-khas-pop-up",
    startDate: "2026-05-23T11:00:00.000Z",
    endDate: "2026-05-23T19:00:00.000Z",
    timezone: "Asia/Kolkata",
    capacity: 450,
    featured: true,
    visibility: "public",
    featuredImage:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&w=1200&q=80",
    ],
    tickets: [
      {
        name: "Community Entry",
        description: "Standard entry for shopping, food stalls, and live sessions.",
        price: 149,
        totalQuantity: 300,
        maxPerUser: 3,
        benefits: ["Entry", "Live creator talks"],
      },
      {
        name: "VIP Early Access",
        description: "One-hour early access and limited edition welcome goodies.",
        price: 399,
        totalQuantity: 80,
        maxPerUser: 2,
        benefits: ["Early access", "Welcome goodies", "Fast lane entry"],
      },
    ],
  },
  {
    title: "Campus Creator Summit",
    slug: "campus-creator-summit",
    description:
      "A content creator meetup for students with brand building sessions, portfolio reviews, and panel discussions.",
    category: "Community Event",
    tags: ["creators", "networking", "students", "branding"],
    status: "published",
    eventType: "hybrid",
    venueKey: "noida-auditorium",
    startDate: "2026-06-01T09:30:00.000Z",
    endDate: "2026-06-01T17:00:00.000Z",
    timezone: "Asia/Kolkata",
    capacity: 800,
    featured: false,
    visibility: "public",
    featuredImage:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1515168833906-d2a3b82b302a?auto=format&fit=crop&w=1200&q=80",
    ],
    tickets: [
      {
        name: "Student Pass",
        description: "On-ground access to all creator sessions and mentor Q&A.",
        price: 249,
        totalQuantity: 500,
        maxPerUser: 1,
        benefits: ["On-ground sessions", "Mentor Q&A"],
      },
      {
        name: "Online Pass",
        description: "Join keynote and panel sessions via live stream.",
        price: 99,
        totalQuantity: 1000,
        maxPerUser: 1,
        benefits: ["Live stream access", "Session recordings"],
      },
    ],
  },
  {
    title: "Rangmanch Cultural Night",
    slug: "rangmanch-cultural-night",
    description:
      "An evening of dance battles, unplugged bands, street theatre, and college cultural performances.",
    category: "College Fest",
    tags: ["culture", "music", "dance", "college"],
    status: "published",
    eventType: "offline",
    venueKey: "dtu-ground",
    startDate: "2026-06-12T16:00:00.000Z",
    endDate: "2026-06-12T22:00:00.000Z",
    timezone: "Asia/Kolkata",
    capacity: 2500,
    featured: false,
    visibility: "public",
    featuredImage:
      "https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?auto=format&fit=crop&w=1200&q=80",
    ],
    tickets: [
      {
        name: "Entry Pass",
        description: "Access to all cultural performances for the evening.",
        price: 199,
        totalQuantity: 1500,
        maxPerUser: 4,
        benefits: ["Main event access"],
      },
    ],
  },
];

const upsertVenue = async (organizerId, venueSeed) => {
  return Venue.findOneAndUpdate(
    { organizer: organizerId, name: venueSeed.name },
    { ...venueSeed, organizer: organizerId },
    { returnDocument: "after", upsert: true, setDefaultsOnInsert: true }
  );
};

const upsertEvent = async (organizerId, organizerProfileId, venueId, eventSeed) => {
  const eventPayload = {
    organizer: organizerId,
    organizerProfile: organizerProfileId,
    title: eventSeed.title,
    slug: eventSeed.slug,
    description: eventSeed.description,
    category: eventSeed.category,
    tags: eventSeed.tags,
    status: eventSeed.status,
    eventType: eventSeed.eventType,
    venue: venueId,
    startDate: new Date(eventSeed.startDate),
    endDate: new Date(eventSeed.endDate),
    timezone: eventSeed.timezone,
    capacity: eventSeed.capacity,
    featuredImage: eventSeed.featuredImage,
    gallery: eventSeed.gallery,
    ticketingEnabled: true,
    featured: eventSeed.featured,
    visibility: eventSeed.visibility,
  };

  return Event.findOneAndUpdate(
    { slug: eventSeed.slug },
    eventPayload,
    { returnDocument: "after", upsert: true, setDefaultsOnInsert: true }
  );
};

const replaceTicketsForEvent = async (eventId, eventSeed) => {
  await TicketType.deleteMany({ event: eventId });

  const ticketPayload = eventSeed.tickets.map((ticket) => ({
    event: eventId,
    name: ticket.name,
    description: ticket.description,
    price: ticket.price,
    currency: "INR",
    totalQuantity: ticket.totalQuantity,
    soldQuantity: 0,
    maxPerUser: ticket.maxPerUser,
    salesStart: new Date(eventSeed.startDate),
    salesEnd: new Date(eventSeed.endDate),
    benefits: ticket.benefits,
    isActive: true,
  }));

  await TicketType.insertMany(ticketPayload);
};

const seedDummyEvents = async () => {
  try {
    await connectDB();

    const hashedPassword = await bcrypt.hash(organizerSeed.password, 10);

    const organizer = await User.findOneAndUpdate(
      { email: organizerSeed.email },
      { ...organizerSeed, password: hashedPassword },
      { returnDocument: "after", upsert: true, setDefaultsOnInsert: true }
    );

    const organizerProfile = await OrganizerProfile.findOneAndUpdate(
      { user: organizer._id },
      { ...organizerProfileSeed, user: organizer._id },
      { returnDocument: "after", upsert: true, setDefaultsOnInsert: true }
    );

    const venueMap = {};

    for (const venueSeed of venueSeeds) {
      const venue = await upsertVenue(organizer._id, venueSeed);
      venueMap[venueSeed.key] = venue;
    }

    for (const eventSeed of eventSeeds) {
      const venue = venueMap[eventSeed.venueKey];
      const event = await upsertEvent(
        organizer._id,
        organizerProfile._id,
        venue._id,
        eventSeed
      );

      await replaceTicketsForEvent(event._id, eventSeed);
    }

    const eventCount = await Event.countDocuments();
    const ticketCount = await TicketType.countDocuments();

    console.log("Dummy event data seeded successfully.");
    console.log(`Organizer login: ${organizerSeed.email} / ${organizerSeed.password}`);
    console.log(`Total events in database: ${eventCount}`);
    console.log(`Total ticket types in database: ${ticketCount}`);
  } catch (error) {
    console.error("Failed to seed dummy event data:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

seedDummyEvents();
