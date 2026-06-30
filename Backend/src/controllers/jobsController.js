const pool = require("../config/db");

const createJob = async (req, res) => {
  try {
    const { company, role, status, applied_date, notes } = req.body;

    const query = `
      INSERT INTO jobs (company, role, status, applied_date, notes)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;

    const values = [company, role, status, applied_date, notes];

    const result = await pool.query(query, values);

    return res.status(201).json({
      success: true,
      message: "Job created successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Create Job Error:", error);

    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

module.exports = {
  createJob,
};