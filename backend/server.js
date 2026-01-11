import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Student API example
app.get("/api/student", (req, res) => {
  res.json({ name: "John Doe", rollNo: "123", reports: [] });
});

const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));