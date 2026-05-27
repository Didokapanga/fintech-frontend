// src/configs/roles.ts

/**
 * =========================================================
 * 🔥 ROUTES AUTORISÉES CAISSIER
 * =========================================================
 */
export const CAISSIER_ALLOWED_ROUTES = [

  /**
   * DASHBOARD
   */
  "/",

  /**
   * MODULES
   */
  "/transfert-client",
  "/retrait",
  "/validation",
  "/ledger",

  /**
   * RECEIPTS
   */
  "/receipt/transfert/:id",
  "/receipt/retrait/:id",
];