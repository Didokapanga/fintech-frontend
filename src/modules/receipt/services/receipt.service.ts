// ============================================================
// 📄 src/modules/receipt/services/receipt.service.ts
// ============================================================

import { api } from "../../../services/api";

export type ReceiptResponse = {
  success: boolean;

  message: string;

  data: {
    reference: string;

    date_operation: string;

    agence: string;

    ville: string;

    caisse: string;

    agent: string;

    montant: string;

    frais: string;

    total: number;

    devise: string;

    statut: string;

    expediteur: {
      nom_complet: string;

      telephone: string;

      piece: string;

      numero_piece: string;
    };

    destinataire: {
      nom_complet: string;

      telephone: string;

      piece: string;

      numero_piece: string;
    };
  };
};

export const getReceipt =
  async (
    transfertId: string
  ): Promise<
    ReceiptResponse
  > => {

    const response =
      await api.get(
        `/receipt/transfert/${transfertId}`
      );

    return response.data;
};