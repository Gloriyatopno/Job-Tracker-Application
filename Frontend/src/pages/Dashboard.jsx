import { useEffect, useState } from "react";
import jobsApi from "../api/jobsApi";
import JobList from "../components/JobList";

function Dashboard() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
     const response = await jobsApi.get("/jobs");

console.log("Response:", response.data);
console.log("Is Array?", Array.isArray(response.data));

setJobs(response.data.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  return (
  <div className="container">
    <h1>Job Application Tracker</h1>

    <p>Total Jobs: {jobs.length}</p>

    <JobList jobs={jobs} />
  </div>
);
}

export default Dashboard;