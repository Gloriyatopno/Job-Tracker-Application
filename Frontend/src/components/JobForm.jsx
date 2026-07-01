import { useState } from "react";
import jobsApi from "../api/jobsApi";

function JobForm({ onJobAdded }) {
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    status: "applied",
    applied_date: "",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await jobsApi.post("/jobs", formData);

      // clear form
      setFormData({
        company: "",
        role: "",
        status: "applied",
        applied_date: "",
        notes: "",
      });

      // refresh dashboard
      onJobAdded();
    } catch (error) {
      console.error("Error adding job:", error);
    }
  };

  return (
    <div className="job-form">
      <h2>Add New Job</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="company"
          placeholder="Company"
          value={formData.company}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="role"
          placeholder="Role"
          value={formData.role}
          onChange={handleChange}
          required
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="applied">Applied</option>
          <option value="interviewing">Interviewing</option>
          <option value="offered">Offered</option>
          <option value="rejected">Rejected</option>
        </select>

        <input
          type="date"
          name="applied_date"
          value={formData.applied_date}
          onChange={handleChange}
          required
        />

        <textarea
          name="notes"
          placeholder="Notes"
          value={formData.notes}
          onChange={handleChange}
        />

        <button type="submit">Add Job</button>
      </form>
    </div>
  );
}

export default JobForm;