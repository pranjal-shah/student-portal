import Student from "../models/students.model.js";
import Course from "../models/courses.model.js";
import Enrollment from "../models/enrollments.model.js";

// A student can have many enrollments
Student.hasMany(Enrollment, { foreignKey: "studentId" });

// An enrollment belongs to one student
Enrollment.belongsTo(Student, { foreignKey: "studentId" });

// A course can have many enrollments
Course.hasMany(Enrollment, { foreignKey: "courseId" });

// An enrollment belongs to one course
Enrollment.belongsTo(Course, { foreignKey: "courseId" });

// Export them to make sure associations are registered
export { Student, Course, Enrollment };
