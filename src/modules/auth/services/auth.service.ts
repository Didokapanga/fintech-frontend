// src/modules/auth/services/user.service.ts
import { api } from "../../../services/api";
import type { LoginDto, AuthResponse } from "../types";

export type User = {
  id: string;
  user_name: string;
};

export const login = async (data: LoginDto): Promise<AuthResponse> => {
  const response = await api.post<{
    success: boolean;
    message: string;
    data: AuthResponse;
  }>("/auth/login", data);

  console.log("🔥 LOGIN RESPONSE:", response.data);

  return response.data.data;
};

export const getUsersByAgence = async (agenceId: string): Promise<User[]> => {
  const res = await api.get(`/auth/agence/${agenceId}`);
  return res.data.data ?? res.data;
};

export const getAllUsers = async (): Promise<User[]> => {
  const res = await api.get("/auth");

  console.log("🔥 ALL USERS:", res.data);

  return res.data?.data ?? [];
};