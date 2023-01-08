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
  
  @DefaultScope({
    attributes: {
      exclude: ['deletedAt'],
    },
  })
  @Scopes({
    basic: {
      attributes: {
        exclude: ['deletedAt,password'],
      },
    },
  })
  @Table({
    tableName: 'Users',
    timestamps: true,
    underscored: true,
    paranoid: true,
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
 
  
  }
  