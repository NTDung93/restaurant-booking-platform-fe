export interface User {
  id: number;
  avatar: string;
  name: string;
}

export interface UserToken {
  accessToken: string;
  refreshToken: string;
}
