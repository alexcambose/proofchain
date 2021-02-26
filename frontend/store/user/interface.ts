export interface IUserData {
  name?: string;
  email?: string;
  accessToken?: string;
  profileImage?: string;
}
export interface IUser extends IUserData {
  loggedIn?: boolean;
}
