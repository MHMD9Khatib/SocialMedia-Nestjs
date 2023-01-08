import {
    Model,
    Table,
    Column,
    DataType,
    PrimaryKey,
    ForeignKey,
    AutoIncrement,
    DefaultScope,
  } from 'sequelize-typescript';
  
  import { Users } from '../user/user.model';
  import { Posts } from '../post/post.model';
  
  @DefaultScope({
    attributes: {
      exclude: ['deletedAt', 'deletedBy'],
    },
  })
  @Table({
    tableName: 'Comments',
    timestamps: true,
    underscored: true,
    paranoid: true,
  })
  export class Comments extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number;
  
    @ForeignKey(() => Users)
    @Column(DataType.INTEGER)
    userId: number;
  
    @ForeignKey(() => Posts)
    @Column(DataType.INTEGER)
    postId: number;
  
    @Column(DataType.STRING)
    title: string;
  
    @Column(DataType.STRING)
    description: string;
  
    @Column(DataType.DATE)
    createdAt: Date;
  
    @Column(DataType.DATE)
    updatedAt: Date;
  
    @Column(DataType.DATE)
    deletedAt: Date;
  

  }