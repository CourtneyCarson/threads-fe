import { User } from './user.interface';

export interface Comment {
  text: string;
  parentId: Comment | null;
  user: User;
  _id: string;
}
