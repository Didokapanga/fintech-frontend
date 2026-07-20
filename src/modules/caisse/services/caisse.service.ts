// src/modules/caisse/services/caisse.service.ts

import { useAuthStore } from "../../../app/store";
import { api } from "../../../services/api";
import type { Caisse, CaisseReference } from "../types";

export interface CreateCaisseDto {
  agence_id: string;

  agent_id?: string;

  type: "AGENCE" | "AGENT";

  support:
    | "ESPECE"
    | "MOBILE_MONEY"
    | "BANQUE"
    | "IMF"
    | "SMF"
    | "AUTRE";

  prestataire?: string | null;

  devise_principale: string;
}

// ✅ GET ALL (intelligent selon permissions)
export const getCaisses = async (
  page = 1,
  limit = 10
) => {

  const user =
    useAuthStore.getState().user;

  const permissions =
    user?.permissions ?? [];

  /**
   * =====================================
   * GLOBAL
   * caisse.read
   * =====================================
   */
  if (
    permissions.includes(
      "caisse.read"
    )
  ) {

    const res =
      await api.get(
        `/caisses?page=${page}&limit=${limit}`
      );

    return {
      data: res.data?.data ?? [],

      meta: {
        total: res.data?.meta?.total ?? 0,
        page: res.data?.meta?.page ?? 1,
        limit: res.data?.meta?.limit ?? limit,
        totalPages: res.data?.meta?.totalPages ?? 1,
      },
    };
  }

  /**
   * =====================================
   * AGENCE
   * caisse.readByagence
   * =====================================
   */
  if (
    permissions.includes(
      "caisse.readByagence"
    ) &&
    user?.agence_id
  ) {

    const res =
      await api.get(
        `/caisses/agence/${user.agence_id}`
      );

    return {
      data: res.data?.data ?? [],

      meta: {
        total: res.data?.meta?.total ?? 0,
        page: res.data?.meta?.page ?? 1,
        limit: res.data?.meta?.limit ?? limit,
        totalPages: res.data?.meta?.totalPages ?? 1,
      },
    };
  }

  /**
   * =====================================
   * USER
   * caisse.readByuser
   * =====================================
   */
  if (
    permissions.includes(
      "caisse.readByuser"
    )
  ) {

    const res =
      await api.get(
        "/caisses/me"
      );

    const data =
      res.data?.data ?? [];

    return {

      data,

      meta: {
        total: data.length,
        page: 1,
        limit,
        totalPages: 1,
      },

    };
  }

  /**
   * =====================================
   * DEFAULT
   * =====================================
   */
  return {

    data: [],

    meta: {
      total: 0,
      page: 1,
      limit,
      totalPages: 0,
    },

  };
};

// ✅ GET ONE
export const getCaisse = async (
  id: string
): Promise<Caisse> => {

  const res =
    await api.get(
      `/caisses/${id}`
    );

  return res.data?.data;
};

// ✅ BY AGENCE
export const getCaissesByAgence = async (
  agenceId: string
) => {

  const res =
    await api.get(
      `/caisses/agence/${agenceId}`
    );

  return res.data?.data ?? [];
};

export async function getCaisseReferences() {

  const { data } =
    await api.get(
      "/caisses/references"
    );

  return data.data as CaisseReference[];
}

// ✅ CREATE
export const createCaisse = async (
  data: CreateCaisseDto
) => {

  return api.post(
    "/caisses",
    data
  );
};

// ✅ UPDATE
export const updateCaisse = async (
  id: string,
  data: CreateCaisseDto
) => {

  return api.put(
    `/caisses/${id}`,
    data
  );
};

// ✅ DELETE
export const deleteCaisse = async (
  id: string
) => {

  return api.delete(
    `/caisses/${id}`
  );
};

// ✅ OPEN
export const openCaisse = async (
  id: string
) => {

  return api.post(
    `/caisses/${id}/open`
  );
};

// ✅ CLOSE
export const closeCaisse = async (
  id: string
) => {

  return api.post(
    `/caisses/${id}/close`
  );
};