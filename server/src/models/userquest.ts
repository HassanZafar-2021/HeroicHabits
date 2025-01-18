import { DataTypes, Model } from "sequelize";
import { sequelize } from "./config"; // Assuming you have a sequelize instance
import User from "./user"; // Import User model
import Quest from "./Quest"; // Import Quest model

class UserQuest extends Model {
  public userId!: number;
  public questId!: number;
}

UserQuest.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    questId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Quest,
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "UserQuest",
    tableName: "user_quests",
    timestamps: false, // No need for timestamps here
  }
);

User.belongsToMany(Quest, { through: UserQuest, foreignKey: "userId" });
Quest.belongsToMany(User, { through: UserQuest, foreignKey: "questId" });

export default UserQuest;
