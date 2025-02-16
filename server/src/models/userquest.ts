import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import { User } from "./User.js";
import { Quest } from "./Quest.js";

// Define attributes
interface UserQuestAttributes {
  user_id: number;
  quest_id: number;
}


type UserQuestCreationAttributes = Optional<UserQuestAttributes, never>;

export class UserQuest
  extends Model<UserQuestAttributes, UserQuestCreationAttributes>
  implements UserQuestAttributes
{
  public user_id!: number;
  public quest_id!: number;
}


export function initUserQuestModel(sequelize: Sequelize) {
  UserQuest.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: User, 
          key: "id",
        },
        onDelete: "CASCADE", 
        onUpdate: "CASCADE", 
      },
      quest_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Quest, 
          key: "id",
        },
        onDelete: "CASCADE", 
        onUpdate: "CASCADE", 
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
