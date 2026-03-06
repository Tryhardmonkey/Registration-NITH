import pool from "./pool.js";

const createStudentsTableQuery = `
CREATE TABLE IF NOT EXISTS students (
  student_id SERIAL PRIMARY KEY,
  application_number VARCHAR(50) UNIQUE NOT NULL,
  branch VARCHAR(20) NOT NULL,
  dob DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

const createAccountsTableQuery = `
CREATE TABLE IF NOT EXISTS student_accounts (
  account_id SERIAL PRIMARY KEY,
  student_id INTEGER UNIQUE NOT NULL REFERENCES students(student_id) ON DELETE CASCADE,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

export async function initializeDatabase() {
  await pool.query(createStudentsTableQuery);
  await pool.query(createAccountsTableQuery);
}
