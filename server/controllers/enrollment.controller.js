import { validationResult } from "express-validator";
import Enrollment from "../models/enrollments.model.js";
import Student from "../models/students.model.js";
import Course from "../models/courses.model.js";

const getEnrolledStudent = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation Error");
      error.statusCode = 400;
      error.errors = errors.array();
      return next(error);
    }

    const { id } = req.params;

    const enrollment = await Enrollment.findOne({
      where: { id: id },
      include: [
        {
          model: Student,
          attributes: ["firstName", "lastName", "dateOfBirth", "address"],
        },
      ],
      attributes: [],
    });

    res.status(200).json({
      success: true,
      message: "Get Enrolled student information",
      enrollment: enrollment,
    });
  } catch (error) {
    next(error);
  }
};

const getAllEnrollments = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const offset = (page - 1) * limit;

    // const enrollments = await Enrollment.findAll();

    const { count, rows: enrollments } = await Enrollment.findAndCountAll({
      limit,
      offset,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: Student,
          attributes: ["firstName"],
        },
        {
          model: Course,
          attributes: ["courseName"],
        },
      ],
    });

    res.status(200).json({
      success: true,
      message: "Get all enrollments",
      enrollment: enrollments,
      pagination: {
        totalItems: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        limit: limit,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getEnrollment = async (req, res, next) => {
  try {
    const { id } = req.params;
    // const enrollment_id = Number(id);

    const enrollment = await Enrollment.findOne({ where: { id: id } });

    res.status(200).json({
      success: true,
      message: "Get enrollment details",
      enrollment: enrollment,
    });
  } catch (error) {
    next(error);
  }
};

const createEnrollment = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation Error");
      error.statusCode = 400;
      error.errors = errors.array();
      return next(error);
    }
    const { studentId, courseId, enrollmentDate } = req.body;

    const enrollment = await Enrollment.create({
      studentId,
      courseId,
      enrollmentDate,
    });

    res.status(201).json({
      success: true,
      message: "Create new Enrollment",
      enrollment: enrollment,
    });
  } catch (error) {
    next(error);
  }
};

const updateEnrollment = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation Error");
      error.statusCode = 400;
      error.errors = errors.array();
      return next(error);
    }
    const { id } = req.params;

    const enrollment = await Enrollment.findByPk(id);
    if (enrollment) {
      const updatedEnrollment = await enrollment.update(req.body);
      res.status(200).json({
        success: true,
        message: "Update enrollment",
        enrollment: updatedEnrollment,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Update enrollment",
        enrollment: 0,
      });
    }
  } catch (error) {
    next(error);
  }
};

const deleteEnrollment = async (req, res, next) => {
  try {
    const { id } = req.params;

    const enrollment = await Enrollment.destroy({ where: { id: id } });

    res.status(200).json({
      success: true,
      message: "delete student",
      enrollment: enrollment,
    });
  } catch (error) {
    next(error);
  }
};

export {
  getAllEnrollments,
  getEnrollment,
  createEnrollment,
  updateEnrollment,
  deleteEnrollment,
  getEnrolledStudent,
};
