const mongoose = require("mongoose");

// Builds a small, consistent CRUD controller around any Mongoose model.
// The goal is to keep the actual controller files readable and easy to maintain.
const createCrudController = (Model, options = {}) => {
  const resourceName = options.resourceName || Model.modelName;
  const searchableFields = options.searchableFields || [];
  const populateOptions = Array.isArray(options.populate)
    ? options.populate
    : options.populate
      ? [options.populate]
      : [];
  const defaultSort = options.defaultSort || "-createdAt";
  const uploadField = options.uploadField || null;

  const setPathValue = (target, path, value) => {
    const segments = path.split(".");
    let current = target;

    for (let i = 0; i < segments.length - 1; i += 1) {
      const key = segments[i];
      if (!current[key] || typeof current[key] !== "object") {
        current[key] = {};
      }
      current = current[key];
    }

    current[segments[segments.length - 1]] = value;
  };

  const applyPopulate = (query) => {
    for (const populateOption of populateOptions) {
      query.populate(populateOption);
    }

    return query;
  };

  const buildSearchFilter = (searchTerm) => {
    if (!searchTerm || searchableFields.length === 0) {
      return {};
    }

    return {
      $or: searchableFields.map((field) => ({
        [field]: { $regex: searchTerm, $options: "i" },
      })),
    };
  };

  const getAll = async (req, res) => {
    try {
      const page = Math.max(parseInt(req.query.page || "1", 10), 1);
      const limit = Math.max(parseInt(req.query.limit || "20", 10), 1);
      const searchTerm = (req.query.search || "").trim();
      const filter = buildSearchFilter(searchTerm);

      const total = await Model.countDocuments(filter);
      const query = applyPopulate(
        Model.find(filter)
          .sort(req.query.sort || defaultSort)
          .skip((page - 1) * limit)
          .limit(limit)
      );

      const items = await query.exec();

      res.status(200).json({
        success: true,
        message: `${resourceName} list loaded successfully.`,
        count: items.length,
        total,
        page,
        pages: Math.ceil(total / limit),
        data: items,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Failed to load ${resourceName.toLowerCase()} list.`,
        error: error.message,
      });
    }
  };

  const getOne = async (req, res) => {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          success: false,
          message: `Invalid ${resourceName.toLowerCase()} id.`,
        });
      }

      const query = applyPopulate(Model.findById(id));
      const item = await query.exec();

      if (!item) {
        return res.status(404).json({
          success: false,
          message: `${resourceName} not found.`,
        });
      }

      res.status(200).json({
        success: true,
        message: `${resourceName} loaded successfully.`,
        data: item,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Failed to load ${resourceName.toLowerCase()}.`,
        error: error.message,
      });
    }
  };

  const createOne = async (req, res) => {
    try {
      const payload = { ...req.body };
      if (uploadField && req.file && req.file.path) {
        setPathValue(payload, uploadField, req.file.path);
      }

      const item = await Model.create(payload);

      const populatedItem = await applyPopulate(Model.findById(item._id)).exec();

      res.status(201).json({
        success: true,
        message: `${resourceName} created successfully.`,
        data: populatedItem || item,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: `Failed to create ${resourceName.toLowerCase()}.`,
        error: error.message,
      });
    }
  };

  const updateOne = async (req, res) => {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          success: false,
          message: `Invalid ${resourceName.toLowerCase()} id.`,
        });
      }

      const payload = { ...req.body };
      if (uploadField && req.file && req.file.path) {
        setPathValue(payload, uploadField, req.file.path);
      }

      const updatedItem = await applyPopulate(
        Model.findByIdAndUpdate(id, payload, {
          new: true,
          runValidators: true,
        })
      ).exec();

      if (!updatedItem) {
        return res.status(404).json({
          success: false,
          message: `${resourceName} not found.`,
        });
      }

      res.status(200).json({
        success: true,
        message: `${resourceName} updated successfully.`,
        data: updatedItem,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: `Failed to update ${resourceName.toLowerCase()}.`,
        error: error.message,
      });
    }
  };

  const deleteOne = async (req, res) => {
    try {
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          success: false,
          message: `Invalid ${resourceName.toLowerCase()} id.`,
        });
      }

      const deletedItem = await Model.findByIdAndDelete(id);

      if (!deletedItem) {
        return res.status(404).json({
          success: false,
          message: `${resourceName} not found.`,
        });
      }

      res.status(200).json({
        success: true,
        message: `${resourceName} deleted successfully.`,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Failed to delete ${resourceName.toLowerCase()}.`,
        error: error.message,
      });
    }
  };

  return {
    getAll,
    getOne,
    createOne,
    updateOne,
    deleteOne,
  };
};

module.exports = { createCrudController };