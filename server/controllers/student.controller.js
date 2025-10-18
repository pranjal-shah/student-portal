import { validationResult } from "express-validator";
// import Student from "../models/students.model.js";
import { Student, Enrollment, Course } from "../models/associations.js";

const getAllStudents = async (req, res, next) => {
  try {
    const students = await Student.findAll();
    res.status(200).json({
      success: true,
      message: "Get all students",
      student: students,
    });
  } catch (error) {
    next(error);
  }
};

const getStudentEnrollmentDates = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation Error");
      error.statusCode = 400;
      error.errors = errors.array();
      return next(error);
    }
    const { id } = req.params;
    const student = await Student.findByPk(id);
    const enrollments = await Enrollment.findAll({
      where: { studentId: id },
      include: [
        {
          model: Course,
          attributes: ["courseName", "instructor", "credits"],
        },
      ],
      attributes: ["enrollmentDate"],
    });

    return res.status(200).json({
      student: {
        id: student.id,
        firstName: student.firstName,
        lastName: student.lastName,
      },
      enrollments:
        enrollments.length !== 0
          ? enrollments.map((e) => ({
              courseName: e.Course.courseName,
              instructor: e.Course.instructor,
              credits: e.Course.credits,
              enrollmentDate: e.enrollmentDate,
            }))
          : [],
    });
  } catch (error) {
    next(error);
  }
};

const getStudent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const student_id = Number(id);

    const student = await Student.findOne({ where: { id: student_id } });

    res.status(200).json({
      success: true,
      message: "Get student details",
      student: student,
    });
  } catch (error) {
    next(error);
  }
};

const createStudent = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation Error");
      error.statusCode = 400;
      error.errors = errors.array();
      return next(error);
    }
    const { firstName, lastName, dateOfBirth, address } = req.body;

    const student = await Student.create({
      firstName,
      lastName,
      dateOfBirth,
      address,
    });

    res.status(201).json({
      success: true,
      message: "Create new student",
      student: student,
    });
  } catch (error) {
    next(error);
  }
};

const updateStudent = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation Error");
      error.statusCode = 400;
      error.errors = errors.array();
      return next(error);
    }
    const { id } = req.params;

    const student = await Student.findByPk(id);
    if (student) {
      const updatedStudent = await student.update(req.body);
      res.status(200).json({
        success: true,
        message: "Update student",
        student: updatedStudent,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Update student",
        student: "No student exist with this id",
      });
    }
  } catch (error) {
    next(error);
  }
};

const deleteStudent = async (req, res, next) => {
  try {
    const { id } = req.params;

    const student = await Student.destroy({ where: { id: id } });

    res.status(200).json({
      success: true,
      message: "delete student",
      student: student,
    });
  } catch (error) {
    next(error);
  }
};

const getStudentCourses = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation Error");
      error.statusCode = 400;
      error.errors = errors.array();
      return next(error);
    }
    const { firstName } = req.query;
    const lowerFirstName = firstName.toLowerCase();
    const students = await Student.findAll({
      where: { firstName: lowerFirstName },
      attributes: ["id", "firstName", "lastName"],
      include: [
        {
          model: Enrollment,
          attributes: ["courseId", "enrollmentDate"],
          include: [
            {
              model: Course,
              attributes: ["courseName", "instructor", "credits"],
            },
          ],
        },
      ],
    });

    res.status(200).json({
      success: true,
      message: "Student courses fetched successfully",
      student: students,
    });
  } catch (error) {
    next(error);
  }
};

export {
  getAllStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
  getStudentCourses,
  getStudentEnrollmentDates,
};
