// src/modules/ledger/services/ledger-export.service.ts

import { api } from "../../../services/api";

/**
 * =========================================
 * 🔍 FILTERS
 * =========================================
 */
export type LedgerExportFilters = {
  caisse_id?: string;

  type_operation?: string;

  sens?: string;

  date_from?: string;

  date_to?: string;
};

/**
 * =========================================
 * 📥 EXPORT LEDGER EXCEL
 * =========================================
 */
export const exportLedgerExcel = async (
  filters?: LedgerExportFilters
) => {

  /**
   * =========================================
   * 📡 API CALL
   * =========================================
   */
  const response = await api.get(
    "/ledger/export",
    {
      params: {
        ...filters,
      },

      /**
       * 🔥 IMPORTANT
       * blob sinon fichier corrompu
       */
      responseType: "blob",
    }
  );

  /**
   * =========================================
   * 📦 CREATE FILE
   * =========================================
   */
  const blob = new Blob(
    [response.data],
    {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    }
  );

  /**
   * =========================================
   * 📅 DATE FILE NAME
   * =========================================
   */
  const now = new Date();

  const formattedDate =
    `${now.getFullYear()}-${String(
      now.getMonth() + 1
    ).padStart(2, "0")}-${String(
      now.getDate()
    ).padStart(2, "0")}`;

  /**
   * =========================================
   * 🏷️ FILE NAME
   * =========================================
   */
  const fileName =
    filters?.caisse_id
      ? `ledger-caisse-${formattedDate}.xlsx`
      : `ledger-global-${formattedDate}.xlsx`;

  /**
   * =========================================
   * 🔗 TEMP URL
   * =========================================
   */
  const url =
    window.URL.createObjectURL(blob);

  /**
   * =========================================
   * ⬇️ DOWNLOAD
   * =========================================
   */
  const link =
    document.createElement("a");

  link.href = url;

  link.download = fileName;

  document.body.appendChild(link);

  link.click();

  /**
   * =========================================
   * 🧹 CLEANUP
   * =========================================
   */
  link.remove();

  window.URL.revokeObjectURL(url);

  return true;
};