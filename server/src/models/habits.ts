import { DataTypes, Model } from "sequelize";
import { sequelize } from "./config"; // Assuming you have a sequelize instance
import User from "./user"; // Import User model

class Habit extends Model {
  public id!: number;
  public userId!: number;
  public habitName!: string;
  public description!: string;
  public frequency!: string;
  public progress!: number;
  public isActive!: boolean;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Habit.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    habitName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    frequency: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    progress: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Habit",
    tableName: "habits",
    timestamps: true,
  }
);

Habit.belongsTo(User, { foreignKey: "userId" }); // Define the foreign key relationship with User

export default Habit;
