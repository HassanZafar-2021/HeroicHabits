import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Define a custom payload interface with userId
interface CustomJwtPayload {
  userId: string;
}

// Augment Express Request interface to include 'user' property of type CustomJwtPayload
declare global {
  namespace Express {
    interface Request {
      user?: CustomJwtPayload; // Attach custom payload type
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
