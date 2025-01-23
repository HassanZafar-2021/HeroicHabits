import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

// Augment the Express Request interface to include `user`
declare module "express-serve-static-core" {
  interface Request {
    user?: JwtPayload;
  }
}

// Token verification middleware
export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Get token from Authorization header

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET || "secretKey", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    // Attach user info to the request object
    req.user = decoded as JwtPayload;
    next();
  });
};

// Example of an authenticated route
export const getUserProfile = (req: Request, res: Response) => {
  const user = req.user; // `user` comes from the `verifyToken` middleware
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({ message: "User profile", user });
};
