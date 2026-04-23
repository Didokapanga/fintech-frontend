export type LoginDto = {
  user_name: string;
  password: string;
};

// src/modules/auth/types.ts

export type User = {
  id: string;
  user_name: string;
  email: string;
  phone: string;
  role_name: string;
  agence_name: string;
  ville: string;
  is_activated: boolean;
};

export type AuthResponse = {
  token: string;
  user: User;
};

