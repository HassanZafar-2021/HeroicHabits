import { Sequelize } from "sequelize";

// It's good practice to ensure all environment variables are loaded correctly
const sequelize = new Sequelize(
  process.env.DB_NAME || "heroic_habits", // Default DB name
  process.env.DB_USER || "postgres", // Default user
  process.env.DB_PASSWORD || "Luigi3301", // Default password (use environment variables in production!)
  {
    host: process.env.DB_HOST || "localhost", // Host address, default to localhost
    dialect: "postgres", // Database dialect (PostgreSQL in your case)
    logging: process.env.NODE_ENV === "development", // Enable logging only in development
    define: {
      timestamps: false, // Disable timestamps by default (you can modify this per model)
    },
    // If you're in production, you may want to configure pool settings and SSL options
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

// Try to authenticate and log success/failure
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

export default sequelize;
