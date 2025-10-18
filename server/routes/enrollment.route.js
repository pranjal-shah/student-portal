import express from "express";
import {
  getAllEnrollments,
  getEnrollment,
  createEnrollment,
  updateEnrollment,
  deleteEnrollment,
  getEnrolledStudent,
} from "../controllers/enrollment.controller.js";
import {
  createEnrollmentValidator,
  updateEnrollmentValidator,
  validateEnrollment
} from "../middlewares/validation.middleware.js";
import authorizeMiddleware from "../middlewares/authorize.middleware.js"

const router = express.Router();

router.get("/:id/student", validateEnrollment, getEnrolledStudent);

router.get("/", getAllEnrollments);

router.get("/:id", getEnrollment);

router.post("/", createEnrollmentValidator, createEnrollment);

router.put("/:id", updateEnrollmentValidator, updateEnrollment);

router.delete("/:id", authorizeMiddleware('Admin'), deleteEnrollment);

export default router;


