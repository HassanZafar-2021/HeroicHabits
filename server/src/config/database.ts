import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

// Validate environment variables
const requiredEnvVars = [
  "DB_NAME",
  "DB_USER",
  "DB_PASSWORD",
  "DB_HOST",
  "NODE_ENV",
];
requiredEnvVars.forEach((varName) => {
  if (!process.env[varName]) {
    throw new Error(`Environment variable ${varName} is missing`);
  }
});

// Log environment variables for debugging
console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);

// Initialize Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME!, // Use non-null assertion for required environment variables
  process.env.DB_USER!,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "postgres",
    logging: process.env.NODE_ENV === "development", // Enable logging in development
    define: {
      timestamps: false, // Disable timestamps globally
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

// Test database connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// Manually initialize models
import { initUserModel } from "../models/User";
import { initQuestModel } from "../models/Quest";
import { initHabitModel } from "../models/habits";
import { initUserQuestModel } from "../models/userquest";

initUserModel(sequelize);
initQuestModel(sequelize);
initHabitModel(sequelize);
initUserQuestModel(sequelize);

// Sync the database (force: true for development, false for production)
sequelize
  .sync({ force: process.env.NODE_ENV === "development" })
  .then(() => {
    console.log("Database synced!");
  })
  .catch((err) => {
    console.error("Error syncing the database:", err);
  });

export default sequelize;
