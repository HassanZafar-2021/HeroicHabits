import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js"; // Assuming you have a User model
import bcrypt from "bcrypt";

// Define a custom payload interface with userId
interface CustomJwtPayload {
  userId: string;
}

// Augment Express Request interface to include 'user' property of type CustomJwtPayload
declare global {
  namespace Express {
    interface Request {
      user?: CustomJwtPayload;
    }
  }
}

// Middleware for token verification
export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }

  const token = authHeader.split(" ")[1]; // Extract the token from the header

  if (!token) {
    return res
      .status(401)
      .json({ message: "Token missing from authorization header" });
  }

  const secretKey = process.env.JWT_SECRET_KEY;

  if (!secretKey) {
    throw new Error("JWT_SECRET_KEY is not defined in environment variables");
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" }); // Forbidden if token verification fails
    }

    // Explicitly cast decoded token to CustomJwtPayload
    const payload = decoded as CustomJwtPayload;

    // Validate required properties
    if (!payload.userId) {
      return res.status(403).json({ message: "Invalid token payload" });
    }

    req.user = payload; // Attach the validated payload to the request object
    next(); // Proceed to the next middleware/route handler
  });
};

// Login handler
export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    // Find user by username
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id }, // Attach userId to token
      process.env.JWT_SECRET_KEY ?? "secretKey", // Fallback if not set in env
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};
