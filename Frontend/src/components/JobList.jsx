import JobCard from "./JobCard";

function JobList({ jobs, onDelete, onStatusChange }) {
  if (jobs.length === 0) {
    return (
      <div className="empty-state">
        <h2>No job applications yet 📭</h2>
        <p>Add your first job using the form above.</p>
      </div>
    );
  }

  return (
    <div className="job-grid">
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
}

export default JobList;
