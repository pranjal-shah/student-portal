import dotenv from "dotenv";
dotenv.config();

import { Sequelize } from "sequelize";

const database = process.env.MYSQL_DATABASE;
const username = process.env.MYSQL_USERNAME;
const password = process.env.MYSQL_PASSWORD;
const host = process.env.MYSQL_HOST;
const dialect = process.env.MYSQL_DIALECT;

export const sequelize = new Sequelize(database, username, password, {
  host,
  dialect,
  logging: false,
});


async function dbConfig() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
}

export default dbConfig;
