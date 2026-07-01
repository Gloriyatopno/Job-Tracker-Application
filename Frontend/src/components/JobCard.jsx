function JobCard({ job, onDelete }) {
  return (
    <div className="job-card">
      <h2>{job.company}</h2>

      <p>
        <strong>Role:</strong> {job.role}
      </p>

      <p>
        <strong>Status:</strong> {job.status}
      </p>

      <p>
        <strong>Applied Date:</strong> {job.applied_date}
      </p>

      <p>
        <strong>Notes:</strong> {job.notes || "No notes"}
      </p>

      <button onClick={() => onDelete(job.id)}>
        Delete
      </button>
    </div>
  );
}

export default JobCard;