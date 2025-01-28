import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import { User } from "./User.js";
import { Quest } from "./Quest.js";

// Define attributes
interface UserQuestAttributes {
  user_id: number;
  quest_id: number;
}

// Define optional fields for creation
type UserQuestCreationAttributes = Optional<UserQuestAttributes, never>;

export class UserQuest
  extends Model<UserQuestAttributes, UserQuestCreationAttributes>
  implements UserQuestAttributes
{
  public user_id!: number;
  public quest_id!: number;
}

// Initialize the UserQuest model
export function initUserQuestModel(sequelize: Sequelize) {
  UserQuest.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: User, // Reference User model
          key: "id",
        },
        onDelete: "CASCADE", // Delete UserQuest entries when User is deleted
        onUpdate: "CASCADE", // Update UserQuest entries when User ID changes
      },
      quest_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Quest, // Reference Quest model
          key: "id",
        },
        onDelete: "CASCADE", // Delete UserQuest entries when Quest is deleted
        onUpdate: "CASCADE", // Update UserQuest entries when Quest ID changes
      },
    },
    {
      sequelize,
      modelName: "UserQuest",
      tableName: "user_quests",
      timestamps: false, // No timestamps for this model
      underscored: true, // Use snake_case column names
      indexes: [
        {
          unique: true,
          fields: ["user_id", "quest_id"], // Composite unique index to prevent duplicates
        },
      ],
    }
  );
}
