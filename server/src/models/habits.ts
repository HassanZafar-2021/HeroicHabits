import { Sequelize, DataTypes, Model, Optional } from "sequelize";

// Define attributes
interface HabitAttributes {
  id: number;
  user_id: number;
  habit_name: string;
  description?: string;
  frequency: string; 
  progress: number; 
  is_active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

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
          model: "users", 
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
          isIn: [["Daily", "Weekly", "Monthly"]], 
        },
      },
      progress: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
          max: 100, 
        },
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true, 
      },
    },
    {
      sequelize,
      modelName: "Habit",
      tableName: "habits",
      timestamps: true, 
      underscored: true, 
    }
  );
}
