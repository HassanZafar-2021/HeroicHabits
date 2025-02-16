import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const requiredEnvVars = ["DB_NAME", "DB_USER", "DB_PASSWORD"];
requiredEnvVars.forEach((varName) => {
  if (!process.env[varName]) {
    throw new Error(`Environment variable ${varName} is missing`);
  }
});

const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL, {
      dialect: "postgres",
      logging: process.env.NODE_ENV === "development",
    })
  : new Sequelize(
      process.env.DB_NAME!,
      process.env.DB_USER!,
      process.env.DB_PASSWORD!,
      {
        host: process.env.DB_HOST || "localhost",
        dialect: "postgres",
        logging: process.env.NODE_ENV === "development",
        define: { timestamps: false },
        pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
      }
    );

sequelize
  .authenticate()
  .then(() => console.log("Database connection established successfully"))
  .catch((err) => console.error("Unable to connect to the database:", err));

import { initUserModel } from "../models/User.js";
import { initQuestModel } from "../models/Quest.js";
import { initHabitModel } from "../models/habits.js";
import { initUserQuestModel } from "../models/userquest.js";

initUserModel(sequelize);
initQuestModel(sequelize);
initHabitModel(sequelize);
initUserQuestModel(sequelize);

sequelize
  .sync({ force: process.env.NODE_ENV === "development" })
  .then(() => console.log("Database synced successfully"))
  .catch((err) => console.error("Error syncing the database:", err));

export default sequelize;
