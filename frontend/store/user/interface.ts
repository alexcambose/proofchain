import { EntityTypeEnum } from '@enums';

export interface IUserData {
  name?: string;
  email?: string;
  accessToken?: string;
  profileImage?: string;
  address?: string;
  hasEntity: boolean;
  entityType: EntityTypeEnum;
}
export interface IUser extends IUserData {
  loggedIn?: boolean;
}
