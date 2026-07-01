import { useEffect, useState } from "react";
import jobsApi from "../api/jobsApi";
import JobList from "../components/JobList";
import JobForm from "../components/JobForm";

function Dashboard() {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    try {
      const response = await jobsApi.get("/jobs");
      setJobs(response.data.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const deleteJob = async (id) => {
  try {
    await jobsApi.delete(`/jobs/${id}`);
    fetchJobs();
  } catch (error) {
    console.error("Error deleting job:", error);
  }
};

const updateJobStatus = async (id, status) => {
  try {
    await jobsApi.patch(`/jobs/${id}`, {
      status,
    });

    fetchJobs();
  } catch (error) {
    console.error("Error updating job:", error);
  }
};

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="container">
      <h1>Job Application Tracker</h1>

      <JobForm onJobAdded={fetchJobs} />

      <p>Total Jobs: {jobs.length}</p>

      <JobList
  jobs={jobs}
  onDelete={deleteJob}
  onStatusChange={updateJobStatus}
   />
    </div>
  );
}

export default Dashboard;