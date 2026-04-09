const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const crypto = require("crypto");

const connectDB = require("../config/db");
const User = require("../models/User");
const OrganizerProfile = require("../models/OrganizerProfile");
const Venue = require("../models/Venue");
const Event = require("../models/Event");
const TicketType = require("../models/TicketType");
const Registration = require("../models/Registration");
const Payment = require("../models/Payment");
const Notification = require("../models/Notification");
const SavedEvent = require("../models/SavedEvent");
const Pass = require("../models/Pass");
const Checkin = require("../models/Checkin");
const { USER_ROLES } = require("../constants/enums");

dotenv.config();

// ============================================
// ORGANIZERS DATA
// ============================================
const organizersData = [
  {
    name: "FestFlow Events Organizer",
    email: "organizer@festflow.demo",
    password: "Demo@12345",
    role: USER_ROLES.ORGANIZER,
    phone: "9876543210",
    college: "Delhi Tech University",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=500&q=80",
    organizerProfile: {
      organizationName: "FestFlow Events Club",
      bio: "We host hyper-local college fests, creator pop-ups, and youth community experiences.",
      website: "https://festflow.demo",
      logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=500&q=80",
      coverImage: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80",
      contactEmail: "organizer@festflow.demo",
      contactPhone: "9876543210",
      city: "Delhi",
      verified: true,
      socialLinks: {
        instagram: "https://instagram.com/festflow.demo",
        linkedin: "https://linkedin.com/company/festflow-demo",
      },
    },
  },
  {
    name: "TechHub Organizer",
    email: "techhub@events.demo",
    password: "TechHub@123",
    role: USER_ROLES.ORGANIZER,
    phone: "9988776655",
    college: "NIELIT Delhi",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80",
    organizerProfile: {
      organizationName: "TechHub Community",
      bio: "Organizing tech meetups, hackathons, and developer conferences.",
      website: "https://techhub.demo",
      logo: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=500&q=80",
      coverImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
      contactEmail: "techhub@events.demo",
      contactPhone: "9988776655",
      city: "Noida",
      verified: true,
      socialLinks: {
        instagram: "https://instagram.com/techhub.community",
        twitter: "https://twitter.com/techhub",
      },
    },
  },
];

// ============================================
// ATTENDEES DATA
// ============================================
const attendeesData = [
  {
    name: "Amit Kumar",
    email: "amit.kumar@student.com",
    password: "Student@123",
    role: USER_ROLES.ATTENDEE,
    phone: "9123456789",
    college: "Delhi University",
    avatar: "https://images.unsplash.com/photo-1507515586569-eae44aaab79f?auto=format&fit=crop&w=500&q=80",
  },
  {
    name: "Priya Singh",
    email: "priya.singh@student.com",
    password: "Student@123",
    role: USER_ROLES.ATTENDEE,
    phone: "9234567890",
    college: "Delhi University",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=80",
  },
  {
    name: "Rahul Verma",
    email: "rahul.verma@student.com",
    password: "Student@123",
    role: USER_ROLES.ATTENDEE,
    phone: "9345678901",
    college: "NIELIT",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80",
  },
  {
    name: "Neha Sharma",
    email: "neha.sharma@student.com",
    password: "Student@123",
    role: USER_ROLES.ATTENDEE,
    phone: "9456789012",
    college: "DTU",
    avatar: "https://images.unsplash.com/photo-1517849845537-1d51a20414de?auto=format&fit=crop&w=500&q=80",
  },
  {
    name: "Nikita Patel",
    email: "nikita.patel@student.com",
    password: "Student@123",
    role: USER_ROLES.ATTENDEE,
    phone: "9567890123",
    college: "Delhi University",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=500&q=80",
  },
];

