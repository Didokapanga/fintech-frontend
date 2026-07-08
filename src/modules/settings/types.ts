
export type Permission = {
  id: string;

  code: string;

  permission_name: string;

  description?: string;

  created_at?: string;
};

export type Role = {
  id: string;

  role_name: string;

  is_activated: boolean;

  created_at: string;

  updated_at: string;
};

export type RolePermission = {
  id: string;
  permission_id: string;
  code: string;
  permission_name: string;
  description?: string;
};

export type AssignPermissionsDto = {
  role_id: string;

  permission_ids: string[];
};

export type RemoveRolePermissionDto = {
  roleId: string;
  permissionId: string;
};

export type TauxChange = {
  id: string;

  devise_source: string;

  devise_destination: string;

  taux_achat: string;

  taux_vente: string;

  is_activated: boolean;

  created_at: string;

  updated_at: string;
};

export type CreateTauxChangeDto = {
  devise_source: string;
  devise_destination: string;
  taux_achat: number;
  taux_vente: number;
};

export type UpdateTauxChangeDto = {
  taux_achat?: number;
  taux_vente?: number;
};

export type TauxChangeResponse = {
  data: TauxChange[];
};

export type TransfertTarif = {
  id: string;

  devise: string;

  montant_min: string;

  montant_max: string;

  frais: string;

  is_activated: boolean;

  created_at: string;

  updated_at: string;
};

export type CreateTransfertTarifDto = {
  devise: string;

  montant_min: number;

  montant_max: number;

  frais: number;
};

export type UpdateTransfertTarifDto = {
  montant_min?: number;

  montant_max?: number;

  frais?: number;
};