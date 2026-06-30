# Job Tracker Backend API

A RESTful API for managing job applications, built with Node.js, Express, and PostgreSQL.

## Quick Start

```bash
git clone <repository-url>
cd Backend
npm install
npm run dev
```

## Features

- Create a new job application
- Get all job applications
- Get a job application by ID
- Update a job application
- Delete a job application
- Input validation for job status
- PostgreSQL database integration

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- express-validator
- dotenv
- nodemon

## Project Structure

```
Backend/
├── migrations/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── routes/
│   ├── validators/
│   ├── app.js
│   └── server.js
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd Backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file using `.env.example`.

Example:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=job_tracker
```

### 4. Create the database

```sql
CREATE DATABASE job_tracker;
```

Run the migration file inside the `migrations` folder.

### 5. Start the server

```bash
npm run dev
```

The server will start at:

```
http://localhost:3000
```

## API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /jobs | Create a new job |
| GET | /jobs | Get all jobs |
| GET | /jobs/:id | Get a job by ID |
| PATCH | /jobs/:id | Update a job |
| DELETE | /jobs/:id | Delete a job |

## Valid Status Values

- applied
- interviewing
- offered
- rejected

## Example POST Request

```json
{
  "company": "Google",
  "role": "Backend Engineer",
  "status": "applied",
  "applied_date": "2026-06-30",
  "notes": "Applied through LinkedIn"
}
```

## Author

Gloriya Topno