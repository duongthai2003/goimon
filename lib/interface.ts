export interface userType {
  id: number;
  name: string;
  email: string;
}
export interface userRegisterType {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export interface userLoginType {
  email: string;
  password: string;
}
