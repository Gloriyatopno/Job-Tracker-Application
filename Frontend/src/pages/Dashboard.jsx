import { useEffect, useState } from "react";
import jobsApi from "../api/jobsApi";

function Dashboard() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await jobsApi.get("/jobs");
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  return (
    <div className="container">
      <h1>Job Application Tracker</h1>

      <p>Total Jobs: {jobs.length}</p>

      <pre>{JSON.stringify(jobs, null, 2)}</pre>
    </div>
  );
}

export default Dashboard;