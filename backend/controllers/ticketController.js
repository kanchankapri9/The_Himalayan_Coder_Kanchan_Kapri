const TicketType = require("../models/TicketType");
const { createCrudController } = require("../utils/controllerFactory");

// Ticket controller manages event ticket tiers (price, quantity, sale windows).
const crud = createCrudController(TicketType, {
  resourceName: "Ticket",
  searchableFields: ["name", "description", "currency"],
  populate: [{ path: "event", select: "title status startDate endDate" }],
});

const getAll = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page || "1", 10), 1);
    const limit = Math.max(parseInt(req.query.limit || "20", 10), 1);
    const sort = req.query.sort || "-createdAt";
    const search = (req.query.search || "").trim();
    const filter = {};

    if (req.query.event) {
      filter.event = req.query.event;
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { currency: { $regex: search, $options: "i" } },
      ];
    }

    const total = await TicketType.countDocuments(filter);
    const pages = total === 0 ? 0 : Math.ceil(total / limit);

    const data = await TicketType.find(filter)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate({ path: "event", select: "title status startDate endDate" });

    return res.status(200).json({
      success: true,
      message: "Ticket list loaded successfully.",
      count: data.length,
      total,
      page,
      pages,
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to load ticket list.",
      error: error.message,
    });
  }
};

module.exports = {
  ...crud,
  getAll,
};
