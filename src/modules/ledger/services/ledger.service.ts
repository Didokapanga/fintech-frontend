// src/modules/ledger/services/ledger.service.ts

import { useAuthStore } from "../../../app/store";
import { api } from "../../../services/api";

import type {
  Ledger,
  LedgerFilters,
} from "../types";

/* =========================================================
 * API TYPE
 * ========================================================= */

type LedgerApi = Omit<
  Ledger,
  "montant"
> & {
  montant: string;
};

export type PaginatedResponse<T> = {
  data: T[];

  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

/* =========================================================
 * NORMALIZE
 * ========================================================= */

const normalizeLedger = (
  raw: LedgerApi[]
): Ledger[] => {

  // console.log("LEDGER API", raw);

  return raw.map(
    (l) => ({

      ...l,

      montant: Number(
        l.montant
      ),

      montant_display:
        `${Number(
          l.montant
        ).toLocaleString()} ${l.devise}`,

      agence_display:
        l.agence_display ||
        l.agence?.display ||
        "",

      agent_operation:
        l.agent_operation ||
        l.agent?.user_name ||
        l.user_name ||
        "SYSTEME",

      expediteur:
        l.expediteur ?? null,

      destinataire:
        l.destinataire ?? null,
    })
  );
};

/* =========================================================
 * GET LEDGER
 * INTELLIGENT ROUTING
 * ========================================================= */

export const getLedger = async (
  page = 1,
  limit = 10,
  filters?: LedgerFilters
): Promise<
  PaginatedResponse<Ledger>
> => {

  const user =
  useAuthStore.getState().user;

  const permissions =
    user?.permissions ?? [];

  // console.log(
  //   "LEDGER USER",
  //   user
  // );

  // console.log(
  //   "LEDGER PERMISSIONS",
  //   permissions
  // );

  /**
   * =====================================
   * LEDGER GLOBAL
   * =====================================
   */
  if (
    permissions.includes(
      "ledger.readAll"
    )
  ) {

    const res =
      await api.get(
        "/ledger",
        {
          params: {
            page,
            limit,
            ...filters,
          },
        }
      );

    return {
      data:
        normalizeLedger(
          res.data.data
        ),

      meta:
        res.data.meta,
    };
  }

  /**
   * =====================================
   * LEDGER AGENCE
   * =====================================
   */
  if (
    permissions.includes(
      "ledger.readByAgence"
    )
  ) {

    if (
      !user?.agence_id
    ) {
      throw new Error(
        "Aucune agence associée à l'utilisateur"
      );
    }

    const res =
      await api.get(
        `/ledger/agence/${user.agence_id}`,
        {
          params: {
            page,
            limit,
            ...filters,
          },
        }
      );

    return {
      data:
        normalizeLedger(
          res.data.data
        ),

      meta:
        res.data.meta,
    };
  }

  /**
   * =====================================
   * MON LEDGER
   * =====================================
   */
  if (
    permissions.includes(
      "ledger.me"
    )
  ) {

    const res =
      await api.get(
        "/ledger/me",
        {
          params: {
            page,
            limit,
            ...filters,
          },
        }
      );

    return {
      data:
        normalizeLedger(
          res.data.data
        ),

      meta:
        res.data.meta,
    };
  }

  /**
   * =====================================
   * AUCUNE PERMISSION
   * =====================================
   */
  return {
    data: [],

    meta: {
      page: 1,
      limit,
      total: 0,
      totalPages: 0,
    },
  };
};