export type TypeMouvement =
  | "APPROVISIONNEMENT"
  | "REVERSEMENT"
  | "MOBILE_MONEY_ENTREE"
  | "MOBILE_MONEY_SORTIE"
  | "AJUSTEMENT";

export interface CreateMouvementDto {
  caisse_id: string;

  type_mouvement: TypeMouvement;

  source_type:
    | "SIEGE"
    | "BANQUE"
    | "AGENCE"
    | "MOBILE_MONEY"
    | "AUTRE";

  source_reference?: string;

  montant: number;

  devise: string;

  motif: string;

  numero_piece?: string;

  document_url?: string;

  ajustement_sens?:
    | "ENTREE"
    | "SORTIE";
}

export interface MouvementCaisse {
  id: string;

  caisse_id: string;

  type_mouvement: string;

  source_type: string;

  source_reference?: string | null;

  montant: string;

  devise: string;

  motif: string;

  numero_piece?: string | null;

  document_url?: string | null;

  statut: string;

  code_reference: string;

  created_by: string;

  date_operation: string;

  created_at: string;

  updated_at: string;

  destination_caisse_id?: string | null;

  code_caisse?: string;

  agence_id?: string;

  caisse_type?: string;
}