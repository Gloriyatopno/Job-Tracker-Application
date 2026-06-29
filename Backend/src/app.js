const express = require("express");

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to the Job Tracker API!"
    });
});

module.exports = app;