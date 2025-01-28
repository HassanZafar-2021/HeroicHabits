import { Sequelize, DataTypes, Model, Optional } from "sequelize";

// Define attributes
interface HabitAttributes {
  id: number;
  user_id: number;
  habit_name: string;
  description?: string;
  frequency: string; // e.g., Daily, Weekly
  progress: number; // 0 to 100%
  is_active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define optional fields for creation
type HabitCreationAttributes = Optional<
  HabitAttributes,
  "id" | "description" | "progress" | "is_active" | "createdAt" | "updatedAt"
>;

export class Habit
  extends Model<HabitAttributes, HabitCreationAttributes>
  implements HabitAttributes
{
  public id!: number;
  public user_id!: number;
  public habit_name!: string;
  public description?: string;
  public frequency!: string;
  public progress!: number;
  public is_active!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize the Habit model
export function initHabitModel(sequelize: Sequelize) {
  Habit.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users", // Table name for the referenced model
          key: "id",
        },
        onDelete: "CASCADE",
      },
      habit_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      frequency: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [["Daily", "Weekly", "Monthly"]], // Ensure valid frequency values
        },
      },
      progress: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
          max: 100, // Ensure progress stays within range
        },
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true, // Default to active
      },
    },
    {
      sequelize,
      modelName: "Habit",
      tableName: "habits",
      timestamps: true, // Automatically manages createdAt and updatedAt
      underscored: true, // Use snake_case column naming
    }
  );
}
