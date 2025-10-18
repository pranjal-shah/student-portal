import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config.js";
import Enrollment from "./enrollments.model.js";

const Course = sequelize.define("Course", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  courseName: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  instructor: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  credits: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Course.hasMany(Enrollment, { foreignKey: "courseId" });

async function init() {
  await Course.sync();
}

init();

export default Course;
