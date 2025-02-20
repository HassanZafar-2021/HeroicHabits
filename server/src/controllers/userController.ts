import { Request, Response } from "express";
import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Define a request type for registering a user
interface RegisterUserRequest extends Request {
  body: {
    username: string;
    email: string;
    password: string;
  };
}

// Register a new user
export const registerUser = async (req: RegisterUserRequest, res: Response) => {
  try {
    const { username, email, password } = req.body;

    // ✅ Check if email is already registered
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use." });
    }

    // ✅ Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error registering user",
      error: (error as Error).message,
    });
  }
};

// Define a request type for logging in a user
interface LoginUserRequest extends Request {
  body: {
    username: string;
    password: string;
  };
}

const secretKey = process.env.JWT_SECRET_KEY || "your-secret-key";

// Login an existing user
export const loginUser = async (req: LoginUserRequest, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    console.log("User Found:", user);

    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    if (!secretKey) {
      return res.status(500).json({
        message: "Server error",
        error: "JWT secret key is not defined",
      });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      secretKey,
      { expiresIn: "1h" }
    );

    return res.json({ message: "Login successful", token });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Server error", error: (error as Error).message });
  }
};
