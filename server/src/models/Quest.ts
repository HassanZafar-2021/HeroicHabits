import { DataTypes, Model } from "sequelize";
import { sequelize } from "./config"; // Assuming you have a sequelize instance
import User from "./user"; // Import User model

class Quest extends Model {
  public id!: number;
  public userId!: number;
  public questName!: string;
  public description!: string;
  public isCompleted!: boolean;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Quest.init(
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
    questName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    isCompleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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
    modelName: "Quest",
    tableName: "quests",
    timestamps: true,
  }
);

Quest.belongsTo(User, { foreignKey: "userId" }); // Define the foreign key relationship with User

export default Quest;
