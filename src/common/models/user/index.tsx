export interface User {
  id: number;
  avatar: string;
  name: string;
}

export interface AccountSignIn {
  username: string;
  password: string;
}

export interface UserToken {
  accessToken: string;
  refreshToken: string;
}
