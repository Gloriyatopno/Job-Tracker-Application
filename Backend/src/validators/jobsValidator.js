const { body, validationResult } = require("express-validator");

const validateCreateJob = [
  body("company")
    .trim()
    .notEmpty()
    .withMessage("Company is required"),

  body("role")
    .trim()
    .notEmpty()
    .withMessage("Role is required"),

  body("status")
    .isIn(["applied", "interviewing", "offered", "rejected"])
    .withMessage(
      "Invalid status. Must be one of: applied, interviewing, offered, rejected"
    ),

  body("applied_date")
    .isISO8601()
    .withMessage("Applied date must be a valid date"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: errors.array()[0].msg,
      });
    }

    next();
  },
];

module.exports = validateCreateJob;