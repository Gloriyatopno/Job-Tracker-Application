function JobCard({ job, onDelete, onStatusChange }) {
  return (
    <div className="job-card">
      <h2>{job.company}</h2>

      <p>
        <strong>Role:</strong> {job.role}
      </p>

      <p>
  <strong>Status:</strong>
</p>

<select
  value={job.status}
  onChange={(e) => onStatusChange(job.id, e.target.value)}
>
  <option value="applied">Applied</option>
  <option value="interviewing">Interviewing</option>
  <option value="offered">Offered</option>
  <option value="rejected">Rejected</option>
  </select>

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