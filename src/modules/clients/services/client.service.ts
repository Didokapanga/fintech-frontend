import { api } from "../../../services/api";
import type { CreateClientDto } from "../types";

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  limit: number;
}

export const getClients = async (params?: {
  search?: string;
  page?: number;
  limit?: number;
}) => {
  console.log("PARAMS ENVOYÉS:", params);

  const res = await api.get("/clients", { params });

  console.log("RESPONSE API:", res.data);

  return res.data.data ?? []; // ✅ FIX ICI
};

export const createClient = async (data: CreateClientDto) => {
  return api.post("/clients", data);
};

export const deleteClient = async (id: string) => {
  return api.delete(`/clients/${id}`);
};