import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user";

// Register User
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.create({
      username,
      email,
      password: bcrypt.hashSync(password, 10),
    });
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to register user" });
  }
};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Failed to login" });
  }
};

export { registerUser, loginUser };
