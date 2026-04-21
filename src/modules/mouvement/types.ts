export type TypeMouvement =
  | "APPROVISIONNEMENT"
  | "RETRAIT_SORTIE"
  | "TRANSFERT_SORTIE";

export interface CreateMouvementDto {
  caisse_id: string;
  montant: number;
  devise: string;
  type_mouvement: TypeMouvement;
}