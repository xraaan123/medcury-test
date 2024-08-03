export interface User {
  id: number;
  username: string;
  password?: string;
  token?: string;
}

export const users: User[] = [];
