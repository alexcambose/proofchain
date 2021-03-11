export interface IUserData {
  name?: string;
  email?: string;
  accessToken?: string;
  profileImage?: string;
  address?: string;
  hasEntity: boolean;
}
export interface IUser extends IUserData {
  loggedIn?: boolean;
}
