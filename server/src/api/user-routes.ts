import express from "express";
import type { Request, Response, NextFunction } from "express";
import { User } from "../models/index.js";
import bcrypt from "bcrypt";
import { body, validationResult } from "express-validator";

const router = express.Router();

// Middleware for handling async errors
const asyncHandler =
  (fn: Function) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);

// Validation rules for user creation
const userValidationRules = [
  body("username")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Username is required"),
  body("email").isEmail().normalizeEmail().withMessage("Invalid email format"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

// GET /users - Get all users
router.get(
  "/",
  asyncHandler(async (_req: Request, res: Response) => {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
    });
    res.json(users);
  })
);

// GET /users/:id - Get a user by ID
router.get(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  })
);

// POST /users - Create a new user
router.post(
  "/",
  userValidationRules,
  asyncHandler(async (req: Request, res: Response) => {
    // Run validation
    await Promise.all(userValidationRules.map((rule) => rule.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
    });
  })
);

// PUT /users/:id - Update a user by ID
router.put(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { username, password } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (username) user.username = username;
    if (password && password.length >= 6) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();
    res.json({ id: user.id, username: user.username, email: user.email });
  })
);

// DELETE /users/:id - Delete a user by ID
router.delete(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.destroy();
    res.json({ message: "User deleted" });
  })
);

// Export the router
export { router as userRouter };
