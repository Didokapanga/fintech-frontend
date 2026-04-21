import { api } from "../../../services/api";
import type { CreateMouvementDto } from "../types";

export const createMouvement = async (data: CreateMouvementDto) => {
  const res = await api.post("/mouvements", data);

  return res.data;
};