// ============================================================
// 📄 src/modules/receipt/services/retraitReceipt.service.ts
// ============================================================

import { api } from "../../../services/api";

export type RetraitReceiptResponse = {
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

    devise: string;

    beneficiaire: {
      nom_complet: string;

      telephone: string;

      piece: string;

      numero_piece: string;
    };

    statut: string;
  };
};

/**
 * ============================================================
 * 🔥 GET RETRAIT RECEIPT
 * ============================================================
 */
export const getRetraitReceipt =
  async (
    retraitId: string
  ): Promise<RetraitReceiptResponse> => {

    const res = await api.get(
      `/receipt/retrait/${retraitId}`
    );

    return res.data;
  };