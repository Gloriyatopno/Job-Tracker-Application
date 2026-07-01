const express = require("express");
const cors = require("cors");
const jobsRoutes = require("./routes/jobsRoutes");

const app = express();

app.use(cors());          
app.use(express.json());

app.use("/jobs", jobsRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the Job Tracker API!",
  });
});

module.exports = app;