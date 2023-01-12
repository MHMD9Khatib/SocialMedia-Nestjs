import {
  AutoIncrement,
  Column,
  DataType,
  DefaultScope,
  ForeignKey,
  Model,
  PrimaryKey,
  Scopes,
  Table,
} from 'sequelize-typescript';
import { Users } from '../user/user.model';

@DefaultScope({})
@Scopes({
  full: {
    // include user where disabled is false
    include: [
      {
        model: () => Users,
        where: { disabled: false },
      },
    ],
  },
})
@Table({
  tableName: 'Posts',
  timestamps: true,
  underscored: true,
  paranoid: true,
})
export class Posts extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @ForeignKey(() => Users)
  @Column(DataType.INTEGER)
  userId: number;

  @Column(DataType.STRING)
  title: string;

  @Column(DataType.STRING)
  description: string;

  @Column(DataType.DATE)
  createdAt: Date;

  @Column(DataType.DATE)
  updatedAt: Date;
}
