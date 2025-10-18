import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config.js";
import Student from "./students.model.js";
import Course from "./courses.model.js";

const Enrollment = sequelize.define("Enrollment", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  studentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Students",
      key: "id",
    },
  },
  courseId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Courses",
      key: "id",
    },
  },
  enrollmentDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

// Enrollment.belongsTo(Student, { foreignKey: "studentId" });
// Enrollment.belongsTo(Course, { foreignKey: "courseId" });

async function init() {
  await Enrollment.sync();
}

init();

export default Enrollment;
