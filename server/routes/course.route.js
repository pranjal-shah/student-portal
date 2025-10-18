import express from "express";
import {
  getAllCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/course.controller.js";
import {
  createCourseValidator,
  updateCourseValidator,
} from "../middlewares/validation.middleware.js";
import authorizeMiddleware from "../middlewares/authorize.middleware.js"

const router = express.Router();

router.get("/", getAllCourses);

router.get("/:id", getCourse);

router.post("/", createCourseValidator, createCourse);

router.put("/:id", updateCourseValidator, updateCourse);

router.delete("/:id", authorizeMiddleware('Admin'), deleteCourse);

export default router;
