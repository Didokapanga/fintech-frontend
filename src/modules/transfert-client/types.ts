// src/modules/transfert-client/types.ts

export interface CreateTransfertClientDto {
  /**
   * Caisse agent qui effectue l'opération
   */
  caisse_id: string;

  /**
   * Agence bénéficiaire
   */
  agence_dest: string;

  /**
   * Client expéditeur
   */
  expediteur_id: string;

  /**
   * Client destinataire
   */
  destinataire_id: string;

  /**
   * Devise débitée de la caisse
   */
  devise_source: string;

  /**
   * Devise remise au bénéficiaire
   */
  devise_destination: string;

  /**
   * Montant reçu par le bénéficiaire
   */
  montant_destination: number;

  /**
   * Mode de paiement
   */
  mode_paiement:
    | "ESPECE"
    | "MOBILE_MONEY"
    | "COMPTE_CLIENT"
    | "CARTE"
    | "CHEQUE";
}