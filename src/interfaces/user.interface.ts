export interface IUser {
  username: string;
  email: string;
  password: string;
  position?: string;
  reset_token?: string | null;
}
