const express = require("express");
const router = express.Router();

const validateCreateJob = require("../validators/jobsValidator");
const { createJob } = require("../controllers/jobsController");


router.post("/", validateCreateJob, createJob);

module.exports = router;