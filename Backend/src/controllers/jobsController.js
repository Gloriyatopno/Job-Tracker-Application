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


const getAllJobs = async (req, res) => {
  try {
    const query = `
      SELECT *
      FROM jobs
      ORDER BY created_at DESC;
    `;

    const result = await pool.query(query);

    return res.status(200).json({
      success: true,
      count: result.rows.length,
      data: result.rows,
    });
  } catch (error) {
    console.error("Get Jobs Error:", error);

    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

const getJobById = async (req, res) => {
  try {
    const { id } = req.params;

    const query = `
      SELECT *
      FROM jobs
      WHERE id = $1;
    `;

    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: "Job not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Get Job By ID Error:", error);

    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const { company, role, status, applied_date, notes } = req.body;

    
    const existingJob = await pool.query(
      "SELECT * FROM jobs WHERE id = $1",
      [id]
    );

    if (existingJob.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: "Job not found",
      });
    }

    const currentJob = existingJob.rows[0];

    const query = `
      UPDATE jobs
      SET
        company = $1,
        role = $2,
        status = $3,
        applied_date = $4,
        notes = $5
      WHERE id = $6
      RETURNING *;
    `;

    const values = [
      company ?? currentJob.company,
      role ?? currentJob.role,
      status ?? currentJob.status,
      applied_date ?? currentJob.applied_date,
      notes ?? currentJob.notes,
      id,
    ];

    const result = await pool.query(query, values);

    return res.status(200).json({
      success: true,
      message: "Job updated successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Update Job Error:", error);

    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;

    
    const existingJob = await pool.query(
      "SELECT * FROM jobs WHERE id = $1",
      [id]
    );

    if (existingJob.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: "Job not found",
      });
    }

    // Delete the job
    await pool.query(
      "DELETE FROM jobs WHERE id = $1",
      [id]
    );

    return res.status(204).send();
  } catch (error) {
    console.error("Delete Job Error:", error);

    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

module.exports = {
    createJob,
    getAllJobs,
    getJobById,
    updateJob,
    deleteJob,
};