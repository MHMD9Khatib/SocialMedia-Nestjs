import { Comments } from 'src/modules/comment/comment.model';
import { ROLES } from '../enums';

export type User = {
  user: {
    id: number;
    email: string;
    userName: string;
    // role: ROLES;
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
  // comments: Comments[];

};