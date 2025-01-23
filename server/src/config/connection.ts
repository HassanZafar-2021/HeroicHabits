import { Sequelize } from "sequelize-typescript";
import { User } from "../models/user";
import { Quest } from "../models/Quest";
import { Habit } from "../models/habits";
import { UserQuest } from "../models/userquest";

const sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  models: [User, Quest, Habit, UserQuest], // Add your models here
});

export { sequelize };
