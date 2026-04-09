const Pass = require("../models/Pass");
const { createCrudController } = require("../utils/controllerFactory");
const { USER_ROLES } = require("../constants/enums");

// Pass controller manages QR-based event passes issued after successful registration.
// Pass records are used during gate check-in verification.
const crud = createCrudController(Pass, {
  resourceName: "Pass",
  searchableFields: ["passNumber", "qrCode", "status"],
  populate: [
    { path: "registration", select: "registrationNumber status" },
    { path: "event", select: "title status startDate endDate" },
    { path: "user", select: "name email phone" },
  ],
});

const getMyPasses = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Access denied. Authenticate first.",
      });
    }

    const page = Math.max(parseInt(req.query.page || "1", 10), 1);
    const limit = Math.max(parseInt(req.query.limit || "20", 10), 1);
    const sort = req.query.sort || "-createdAt";
    const search = (req.query.search || "").trim();

    const filter = req.user.role === USER_ROLES.ADMIN ? {} : { user: req.user._id };
    if (search) {
      filter.$or = [
        { passNumber: { $regex: search, $options: "i" } },
        { qrCode: { $regex: search, $options: "i" } },
        { status: { $regex: search, $options: "i" } },
      ];
    }

    const total = await Pass.countDocuments(filter);
    const pages = total === 0 ? 0 : Math.ceil(total / limit);

    const data = await Pass.find(filter)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate({ path: "registration", select: "registrationNumber status" })
      .populate({ path: "event", select: "title startDate endDate status" })
      .populate({ path: "user", select: "name email phone" });

    return res.status(200).json({
      success: true,
      message: "Your passes loaded successfully.",
      count: data.length,
      total,
      page,
      pages,
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to load your passes.",
      error: error.message,
    });
  }
};

module.exports = {
  ...crud,
  getMyPasses,
};