// ============================================
// VENUES DATA
// ============================================
const venuesData = [
  {
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

// ============================================
// EVENTS DATA
// ============================================
const eventsData = [
  {
    title: "TechPulse 2026",
    slug: "techpulse-2026",
    description: "A high-energy college tech fest with hackathons, robotics demos, startup booths, and music performances.",
    category: "Tech Fest",
    tags: ["technology", "college", "hackathon", "robotics"],
    status: "published",
    eventType: "offline",
    venueIndex: 0,
    startDate: "2026-05-16T10:00:00.000Z",
    endDate: "2026-05-16T21:30:00.000Z",
    timezone: "Asia/Kolkata",
    capacity: 3000,
    featured: true,
    visibility: "public",
    featuredImage: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
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
    organizerIndex: 0,
  },
  {
    title: "StreetPop Creator Market",
    slug: "streetpop-creator-market",
    description: "A curated pop-up for indie creators, thrift sellers, food brands, and student-run labels.",
    category: "Pop-Up",
    tags: ["pop-up", "fashion", "food", "community"],
    status: "published",
    eventType: "offline",
    venueIndex: 1,
    startDate: "2026-05-23T11:00:00.000Z",
    endDate: "2026-05-23T19:00:00.000Z",
    timezone: "Asia/Kolkata",
    capacity: 450,
    featured: true,
    visibility: "public",
    featuredImage: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
    gallery: ["https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&w=1200&q=80"],
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
    organizerIndex: 0,
  },
  {
    title: "Campus Creator Summit",
    slug: "campus-creator-summit",
    description: "A content creator meetup for students with brand building sessions, portfolio reviews, and panel discussions.",
    category: "Community Event",
    tags: ["creators", "networking", "students", "branding"],
    status: "published",
    eventType: "hybrid",
    venueIndex: 2,
    startDate: "2026-06-01T09:30:00.000Z",
    endDate: "2026-06-01T17:00:00.000Z",
    timezone: "Asia/Kolkata",
    capacity: 800,
    featured: false,
    visibility: "public",
    featuredImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
    gallery: ["https://images.unsplash.com/photo-1515168833906-d2a3b82b302a?auto=format&fit=crop&w=1200&q=80"],
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
    organizerIndex: 1,
  },
  {
    title: "Rangmanch Cultural Night",
    slug: "rangmanch-cultural-night",
    description: "An evening of dance battles, unplugged bands, street theatre, and college cultural performances.",
    category: "College Fest",
    tags: ["culture", "music", "dance", "college"],
    status: "published",
    eventType: "offline",
    venueIndex: 0,
    startDate: "2026-06-12T16:00:00.000Z",
    endDate: "2026-06-12T22:00:00.000Z",
    timezone: "Asia/Kolkata",
    capacity: 2500,
    featured: false,
    visibility: "public",
    featuredImage: "https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=1200&q=80",
    gallery: ["https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?auto=format&fit=crop&w=1200&q=80"],
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
    organizerIndex: 1,
  },
];

// ============================================
// HELPER FUNCTIONS
// ============================================

const generateUniqueRegistrationNumber = () => {
  return `REG-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
};

const generatePassNumber = () => {
  return `PASS-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
};

const generateQRCode = () => {
  return `QR-${crypto.randomBytes(16).toString("hex").toUpperCase()}`;
};

const hashPassword = async (password) => {
  return bcrypt.hash(password, 10);
};

// ============================================
// SEEDING MAIN FUNCTION
// ============================================

const seedComprehensiveData = async () => {
  try {
    await connectDB();
    console.log("✅ Connected to MongoDB");

    // Clear existing test data
    console.log("🗑️  Clearing existing test data...");
    await User.deleteMany({ email: { $in: organizersData.map(o => o.email).concat(attendeesData.map(a => a.email)) } });
    await OrganizerProfile.deleteMany({});
    await Venue.deleteMany({});
    await Event.deleteMany({});
    await TicketType.deleteMany({});
    await Registration.deleteMany({});
    await Payment.deleteMany({});
    await Pass.deleteMany({});
    await SavedEvent.deleteMany({});
    await Checkin.deleteMany({});
    await Notification.deleteMany({});
    console.log(" Cleared existing test data");

    // ============================================
    // SEED ORGANIZERS
    // ============================================
    console.log("\n Seeding Organizers...");
    const organizers = [];
    for (const organizerData of organizersData) {
      const hashedPassword = await hashPassword(organizerData.password);
      const organizer = await User.create({
        name: organizerData.name,
        email: organizerData.email,
        password: hashedPassword,
        role: organizerData.role,
        phone: organizerData.phone,
        college: organizerData.college,
        avatar: organizerData.avatar,
        isVerified: true,
      });

      const organizerProfile = await OrganizerProfile.create({
        user: organizer._id,
        ...organizerData.organizerProfile,
      });

      organizers.push({ user: organizer, profile: organizerProfile });
      console.log(`   Created organizer: ${organizerData.email}`);
    }

    // ============================================
    // SEED ATTENDEES
    // ============================================
    console.log("\n👥 Seeding Attendees...");
    const attendees = [];
    for (const attendeeData of attendeesData) {
      const hashedPassword = await hashPassword(attendeeData.password);
      const attendee = await User.create({
        name: attendeeData.name,
        email: attendeeData.email,
        password: hashedPassword,
        role: attendeeData.role,
        phone: attendeeData.phone,
        college: attendeeData.college,
        avatar: attendeeData.avatar,
        isVerified: true,
      });
      attendees.push(attendee);
      console.log(`   Created attendee: ${attendeeData.email}`);
    }

    // ============================================
    // SEED VENUES
    // ============================================
    console.log("\n🏟️  Seeding Venues...");
    const venues = [];
    for (let i = 0; i < venuesData.length; i++) {
      const venue = await Venue.create({
        organizer: organizers[0].user._id,
        ...venuesData[i],
      });
      venues.push(venue);
      console.log(`  ✅ Created venue: ${venuesData[i].name}`);
    }

    // ============================================
    // SEED EVENTS & TICKETS
    // ============================================
    console.log("\n🎉 Seeding Events and Tickets...");
    const events = [];
    const ticketTypes = [];

    for (const eventData of eventsData) {
      const organizer = organizers[eventData.organizerIndex];
      const venue = venues[eventData.venueIndex];

      const event = await Event.create({
        organizer: organizer.user._id,
        organizerProfile: organizer.profile._id,
        title: eventData.title,
        slug: eventData.slug,
        description: eventData.description,
        category: eventData.category,
        tags: eventData.tags,
        status: eventData.status,
        eventType: eventData.eventType,
        venue: venue._id,
        startDate: new Date(eventData.startDate),
        endDate: new Date(eventData.endDate),
        timezone: eventData.timezone,
        capacity: eventData.capacity,
        featured: eventData.featured,
        visibility: eventData.visibility,
        featuredImage: eventData.featuredImage,
        gallery: eventData.gallery,
        ticketingEnabled: true,
      });

      events.push(event);
      console.log(`  ✅ Created event: ${eventData.title}`);

      // Create ticket types for this event
      for (const ticketData of eventData.tickets) {
        const ticketType = await TicketType.create({
          event: event._id,
          name: ticketData.name,
          description: ticketData.description,
          price: ticketData.price,
          currency: "INR",
          totalQuantity: ticketData.totalQuantity,
          soldQuantity: 0,
          maxPerUser: ticketData.maxPerUser,
          salesStart: new Date(eventData.startDate),
          salesEnd: new Date(eventData.endDate),
          benefits: ticketData.benefits,
          isActive: true,
        });
        ticketTypes.push(ticketType);
        console.log(`    ✅ Created ticket: ${ticketData.name} (₹${ticketData.price})`);
      }
    }

    // ============================================
    // SEED REGISTRATIONS, PAYMENTS & PASSES
    // ============================================
    console.log("\n🎫 Seeding Registrations, Payments & Passes...");
    const registrations = [];
    const payments = [];

    for (let i = 0; i < attendees.length; i++) {
      const attendee = attendees[i];
      const eventIndex = i % events.length;
      const event = events[eventIndex];

      // Get ticket types for this event
      const eventTickets = ticketTypes.filter(t => t.event.toString() === event._id.toString());

      if (eventTickets.length > 0) {
        const ticketType = eventTickets[0];
        const registrationNumber = generateUniqueRegistrationNumber();
        const amount = ticketType.price;

        // Create registration
        const registration = await Registration.create({
          event: event._id,
          user: attendee._id,
          ticketType: ticketType._id,
          quantity: 1,
          status: "confirmed",
          registrationNumber,
          amount,
          currency: "INR",
          attendeeDetails: {
            fullName: attendee.name,
            email: attendee.email,
            phone: attendee.phone,
            college: attendee.college,
          },
          notes: "Sample registration for testing",
        });

        registrations.push(registration);
        console.log(`  ✅ Created registration for ${attendee.name} - Event: ${event.title}`);

        // Create payment for registration
        const payment = await Payment.create({
          registration: registration._id,
          user: attendee._id,
          event: event._id,
          provider: "razorpay",
          transactionId: `TXN-${Date.now()}-${crypto.randomBytes(4).toString("hex")}`,
          orderId: `ORD-${crypto.randomBytes(4).toString("hex")}`,
          amount,
          currency: "INR",
          status: "success",
          paymentMethod: "card",
          paidAt: new Date(),
          metadata: {
            email: attendee.email,
            eventId: event._id,
          },
        });

        payments.push(payment);
        console.log(`    ✅ Created payment: ₹${amount}`);

        // Create pass for this registration
        const passNumber = generatePassNumber();
        const qrCode = generateQRCode();

        const pass = await Pass.create({
          registration: registration._id,
          event: event._id,
          user: attendee._id,
          passNumber,
          qrCode,
          status: "active",
          issuedAt: new Date(),
          validFrom: new Date(event.startDate),
          validUntil: new Date(event.endDate),
        });

        console.log(`    ✅ Created pass: ${passNumber}`);

        // Create notification about successful registration
        await Notification.create({
          recipient: attendee._id,
          sender: event.organizer,
          type: "registration",
          title: "Registration Confirmed",
          message: `Your registration for ${event.title} has been confirmed. Your pass is: ${passNumber}`,
          data: {
            eventId: event._id,
            registrationId: registration._id,
            passNumber,
          },
          actionUrl: `/events/${event.slug}`,
        });

        console.log(`    ✅ Created notification for registration`);
      }
    }

    // ============================================
    // SEED SAVED EVENTS
    // ============================================
    console.log("\n❤️  Seeding Saved Events...");
    for (let i = 0; i < attendees.length; i++) {
      for (let j = i; j < Math.min(i + 2, events.length); j++) {
        try {
          await SavedEvent.create({
            user: attendees[i]._id,
            event: events[j]._id,
            savedAt: new Date(),
          });
          console.log(`  ✅ ${attendees[i].name} saved ${events[j].title}`);
        } catch (e) {
          // Handle duplicate unique constraint error
          if (e.code !== 11000) console.log(`  ⚠️  ${attendees[i].name} already saved ${events[j].title}`);
        }
      }
    }

    // ============================================
    // SEED CHECKINS
    // ============================================
    console.log("\n✔️  Seeding Check-ins...");
    const checkinPasses = await Pass.find().limit(3);
    for (const pass of checkinPasses) {
      await Checkin.create({
        pass: pass._id,
        event: pass.event,
        registration: pass.registration,
        user: pass.user,
        status: "success",
        checkInTime: new Date(),
        gate: "Main Gate",
        location: {
          name: "Main Gate",
        },
      });
      pass.status = "used";
      pass.usedAt = new Date();
      await pass.save();
      console.log(`  ✅ Created check-in for ${pass.passNumber}`);
    }

    // ============================================
    // SEED ADDITIONAL NOTIFICATIONS
    // ============================================
    console.log("\n📬 Seeding Additional Notifications...");
    const notificationTypes = [
      {
        type: "event_update",
        title: "Event Update",
        message: "We've added a new performance to your registered event!",
      },
      {
        type: "reminder",
        title: "Event Reminder",
        message: "Your event starts in 24 hours. Don't forget to bring your pass!",
      },
      {
        type: "marketing",
        title: "New Events Available",
        message: "Check out these upcoming events that match your interests!",
      },
    ];

    for (let i = 0; i < attendees.length; i++) {
      const notification = notificationTypes[i % notificationTypes.length];
      await Notification.create({
        recipient: attendees[i]._id,
        type: notification.type,
        title: notification.title,
        message: notification.message,
        actionUrl: "/events",
      });
      console.log(`  ✅ Created ${notification.type} notification for ${attendees[i].name}`);
    }

    // ============================================
    // SUMMARY REPORT
    // ============================================
    console.log("\n" + "=".repeat(60));
    console.log("🎊 DUMMY DATA SEEDING COMPLETED SUCCESSFULLY! 🎊");
    console.log("=".repeat(60));

    console.log("\n📊 SEEDED DATA SUMMARY:");
    console.log(`  • Organizers: ${organizers.length}`);
    console.log(`  • Attendees: ${attendees.length}`);
    console.log(`  • Venues: ${venues.length}`);
    console.log(`  • Events: ${events.length}`);
    console.log(`  • Ticket Types: ${ticketTypes.length}`);
    console.log(`  • Registrations: ${registrations.length}`);
    console.log(`  • Payments: ${payments.length}`);
    console.log(`  • Passes: ${registrations.length}`);

    console.log("\n🔐 ORGANIZER LOGIN CREDENTIALS:");
    for (const orgData of organizersData) {
      console.log(`  • Email: ${orgData.email}`);
      console.log(`    Password: ${orgData.password}`);
      console.log();
    }

    console.log("👤 ATTENDEE LOGIN CREDENTIALS:");
    for (const attData of attendeesData) {
      console.log(`  • Email: ${attData.email}`);
      console.log(`    Password: ${attData.password}`);
      console.log();
    }

    console.log("\n✅ All systems ready for testing!");
  } catch (error) {
    console.error("❌ Error seeding data:", error.message);
    console.error(error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

// Run the seed function
seedComprehensiveData();
