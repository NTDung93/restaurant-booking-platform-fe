export interface User {
  userId: number;
  userName: string;
  fullName: string;
  email: string;
  phone: string;
  point: number;
  isFirstLogin: boolean;
  image: string;
  roleName: string;
}

export interface AccountSignIn {
  userNameOrEmailOrPhone: string;
  password: string;
}

export interface UserToken {
  accessToken: string;
  refreshToken: string;
}
