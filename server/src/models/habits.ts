import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  BelongsTo,
  PrimaryKey,
  AutoIncrement,
} from "sequelize-typescript";
import { User } from "./user";

@Table
export class Habit extends Model<Habit> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  user_id!: number;

  @BelongsTo(() => User)
  user!: User;

  @Column(DataType.STRING)
  habit_name!: string;

  @Column(DataType.TEXT)
  description?: string;

  @Column(DataType.STRING)
  frequency!: string; // e.g., Daily, Weekly

  @Column(DataType.INTEGER)
  progress!: number; // From 0 to 100%

  @Column(DataType.BOOLEAN)
  is_active!: boolean;

  @CreatedAt
  @Column(DataType.TIMESTAMP)
  created_at!: Date;

  @UpdatedAt
  @Column(DataType.TIMESTAMP)
  updated_at!: Date;
}
