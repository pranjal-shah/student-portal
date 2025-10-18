import User from "../models/users.model.js";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

const register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation Error");
      error.statusCode = 400;
      error.errors = errors.array();
      return next(error);
    }

    const { name, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, password: hashedPassword });

    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res
      .status(201)
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
      })
      .json({
        success: true,
        message: "User registered successfully",
        user: { id: user.id, name: user.name, email: user.email },
      });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    console.log("in 1");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation Error");
      error.statusCode = 400;
      error.errors = errors.array();
      return next(error);
    }

    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
      })
      .json({
        success: true,
        message: "User LogedIn successfully",
        user: { id: user.id, name: user.name, email: user.email },
      });
  } catch (error) {
    next(error);
  }
};

export { register, login };
