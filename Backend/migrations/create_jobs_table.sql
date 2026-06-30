CREATE TABLE IF NOT EXISTS jobs (
    id SERIAL PRIMARY KEY,

    company VARCHAR(255) NOT NULL,

    role VARCHAR(255) NOT NULL,

    status VARCHAR(20) NOT NULL
        CHECK (status IN ('applied', 'interviewing', 'offered', 'rejected')),

    applied_date DATE NOT NULL,

    notes TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);