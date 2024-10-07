export interface User {
  id: number;
  userName: string;
  fullName: string;
  email: string;
  phone: string;
  gender: string;
  status: string;
  point: number;
  image: string;
  roleName: string;
  firstLogin: boolean;
}

export interface AccountSignIn {
  userNameOrEmailOrPhone: string;
  password: string;
}

export interface AccountSignUp {
  username: string;
  email: string;
  password: string;
  fullName: string;
  phone: string;
  gender: string;
}

export interface UserToken {
  accessToken: string;
  refreshToken: string;
}
