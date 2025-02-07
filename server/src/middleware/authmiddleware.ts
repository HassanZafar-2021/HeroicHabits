import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

// Define a custom interface for authenticated requests
interface AuthenticatedRequest extends Request {
  user?: { id: number; username: string };
}

// Middleware to authenticate JWT
export const authenticateToken = (
  req: AuthenticatedRequest, // Use the custom interface
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.sendStatus(401); // No token provided
  }

  const token = authHeader.split(" ")[1];
  const secretKey = process.env.JWT_SECRET_KEY || "";

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.sendStatus(403); // Invalid token
    }

    const payload = decoded as JwtPayload & { username: string };

    if (!payload.username) {
      return res.sendStatus(403);
    }

    // Assigning user with default id 0 (Modify logic to use real id)
    req.user = { id: 0, username: payload.username };
    next();
  });
};

export default authenticateToken;