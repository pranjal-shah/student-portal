import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config.js";
import Enrollment from "./enrollments.model.js";

const Student = sequelize.define("Student", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  dateOfBirth: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
});

// Student.hasMany(Enrollment, { foreignKey: "studentId" });

async function init() {
  await Student.sync();
}

init();

export default Student;
