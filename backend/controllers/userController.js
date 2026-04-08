const User = require("../models/User");
const { createCrudController } = require("../utils/controllerFactory");

// User controller keeps account records in sync with auth and profile flows.
module.exports = createCrudController(User, {
	resourceName: "User",
	searchableFields: ["name", "email", "phone", "college", "role"],
	defaultSort: "-createdAt",
});
