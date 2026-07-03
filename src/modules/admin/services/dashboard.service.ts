// src/modules/admin/services/dashboard.service.ts

import { api } from "../../../services/api";

/* =======================================================
 * FILTERS
 * ======================================================= */

export type DashboardFilters = {
  date_from?: string;
  date_to?: string;
};

/* =======================================================
 * STATS
 * ======================================================= */

export type DashboardStat = {
  volumes: Record<string, number>;
  total_count: number;
};

/* =======================================================
 * RESPONSE
 * ======================================================= */

export type DashboardData = {
  transfert_client: DashboardStat;

  retrait: DashboardStat;

  transfert_en_attente_validation: DashboardStat;

  retrait_en_attente_validation: DashboardStat;

  frais_transfert_client: DashboardStat;

  volume_caisses: Record<
    string,
    number
  >;

  nombre_caisses_par_devise: Record<
    string,
    number
  >;

  total_caisses_ouvertes: number;

  total_caisses_fermees: number;

  total_agence_caisse: number;

  total_agent_caisse: number;
};

export type DashboardResponse = {
  success: boolean;
  message: string;
  data: DashboardData;
};

/* =======================================================
 * GET DASHBOARD
 * ======================================================= */

export const getDashboard = async (
  filters?: DashboardFilters
): Promise<DashboardResponse> => {

  const res = await api.get(
    "/dashboard",
    {
      params: {
        date_from:
          filters?.date_from ||
          undefined,

        date_to:
          filters?.date_to ||
          undefined,
      },
    }
  );

  return res.data;
};