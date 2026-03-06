import pool from "../db/pool.js";
import { hashPassword, verifyPassword } from "../utils/password.js";

export async function registerStudent(req, res) {
  const { applicationNumber, branch, dob } = req.body;

  if (!applicationNumber || !branch || !dob) {
    return res.status(400).json({
      success: false,
      message: "applicationNumber, branch, and dob are required",
    });
  }

  try {
    const existingStudent = await pool.query(
      "SELECT student_id FROM students WHERE application_number = $1",
      [applicationNumber],
    );

    if (existingStudent.rowCount > 0) {
      return res.status(409).json({
        success: false,
        message: "Student with this application number already registered",
      });
    }

    const insertResult = await pool.query(
      `INSERT INTO students (application_number, branch, dob)
       VALUES ($1, $2, $3)
       RETURNING student_id, application_number`,
      [applicationNumber, branch, dob],
    );

    return res.status(201).json({
      success: true,
      message: "JEE details registered successfully. Please create your account.",
      data: insertResult.rows[0],
    });
  } catch (error) {
    console.error("registerStudent error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

export async function createStudentAccount(req, res) {
  const { applicationNumber, username, email, password } = req.body;

  if (!applicationNumber || !username || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "applicationNumber, username, email, and password are required",
    });
  }

  if (String(password).length < 6) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 6 characters",
    });
  }

  try {
    const studentResult = await pool.query(
      "SELECT student_id FROM students WHERE application_number = $1",
      [applicationNumber],
    );

    if (studentResult.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Please submit JEE registration form first",
      });
    }

    const studentId = studentResult.rows[0].student_id;

    const duplicateAccount = await pool.query(
      `SELECT account_id FROM student_accounts
       WHERE student_id = $1 OR username = $2 OR email = $3`,
      [studentId, username, email],
    );

    if (duplicateAccount.rowCount > 0) {
      return res.status(409).json({
        success: false,
        message: "Account already exists for this student, username, or email",
      });
    }

    const passwordHash = hashPassword(password);

    const accountResult = await pool.query(
      `INSERT INTO student_accounts (student_id, username, email, password_hash)
       VALUES ($1, $2, $3, $4)
       RETURNING student_id, username, email`,
      [studentId, username, email, passwordHash],
    );

    return res.status(201).json({
      success: true,
      message: "Account created successfully. You can login now.",
      data: accountResult.rows[0],
    });
  } catch (error) {
    console.error("createStudentAccount error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

export async function loginStudent(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "username and password are required",
    });
  }

  try {
    const accountResult = await pool.query(
      `SELECT student_id, username, email, password_hash
       FROM student_accounts
       WHERE username = $1 OR email = $1`,
      [username],
    );

    if (accountResult.rowCount === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid username/email or password",
      });
    }

    const account = accountResult.rows[0];
    const validPassword = verifyPassword(password, account.password_hash);

    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid username/email or password",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        student_id: account.student_id,
        username: account.username,
        email: account.email,
      },
    });
  } catch (error) {
    console.error("loginStudent error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
