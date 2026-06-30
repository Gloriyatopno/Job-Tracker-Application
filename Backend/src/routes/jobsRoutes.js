const express = require("express");
const router = express.Router();

const {
  validateCreateJob,
  validateUpdateJob,
} = require("../validators/jobsValidator");

const {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
} = require("../controllers/jobsController");

router.get("/", getAllJobs);
router.get("/:id", getJobById);
router.post(
    "/", 
    validateCreateJob, 
    createJob);
router.patch("/:id", validateUpdateJob, updateJob);

module.exports = router;