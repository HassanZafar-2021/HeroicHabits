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
export class Quest extends Model<Quest> {
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
  quest_name!: string;

  @Column(DataType.TEXT)
  description?: string;

  @Column(DataType.BOOLEAN)
  is_completed!: boolean;

  @CreatedAt
  @Column(DataType.TIMESTAMP)
  created_at!: Date;

  @UpdatedAt
  @Column(DataType.TIMESTAMP)
  updated_at!: Date;
}
