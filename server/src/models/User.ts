import { Sequelize, DataTypes, Model, Optional } from "sequelize";

// Define attributes
interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  avatar_url?: string;
  created_at?: Date;
  updated_at?: Date;
}

// Define optional fields for model creation
type UserCreationAttributes = Optional<
  UserAttributes,
  "id" | "avatar_url" | "created_at" | "updated_at"
>;

export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public avatar_url?: string;
  public created_at!: Date;
  public updated_at!: Date;
}

// Initialize the User model
export function initUserModel(sequelize: Sequelize) {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      avatar_url: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      timestamps: true, 
      underscored: true, 
    }
  );
}

export default User;
