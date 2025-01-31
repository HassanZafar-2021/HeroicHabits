import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

// Validate required environment variables
const requiredEnvVars = [
  "DB_NAME",
  "DB_USER",
  "DB_PASSWORD",
  // "DB_HOST", // Make sure DB_HOST is validated if it's necessary
  // "NODE_ENV", // Ensuring NODE_ENV is checked
];
requiredEnvVars.forEach((varName) => {
  if (!process.env[varName]) {
    throw new Error(`Environment variable ${varName} is missing`);
  }
});

// Initialize Sequelize instance
const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PASSWORD!,
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
    logging: process.env.NODE_ENV === "development", // Enable logging only in development
    define: {
      timestamps: false, // Disable automatic timestamps if not needed
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

// Test the database connection
sequelize
  .authenticate()
  .then(() => console.log("Database connection established successfully"))
  .catch((err) => console.error("Unable to connect to the database:", err));

// Import and initialize models
import { initUserModel } from "../models/User.js";
import { initQuestModel } from "../models/Quest.js";
import { initHabitModel } from "../models/habits.js";
import { initUserQuestModel } from "../models/userquest.js";

initUserModel(sequelize);
initQuestModel(sequelize);
initHabitModel(sequelize);
initUserQuestModel(sequelize);

// Sync database
sequelize
  .sync({ force: process.env.NODE_ENV === "development" }) // Sync only in development environment
  .then(() => console.log("Database synced successfully"))
  .catch((err) => console.error("Error syncing the database:", err));

export default sequelize;
