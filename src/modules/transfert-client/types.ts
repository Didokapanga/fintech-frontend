// src/modules/transfert-client/types.ts

export type TypeCalculFrais =
  | "FORFAITAIRE"
  | "POURCENTAGE";

export type ModePaiement =
  | "ESPECE"
  | "MOBILE_MONEY"
  | "COMPTE_CLIENT"
  | "CARTE"
  | "CHEQUE";

export interface CreateTransfertClientDto {
  agence_dest: string;

  expediteur_id: string;

  destinataire_id: string;

  devise_source: "USD" | "CDF";

  devise_destination: "USD" | "CDF";

  montant_destination: number;

  type_calcul_frais: TypeCalculFrais;

  /**
   * Utilisé uniquement lorsque
   * type_calcul_frais === "POURCENTAGE"
   */
  pourcentage_frais?: number;

  mode_paiement: ModePaiement;

  /**
   * Null lorsque le mode de paiement
   * est ESPECE.
   */
  prestataire?: string | null;
}