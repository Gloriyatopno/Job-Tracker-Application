import JobCard from "./JobCard";

function JobList({ jobs, onDelete, onStatusChange }) {

  if (jobs.length === 0) {
    return <p>No job applications found.</p>;
  }

  return (
    <div>
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