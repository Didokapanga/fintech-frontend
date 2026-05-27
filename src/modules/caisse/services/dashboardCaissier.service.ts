import { api } from "../../../services/api";

export type DashboardCaissierResponse = {
  transfert_client: {
    total_effectue: number;
  };

  retrait: {
    total_effectue: number;
  };

  en_attente: {
    total_en_attente: number;
  };
};

export type DashboardCaissierFilters = {
  devise?: string;
  date_from?: string;
  date_to?: string;
};

export async function getDashboardCaissier(
  filters?: DashboardCaissierFilters
) {
  const response = await api.get<{
    success: boolean;
    message: string;
    data: DashboardCaissierResponse;
  }>("/dashboard/caissier", {
    params: filters,
  });

  return response.data.data;
}