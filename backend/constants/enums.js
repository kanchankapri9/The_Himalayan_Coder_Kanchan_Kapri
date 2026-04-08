const USER_ROLES = Object.freeze({
  ATTENDEE: "attendee",
  ORGANIZER: "organizer",
  ADMIN: "admin",
});

const EVENT_STATUS = Object.freeze({
  DRAFT: "draft",
  PUBLISHED: "published",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
});

const REGISTRATION_STATUS = Object.freeze({
  PENDING: "pending",
  CONFIRMED: "confirmed",
  CANCELLED: "cancelled",
  REFUNDED: "refunded",
  WAITLISTED: "waitlisted",
});

const PAYMENT_STATUS = Object.freeze({
  PENDING: "pending",
  SUCCESS: "success",
  FAILED: "failed",
  REFUNDED: "refunded",
  PARTIAL_REFUND: "partial_refund",
});

const PASS_STATUS = Object.freeze({
  ACTIVE: "active",
  USED: "used",
  REVOKED: "revoked",
  EXPIRED: "expired",
});

module.exports = {
  USER_ROLES,
  EVENT_STATUS,
  REGISTRATION_STATUS,
  PAYMENT_STATUS,
  PASS_STATUS,
};