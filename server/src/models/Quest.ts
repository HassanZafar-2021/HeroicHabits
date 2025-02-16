import { Sequelize, DataTypes, Model, Optional } from "sequelize";

// Define attributes
interface QuestAttributes {
  id: number;
  user_id: number;
  quest_name: string;
  description?: string;
  progress: number;
  is_completed: boolean;
  created_at?: Date;
  updated_at?: Date;
}

// Define optional fields for creation
type QuestCreationAttributes = Optional<
  QuestAttributes,
  | "id"
  | "description"
  | "created_at"
  | "updated_at"
  | "is_completed"
  | "progress"
>;

export class Quest
  extends Model<QuestAttributes, QuestCreationAttributes>
  implements QuestAttributes
{
  public id!: number;
  public user_id!: number;
  public quest_name!: string;
  public description?: string;
  public progress!: number;
  public is_completed!: boolean;
  public created_at!: Date;
  public updated_at!: Date;
}

// Initialize the Quest model
export function initQuestModel(sequelize: Sequelize) {
  Quest.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // references: {
        //   model: "users", // Table name for the referenced model
        //   key: "id",
        // },
        // onDelete: "CASCADE", // Ensure cascading deletes if a user is removed
      },
      quest_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      progress: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      is_completed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false, 
      },
    },
    {
      sequelize,
      modelName: "Quest",
      tableName: "quests",
      timestamps: true, 
      underscored: true, 
    }
  );
}
