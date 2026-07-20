import { api } from "../../../services/api";

export type DashboardCaissierResponse = {

  caisses: {
    id: string;
    code_caisse: string;

    type:
      | "AGENCE"
      | "AGENT";

    state:
      | "OUVERTE"
      | "FERMEE"
      | "CLOTUREE";

    agence_id: string;
    agent_id: string | null;

    support: string;
    devise_principale: string;
    prestataire: string | null;

    devises: {
      id: string;
      devise: string;
      solde: number;
      is_activated: boolean;
    }[];
  }[];

  soldes: Record<string, number>;

  stats: {
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