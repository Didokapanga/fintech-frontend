
import { api } from "../../../services/api";
import type {
  CreateTransfertInterAgenceDto,
  TransfertInterAgenceFilters,
  TransfertInterAgenceResponse,
} from "../types";

export async function getTransfertsInterAgence(
  page = 1,
  limit = 10,
  filters: TransfertInterAgenceFilters = {}
): Promise<TransfertInterAgenceResponse> {

  const params = new URLSearchParams();

  params.append("page", String(page));
  params.append("limit", String(limit));

  if (filters.devise) {
    params.append("devise", filters.devise);
  }

  if (filters.statut) {
    params.append("statut", filters.statut);
  }

  if (filters.date_operation) {
    params.append(
      "date_operation",
      filters.date_operation
    );
  }

  const { data } = await api.get(
    `/transferts-inter-agence?${params.toString()}`
  );

  return data;
}

export async function createTransfertInterAgence(
  payload: CreateTransfertInterAgenceDto
) {

  const { data } = await api.post(
    "/transferts-inter-agence",
    payload
  );

  return data;
}

export async function getTransfertInterAgenceById(
  id: string
) {

  const { data } = await api.get(
    `/transferts-inter-agence/${id}`
  );

  return data;
}