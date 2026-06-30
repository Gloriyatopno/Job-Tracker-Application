const express = require("express");
const router = express.Router();

const validateCreateJob = require("../validators/jobsValidator");
const {
  createJob,
  getAllJobs,
  getJobById,
} = require("../controllers/jobsController");

router.get("/", getAllJobs);
router.get("/:id", getJobById);
router.post(
    "/", 
    validateCreateJob, 
    createJob);

module.exports = router;