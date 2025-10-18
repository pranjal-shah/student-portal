import { body, query, param } from "express-validator";
import User from "../models/users.model.js";
import Course from "../models/courses.model.js";
import Student from "../models/students.model.js";
import bcrypt from "bcryptjs";
import Enrollment from "../models/enrollments.model.js";

export const registerValidator = [
  body("name").trim().notEmpty().withMessage("Name is required"),

  body("email")
    .isEmail()
    .withMessage("Valid email is required")
    .custom(async (email) => {
      const existing = await User.findOne({ where: { email } });
      if (existing) {
        throw new Error("Email already in use");
      }
      return true;
    }),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  body("role")
    .optional()
    .isIn(["User", "Admin"])
    .withMessage("Assigned Role is Invalid"),
];

export const loginValidator = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Valid email is required"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .custom(async (password, { req }) => {
      const { email } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw new Error("Invalid email or password");
      }
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new Error("Invalid email or password");
      }
      return true;
    }),
];

export const createStudentValidator = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("First name is required")
    .isLength({ min: 1, max: 100 })
    .withMessage("First name must be 1-100 characters"),

  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("Last name is required")
    .isLength({ min: 1, max: 100 })
    .withMessage("Last name must be 1-100 characters"),

  body("dateOfBirth")
    .notEmpty()
    .withMessage("Date of birth is required")
    .isISO8601()
    .withMessage("Date of birth must be a valid date (ISO8601)")
    .custom((dateOfBirth) => {
      const dob = new Date(dateOfBirth);
      const today = new Date();
      dob.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);
      if (dob > today) {
        throw new Error("Date of birth cannot be in the future");
      }
      return true;
    }),

  body("address")
    .optional()
    .trim()
    .isLength({ max: 255 })
    .withMessage("Address must be at most 255 characters"),
];

export const updateStudentValidator = [
  body("firstName")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("First name cannot be empty")
    .isLength({ max: 100 })
    .withMessage("First name must be at most 100 characters"),

  body("lastName")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Last name cannot be empty")
    .isLength({ max: 100 })
    .withMessage("Last name must be at most 100 characters"),

  body("dateOfBirth")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Date of birth cannot be empty")
    .isISO8601()
    .withMessage("Date of birth must be a valid ISO8601 date")
    .custom((dateOfBirth) => {
      const dob = new Date(dateOfBirth);
      const today = new Date();
      dob.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);
      if (dob > today) {
        throw new Error("Date of birth cannot be in the future");
      }
      return true;
    }),

  body("address")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Address cannot be empty")
    .isLength({ max: 255 })
    .withMessage("Address must be at most 255 characters"),
];

export const createCourseValidator = [
  body("courseName")
    .trim()
    .notEmpty()
    .withMessage("Course name is required")
    .isLength({ min: 1, max: 150 })
    .withMessage("First name must be 1-150 characters"),

  body("instructor")
    .trim()
    .notEmpty()
    .withMessage("Instructor is required")
    .isString()
    .withMessage("Only String value is allowed"),

  body("credits")
    .notEmpty()
    .withMessage("Credits are required")
    .isInt({ min: 0 })
    .withMessage("Credits must be an integer >= 0"),
];

export const updateCourseValidator = [
  body("courseName")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Course name is required")
    .isLength({ min: 1, max: 150 })
    .withMessage("First name must be 1-150 characters"),

  body("instructor")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Instructor is required")
    .isString()
    .withMessage("Only String value is allowed"),

  body("credits")
    .optional()
    .notEmpty()
    .withMessage("Credits are required")
    .isInt({ min: 0 })
    .withMessage("Credits must be an integer >= 0"),
];

export const createEnrollmentValidator = [
  body("studentId")
    .notEmpty()
    .withMessage("studentId is required")
    .isInt()
    .withMessage("studentId can only be Integer")
    .custom(async (studentId) => {
      const student = await Student.findByPk(studentId);
      if (!student) {
        throw new Error("Student with the given ID does not exist");
      }
      return true;
    }),

  body("courseId")
    .notEmpty()
    .withMessage("courseId is required")
    .isInt()
    .withMessage("courseId can only be Integer")
    .custom(async (courseId) => {
      const course = await Course.findByPk(courseId);
      if (!course) {
        throw new Error("Course with the given ID does not exist");
      }
      return true;
    }),

  body("enrollmentDate")
    .notEmpty()
    .withMessage("Enrollment date is required")
    .isISO8601()
    .withMessage("Enrollment date must be a valid date (ISO8601)")
    .custom((enrollmentDate) => {
      const dob = new Date(enrollmentDate);
      const today = new Date();
      dob.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);
      if (dob > today) {
        throw new Error("Enrollment date cannot be in the future");
      }
      return true;
    }),
];

export const updateEnrollmentValidator = [
  body("studentId")
    .optional()
    .notEmpty()
    .withMessage("studentId is required")
    .isInt()
    .withMessage("studentId can only be Integer")
    .custom(async (studentId) => {
      const student = await Student.findByPk(studentId);
      if (!student) {
        throw new Error("Student with the given ID does not exist");
      }
      return true;
    }),

  body("courseId")
    .optional()
    .notEmpty()
    .withMessage("courseId is required")
    .isInt()
    .withMessage("courseId can only be Integer")
    .custom(async (courseId) => {
      const course = await Course.findByPk(courseId);
      if (!course) {
        throw new Error("Course with the given ID does not exist");
      }
      return true;
    }),

  ,
  body("enrollmentDate")
    .optional()
    .notEmpty()
    .withMessage("Enrollment date is required")
    .isISO8601()
    .withMessage("Enrollment date must be a valid date (ISO8601)")
    .custom((enrollmentDate) => {
      const dob = new Date(enrollmentDate);
      const today = new Date();
      dob.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);
      if (dob > today) {
        throw new Error("Enrollment date cannot be in the future");
      }
      return true;
    }),
];

export const validateFirstname = [
  query("firstName")
    .trim()
    .notEmpty()
    .withMessage("firstname is required")
    .isString()
    .withMessage("firstname must be a string")
    .isLength({ min: 2 })
    .withMessage("firstname must be at least 2 characters long"),
];

export const validateStudent = [
  param("id").custom(async (id) => {
    const student = await Student.findByPk(id);
    if (!student) {
      throw new Error("Student with the given ID does not exist");
    }
    return true;
  }),
];

export const validateEnrollment = [
  param("id").custom(async (id) => {
    const enrollment = await Enrollment.findByPk(id);
    if (!enrollment) {
      throw new Error("Enrollment with the given ID does not exist");
    }
    return true;
  }),
];
