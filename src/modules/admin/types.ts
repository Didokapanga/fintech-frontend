export type DashboardResponse = {
  transfert_client: {
    volumes: Record<string, number>;
    total_count: number;
  };

  retrait: {
    volumes: Record<string, number>;
    total_count: number;
  };

  transfert_en_attente_validation: {
    volumes: Record<string, number>;
    total_count: number;
  };

  retrait_en_attente_validation: {
    volumes: Record<string, number>;
    total_count: number;
  };

  frais_transfert_client: {
    volumes: Record<string, number>;
    total_count: number;
  };

  volume_caisses: Record<string, number>;

  nombre_caisses_par_devise: Record<string, number>;

  total_caisses_ouvertes: number;

  total_caisses_fermees: number;

  total_agence_caisse: number;

  total_agent_caisse: number;
};