import {
  Table,
  Column,
  Model,
  ForeignKey,
  DataType,
} from "sequelize-typescript";
import { User } from "./user";
import { Quest } from "./Quest";

@Table
export class UserQuest extends Model<UserQuest> {
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  user_id!: number;

  @ForeignKey(() => Quest)
  @Column(DataType.INTEGER)
  quest_id!: number;
}
