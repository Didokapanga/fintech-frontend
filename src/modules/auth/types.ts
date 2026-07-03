// src/modules/auth/types.ts

export type LoginDto = {
  user_name: string;
  password: string;
};

export type User = {
  id: string;

  user_name: string;

  email: string;

  phone: string;

  role_name: string;

  agence_id: string;

  agence_name: string;

  code_agence?: string;

  ville: string;

  is_activated: boolean;

  permissions: string[];
};

export type AuthResponse = {
  token: string;
  user: User;
};

