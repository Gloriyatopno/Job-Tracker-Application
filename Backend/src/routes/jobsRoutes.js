const express = require("express");
const router = express.Router();

const validateCreateJob = require("../validators/jobsValidator");
const {
  createJob,
  getAllJobs,
} = require("../controllers/jobsController");

router.get("/", getAllJobs);
router.post(
    "/", 
    validateCreateJob, 
    createJob);

module.exports = router;