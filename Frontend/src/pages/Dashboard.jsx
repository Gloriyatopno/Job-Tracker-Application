import { useEffect, useState } from "react";
import jobsApi from "../api/jobsApi";
import JobList from "../components/JobList";
import JobForm from "../components/JobForm";

function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOption, setSortOption] = useState("newest");
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    try {
      setLoading(true);

      const response = await jobsApi.get("/jobs");

      setJobs(response.data.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteJob = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmed) return;

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

  // Search + Filter + Sort
  const filteredJobs = jobs
    .filter((job) => {
      const matchesSearch =
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.role.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || job.status === statusFilter;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortOption) {
        case "newest":
          return new Date(b.created_at) - new Date(a.created_at);

        case "oldest":
          return new Date(a.created_at) - new Date(b.created_at);

        case "companyAZ":
          return a.company.localeCompare(b.company);

        case "companyZA":
          return b.company.localeCompare(a.company);

        default:
          return 0;
      }
    });

  // Dashboard Statistics
  const appliedCount = jobs.filter(
    (job) => job.status === "applied"
  ).length;

  const interviewingCount = jobs.filter(
    (job) => job.status === "interviewing"
  ).length;

  const offeredCount = jobs.filter(
    (job) => job.status === "offered"
  ).length;

  const rejectedCount = jobs.filter(
    (job) => job.status === "rejected"
  ).length;

  if (loading) {
    return (
      <div className="loading">
        <h2>Loading jobs...</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="dashboard-header">
        <div>
          <h1>Job Application Tracker</h1>
          <p>Track your job applications in one place.</p>
        </div>

        <div className="stats-card">
          <h2>{jobs.length}</h2>
          <span>Total Jobs</span>

          <hr />

          <p>🟦 Applied: {appliedCount}</p>
          <p>🟨 Interviewing: {interviewingCount}</p>
          <p>🟩 Offered: {offeredCount}</p>
          <p>🟥 Rejected: {rejectedCount}</p>
        </div>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search by company or role..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="filter-box">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Statuses</option>
          <option value="applied">Applied</option>
          <option value="interviewing">Interviewing</option>
          <option value="offered">Offered</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="sort-box">
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="companyAZ">Company A-Z</option>
          <option value="companyZA">Company Z-A</option>
        </select>
      </div>

      <JobForm onJobAdded={fetchJobs} />

      <JobList
        jobs={filteredJobs}
        onDelete={deleteJob}
        onStatusChange={updateJobStatus}
      />
    </div>
  );
}

export default Dashboard;