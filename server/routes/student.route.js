import express from "express";
import {
  getAllStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
  getStudentCourses,
  getStudentEnrollmentDates,
} from "../controllers/student.controller.js";
import {
  createStudentValidator,
  updateStudentValidator,
  validateFirstname,
  validateStudent,
} from "../middlewares/validation.middleware.js";
import authorizeMiddleware from "../middlewares/authorize.middleware.js"

const router = express.Router();

router.get("/enrollments", validateFirstname, getStudentCourses);

router.get("/:id/enrollment-dates", validateStudent, getStudentEnrollmentDates);

router.get("/", getAllStudents);

router.get("/:id", getStudent);

router.post("/", createStudentValidator, createStudent);

router.put("/:id", updateStudentValidator, updateStudent);

router.delete("/:id", authorizeMiddleware('Admin'), deleteStudent);

export default router;
