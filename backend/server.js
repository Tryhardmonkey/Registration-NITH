import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import studentRoutes from "./src/routes/studentRoutes.js";
import { initializeDatabase } from "./src/db/init.js";

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ success: true, message: "Server is healthy" });
});

app.use("/api/students", studentRoutes);

initializeDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to initialize database:", error);
    process.exit(1);
  });
