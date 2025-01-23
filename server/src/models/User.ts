import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  PrimaryKey,
  AutoIncrement,
  Unique,
} from "sequelize-typescript";

@Table
export class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Unique
  @Column(DataType.STRING)
  username!: string;

  @Unique
  @Column(DataType.STRING)
  email!: string;

  @Column(DataType.STRING)
  password!: string;

  @Column(DataType.TEXT)
  avatar_url?: string;

  @CreatedAt
  @Column(DataType.TIMESTAMP)
  created_at!: Date;

  @UpdatedAt
  @Column(DataType.TIMESTAMP)
  updated_at!: Date;
}
