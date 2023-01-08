import { Comments } from 'src/modules/comment/comment.model';
import { ROLES } from '../enums';

export type User = {
  user: {
    id: number;
    email: string;
    userName: string;
  };
  token: string;
};

export type PostType = {
  post: {
    id: number;
    userId: number,
    title: string;
    description: string;
  };

};