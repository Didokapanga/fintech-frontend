export type LoginDto = {
  user_name: string;
  password: string;
};

export type User = {
  id: string;
  user_name: string;
  role_name: string;
  agence_id: string;
};

export type AuthResponse = {
  token: string;
  user: User;
};