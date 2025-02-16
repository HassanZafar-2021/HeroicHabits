import { Sequelize } from "sequelize";
import { initUserModel, User } from "./User.js";
import { initHabitModel, Habit } from "./habits.js";
import { initQuestModel, Quest } from "./Quest.js";
import { initUserQuestModel, UserQuest } from "./userquest.js";

// Initialize Sequelize
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: ":memory:", 
  logging: false, 
});

// Initialize models
initUserModel(sequelize);
initHabitModel(sequelize);
initQuestModel(sequelize);
initUserQuestModel(sequelize);

// Define associations
User.hasMany(Habit, { foreignKey: "user_id", as: "habits" });
Habit.belongsTo(User, { foreignKey: "user_id", as: "user" });

User.hasMany(Quest, { foreignKey: "user_id", as: "quests" });
Quest.belongsTo(User, { foreignKey: "user_id", as: "user" });

User.belongsToMany(Quest, {
  through: UserQuest,
  foreignKey: "user_id",
  as: "userQuests",
});
Quest.belongsToMany(User, {
  through: UserQuest,
  foreignKey: "quest_id",
  as: "questUsers",
});

// Sync database
async function syncDatabase() {
  await sequelize.sync({ force: true });
  console.log("Database synchronized");
}

syncDatabase();

export { sequelize, User, Habit, Quest, UserQuest };
