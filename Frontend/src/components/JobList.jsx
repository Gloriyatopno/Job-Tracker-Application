import JobCard from "./JobCard";

function JobList({ jobs }) {
  if (jobs.length === 0) {
    return <p>No job applications found.</p>;
  }

  return (
    <div>
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}

export default JobList;