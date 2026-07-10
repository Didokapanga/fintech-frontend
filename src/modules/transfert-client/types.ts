// src/modules/transfert-client/types.ts

export interface CreateTransfertClientDto {
  caisse_id: string;
  agence_dest: string;

  expediteur_id: string;
  destinataire_id: string;

  devise_source: string;
  devise_destination: string;

  montant_destination: number;

  type_calcul_frais: "FORFAITAIRE" | "POURCENTAGE";
  pourcentage_frais?: number;

  mode_paiement:
    | "ESPECE"
    | "MOBILE_MONEY"
    | "COMPTE_CLIENT"
    | "CARTE"
    | "CHEQUE";
}