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