const express = require("express");
const cors = require("cors");
const sequelize = require("./config/connection");
const userRoutes = require("./routes/api/userRoutes");
const habitRoutes = require("./routes/api/habitRoutes");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/habits", habitRoutes);

// Test Database Connection
sequelize
  .sync()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.log("Failed to connect to database:", error);
  });

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
