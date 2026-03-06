import { Router } from "express";
import {
  createStudentAccount,
  loginStudent,
  registerStudent,
} from "../controllers/studentController.js";

const router = Router();

router.post("/register", registerStudent);
router.post("/create-account", createStudentAccount);
router.post("/login", loginStudent);

export default router;
