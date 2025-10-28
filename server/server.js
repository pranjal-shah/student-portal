import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import dbConfig from "./config/db.config.js";
import studentRouter from "./routes/student.route.js";
import courseRouter from "./routes/course.route.js";
import enrollmentRouter from "./routes/enrollment.route.js";
import authRouter from "./routes/auth.route.js";
import loggerMiddleware from "./middlewares/logger.middleware.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import unknownRoutesMiddleware from "./middlewares/404.middleware.js";
import isAuthenticated from "./middlewares/auth.middleware.js";
import { Student, Course, Enrollment } from "./models/associations.js";

const app = express();

dotenv.config();

dbConfig();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(loggerMiddleware);

app.use("/api/search/students", isAuthenticated, studentRouter);
app.use("/api/students", isAuthenticated, studentRouter);
app.use("/api/courses", isAuthenticated, courseRouter);
app.use("/api/enrollments", isAuthenticated, enrollmentRouter);
app.use("/api/auth", authRouter);

app.use(unknownRoutesMiddleware);
app.use(errorMiddleware);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
