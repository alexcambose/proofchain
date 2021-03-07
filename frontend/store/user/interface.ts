export interface IUserData {
  name?: string;
  email?: string;
  accessToken?: string;
  profileImage?: string;
  address?: string;
}
export interface IUser extends IUserData {
  loggedIn?: boolean;
}
