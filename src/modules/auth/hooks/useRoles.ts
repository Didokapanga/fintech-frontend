// src/modules/auth/hooks/useRoles.ts

import { useQuery } from "@tanstack/react-query";
import { api } from "../../../services/api";

export type Role = {
  id: string;
  role_name: string;
};

export const useRoles = () =>
  useQuery({
    queryKey: ["roles"],
    queryFn: async (): Promise<Role[]> => {
      const res = await api.get("/roles");
      return res.data.data;
    },
  });