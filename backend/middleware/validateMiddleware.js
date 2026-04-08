const mongoose = require("mongoose");

const sendValidationError = (res, errors, message = "Validation failed.") => {
  return res.status(400).json({
    success: false,
    message,
    errors,
  });
};

const isMissing = (value) => {
  return value === undefined || value === null || value === "";
};

const parseIsoDate = (value) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

// Validate MongoDB id from route params.
const validateObjectId = (paramName = "id") => {
  return (req, res, next) => {
    const value = req.params[paramName];

    if (!mongoose.Types.ObjectId.isValid(value)) {
      return sendValidationError(res, [
        {
          field: paramName,
          message: `Invalid ${paramName}.`,
        },
      ]);
    }

    next();
  };
};

// Ensure required fields exist in request body.
// Usage: requireBodyFields(["name", "email"]) 
const requireBodyFields = (fields = []) => {
  return (req, res, next) => {
    const missingFields = fields.filter((field) => {
      const value = req.body[field];
      return isMissing(value);
    });

    if (missingFields.length > 0) {
      return sendValidationError(
        res,
        missingFields.map((field) => ({
          field,
          message: `${field} is required.`,
        })),
        `Missing required fields: ${missingFields.join(", ")}`
      );
    }

    next();
  };
};

const validateEventPayload = ({ partial = false } = {}) => {
  return (req, res, next) => {
    const errors = [];
    const body = req.body || {};

    const requiredFields = ["title", "description", "category", "startDate", "endDate"];

    if (!partial) {
      for (const field of requiredFields) {
        if (isMissing(body[field])) {
          errors.push({ field, message: `${field} is required.` });
        }
      }
    }

    const stringFields = ["title", "description", "category", "status", "eventType", "visibility"];
    for (const field of stringFields) {
      if (body[field] !== undefined && typeof body[field] !== "string") {
        errors.push({ field, message: `${field} must be a string.` });
      }
    }

    if (body.capacity !== undefined) {
      const capacity = Number(body.capacity);
      if (!Number.isInteger(capacity) || capacity < 0) {
        errors.push({ field: "capacity", message: "capacity must be a non-negative integer." });
      }
    }

    if (body.startDate !== undefined) {
      const startDate = parseIsoDate(body.startDate);
      if (!startDate) {
        errors.push({ field: "startDate", message: "startDate must be a valid date." });
      }
    }

    if (body.endDate !== undefined) {
      const endDate = parseIsoDate(body.endDate);
      if (!endDate) {
        errors.push({ field: "endDate", message: "endDate must be a valid date." });
      }
    }

    if (body.startDate !== undefined && body.endDate !== undefined) {
      const startDate = parseIsoDate(body.startDate);
      const endDate = parseIsoDate(body.endDate);

      if (startDate && endDate && endDate <= startDate) {
        errors.push({ field: "endDate", message: "endDate must be later than startDate." });
      }
    }

    if (errors.length > 0) {
      return sendValidationError(res, errors);
    }

    next();
  };
};

const validateRegistrationPayload = ({ partial = false } = {}) => {
  return (req, res, next) => {
    const errors = [];
    const body = req.body || {};

    const requiredFields = ["event", "ticketType", "registrationNumber", "amount"];
    if (!partial) {
      for (const field of requiredFields) {
        if (isMissing(body[field])) {
          errors.push({ field, message: `${field} is required.` });
        }
      }
    }

    const objectIdFields = ["event", "ticketType", "user"];
    for (const field of objectIdFields) {
      if (body[field] !== undefined && !mongoose.Types.ObjectId.isValid(body[field])) {
        errors.push({ field, message: `${field} must be a valid ObjectId.` });
      }
    }

    if (body.registrationNumber !== undefined && typeof body.registrationNumber !== "string") {
      errors.push({ field: "registrationNumber", message: "registrationNumber must be a string." });
    }

    if (body.amount !== undefined) {
      const amount = Number(body.amount);
      if (!Number.isFinite(amount) || amount < 0) {
        errors.push({ field: "amount", message: "amount must be a non-negative number." });
      }
    }

    if (body.quantity !== undefined) {
      const quantity = Number(body.quantity);
      if (!Number.isInteger(quantity) || quantity < 1) {
        errors.push({ field: "quantity", message: "quantity must be an integer greater than or equal to 1." });
      }
    }

    if (body.currency !== undefined && typeof body.currency !== "string") {
      errors.push({ field: "currency", message: "currency must be a string." });
    }

    if (body.attendeeDetails !== undefined && typeof body.attendeeDetails !== "object") {
      errors.push({ field: "attendeeDetails", message: "attendeeDetails must be an object." });
    }

    if (errors.length > 0) {
      return sendValidationError(res, errors);
    }

    next();
  };
};

module.exports = {
  sendValidationError,
  validateObjectId,
  requireBodyFields,
  validateEventPayload,
  validateRegistrationPayload,
};
