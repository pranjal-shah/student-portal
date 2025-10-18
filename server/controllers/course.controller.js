import { validationResult } from "express-validator";
import Course from "../models/courses.model.js";

const getAllCourses = async (req, res, next) => {
  try {
    const courses = await Course.findAll();
    res.status(200).json({
      success: true,
      message: "Get all courses",
      course: courses,
    });
  } catch (error) {
    next(error);
  }
};

const getCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const course_id = Number(id);

    const course = await Course.findOne({ where: { id: course_id } });

    res.status(200).json({
      success: true,
      message: "Get course details",
      course: course,
    });
  } catch (error) {
    next(error);
  }
};

const createCourse = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation Error");
      error.statusCode = 400;
      error.errors = errors.array();
      return next(error);
    }
    const { courseName, instructor, credits } = req.body;

    const course = await Course.create({
      courseName,
      instructor,
      credits,
    });

    res.status(201).json({
      success: true,
      message: "Create new course",
      course: course,
    });
  } catch (error) {
    next(error);
  }
};

const updateCourse = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation Error");
      error.statusCode = 400;
      error.errors = errors.array();
      return next(error);
    }
    const { id } = req.params;

    const course = await Course.findByPk(id);
    if (course) {
      const updatedCourse = await course.update(req.body);
      res.status(200).json({
        success: true,
        message: "Update course",
        course: updatedCourse,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Update course",
        course: 0,
      });
    }
  } catch (error) {
    next(error);
  }
};

const deleteCourse = async (req, res, next) => {
  try {
    const { id } = req.params;

    const course = await Course.destroy({ where: { id: id } });

    res.status(200).json({
      success: true,
      message: "delete student",
      course: course,
    });
  } catch (error) {
    next(error);
  }
};

export { getAllCourses, getCourse, createCourse, updateCourse, deleteCourse };
