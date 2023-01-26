import {
  Model,
  Table,
  Column,
  Scopes,
  DataType,
  PrimaryKey,
  AutoIncrement,
  Unique,
  DefaultScope,
} from 'sequelize-typescript';
import { ROLES } from 'src/common/enums';


@Table({
  tableName: 'Users',
  timestamps: true,
  underscored: true,
  paranoid: true,
})

@Scopes(() => {
  return {
    no_password: {
      attributes: {
        exclude: ['password'],
      },
    },
    basic: {
      attributes: {
        exclude: [
          'updatedAt',
          'createdAt',
          'updatedBy',
          'createdBy',
          'deletedAt',
        ],
      },
    },
  };
})

export class Users extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Unique
  @Column(DataType.STRING)
  email: string;

  @Unique
  @Column(DataType.STRING)
  userName: string;

  @Column(DataType.STRING)
  password: string;

  @Column(DataType.ENUM(ROLES.CONSULTANT, ROLES.PATIENT))
  role: ROLES;


}
