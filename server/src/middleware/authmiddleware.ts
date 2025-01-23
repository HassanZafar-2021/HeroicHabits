// authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload as JwtTokenPayload } from "jsonwebtoken";

// Define a custom JwtPayload interface that extends from the one in 'jsonwebtoken'
interface JwtPayload extends JwtTokenPayload {
  userId: string; // Add the 'userId' property
}

// Augment Express Request interface to include 'user' property of type JwtPayload
declare module "express-serve-static-core" {
  interface Request {
    // user?: JwtPayload; // Attach custom JwtPayload here
  }
}

// Middleware for token verification
export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1]; // Extract the token from the header

    const secretKey = process.env.JWT_SECRET_KEY || ""; // Ensure you have a fallback value for the secret key

    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.sendStatus(403); // Forbidden if token verification fails
      }

      // Explicitly cast the 'user' object to the extended JwtPayload type
      req.user = user as JwtPayload; // Attach the custom user to the request object

      return next(); // Proceed to the next middleware/route handler
    });
  } else {
    res.sendStatus(401); // Unauthorized if no token is provided
  }
};
