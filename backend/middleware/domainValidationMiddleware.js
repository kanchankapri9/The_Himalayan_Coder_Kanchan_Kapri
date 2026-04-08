const Event = require("../models/Event");
const Registration = require("../models/Registration");
const TicketType = require("../models/TicketType");
const { sendValidationError } = require("./validateMiddleware");

const ACTIVE_REGISTRATION_STATUSES = ["pending", "confirmed", "waitlisted"];

const parseIsoDate = (value) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

const getBookedQuantityForEvent = async (eventId, excludeRegistrationId = null) => {
  const match = {
    event: eventId,
    status: { $in: ACTIVE_REGISTRATION_STATUSES },
  };

  if (excludeRegistrationId) {
    match._id = { $ne: excludeRegistrationId };
  }

  const [result] = await Registration.aggregate([
    { $match: match },
    { $group: { _id: null, totalQuantity: { $sum: "$quantity" } } },
  ]);

  return result?.totalQuantity || 0;
};

const enforceEventDomainRules = async (req, res, next) => {
  try {
    const errors = [];
    const body = req.body || {};

    let startDate = body.startDate ? parseIsoDate(body.startDate) : null;
    let endDate = body.endDate ? parseIsoDate(body.endDate) : null;

    if (req.params.id) {
      const existingEvent = await Event.findById(req.params.id).select("startDate endDate organizer title");
      if (existingEvent) {
        if (!startDate) {
          startDate = existingEvent.startDate;
        }
        if (!endDate) {
          endDate = existingEvent.endDate;
        }

        const duplicateFilter = {
          organizer: existingEvent.organizer,
          title: body.title || existingEvent.title,
          startDate,
          _id: { $ne: existingEvent._id },
        };

        const duplicateEvent = await Event.findOne(duplicateFilter).select("_id");
        if (duplicateEvent) {
          errors.push({
            field: "title",
            message: "An event with the same title and startDate already exists for this organizer.",
          });
        }
      }
    }

    if (body.organizer && body.title && body.startDate) {
      const duplicateFilter = {
        organizer: body.organizer,
        title: body.title,
        startDate,
      };

      const duplicateEvent = await Event.findOne(duplicateFilter).select("_id");
      if (duplicateEvent) {
        errors.push({
          field: "title",
          message: "An event with the same title and startDate already exists for this organizer.",
        });
      }
    }

    if (startDate && endDate && endDate <= startDate) {
      errors.push({ field: "endDate", message: "endDate must be later than startDate." });
    }

    if (req.params.id && body.capacity !== undefined) {
      const bookedQuantity = await getBookedQuantityForEvent(req.params.id);
      if (Number(body.capacity) > 0 && Number(body.capacity) < bookedQuantity) {
        errors.push({
          field: "capacity",
          message: `capacity cannot be lower than current booked quantity (${bookedQuantity}).`,
        });
      }
    }

    if (errors.length > 0) {
      return sendValidationError(res, errors, "Event domain rules failed.");
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to validate event business rules.",
      error: error.message,
    });
  }
};

const enforceRegistrationDomainRules = async (req, res, next) => {
  try {
    const errors = [];
    const body = req.body || {};
    const registrationId = req.params.id || null;

    let existingRegistration = null;
    if (registrationId) {
      existingRegistration = await Registration.findById(registrationId).select(
        "event ticketType user quantity status"
      );
    }

    const eventId = body.event || existingRegistration?.event;
    const ticketTypeId = body.ticketType || existingRegistration?.ticketType;
    const userId = body.user || existingRegistration?.user || req.user?._id;
    const requestedQuantity = Number(body.quantity || existingRegistration?.quantity || 1);

    const event = eventId ? await Event.findById(eventId).select("status endDate capacity") : null;
    if (!event) {
      errors.push({ field: "event", message: "Referenced event was not found." });
    }

    if (event) {
      if (event.status === "cancelled") {
        errors.push({ field: "event", message: "Registrations are not allowed for cancelled events." });
      }

      if (event.endDate && event.endDate < new Date()) {
        errors.push({ field: "event", message: "Registrations are closed because the event has ended." });
      }
    }

    const ticketType = ticketTypeId
      ? await TicketType.findById(ticketTypeId).select("event maxPerUser soldQuantity totalQuantity isActive")
      : null;

    if (!ticketType) {
      errors.push({ field: "ticketType", message: "Referenced ticketType was not found." });
    }

    if (ticketType && eventId && String(ticketType.event) !== String(eventId)) {
      errors.push({ field: "ticketType", message: "ticketType does not belong to the selected event." });
    }

    if (ticketType && ticketType.isActive === false) {
      errors.push({ field: "ticketType", message: "Selected ticketType is currently inactive." });
    }

    if (ticketType && requestedQuantity > ticketType.maxPerUser) {
      errors.push({
        field: "quantity",
        message: `quantity cannot be greater than maxPerUser (${ticketType.maxPerUser}).`,
      });
    }

    if (ticketType) {
      const available = ticketType.totalQuantity - ticketType.soldQuantity;
      if (requestedQuantity > available) {
        errors.push({
          field: "quantity",
          message: `Only ${available} tickets are available for this ticketType.`,
        });
      }
    }

    if (event && event.capacity > 0) {
      const bookedQuantity = await getBookedQuantityForEvent(event._id, registrationId);
      const projected = bookedQuantity + requestedQuantity;
      if (projected > event.capacity) {
        errors.push({
          field: "quantity",
          message: `Requested quantity exceeds event capacity. Remaining capacity is ${Math.max(event.capacity - bookedQuantity, 0)}.`,
        });
      }
    }

    if (eventId && ticketTypeId && userId) {
      const duplicateFilter = {
        event: eventId,
        ticketType: ticketTypeId,
        user: userId,
        status: { $in: ACTIVE_REGISTRATION_STATUSES },
      };

      if (registrationId) {
        duplicateFilter._id = { $ne: registrationId };
      }

      const duplicateRegistration = await Registration.findOne(duplicateFilter).select("_id");
      if (duplicateRegistration) {
        errors.push({
          field: "ticketType",
          message: "An active registration for this event and ticketType already exists for this user.",
        });
      }
    }

    if (errors.length > 0) {
      return sendValidationError(res, errors, "Registration domain rules failed.");
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to validate registration business rules.",
      error: error.message,
    });
  }
};

module.exports = {
  enforceEventDomainRules,
  enforceRegistrationDomainRules,
};