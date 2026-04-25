// src/modules/validation/services/validation.service.ts

import { api } from "../../../services/api";

/* =========================================
   🔹 TRANSFERT CLIENT TYPES
========================================= */

export type TransfertClient = {
  id: string;
  client_exp: string;
  client_dest: string;
  agence_exp: string;
  montant: number;
  devise: string;
  statut: string;

  exp_nom: string;
  exp_postnom: string;
  exp_phone: string;

  dest_nom: string;
  dest_postnom: string;
  dest_phone: string;

  created_at: string;
};

type TransfertClientApi = {
  id: string;
  client_exp: string;
  client_dest: string;
  agence_exp: string;
  montant: string;
  devise: string;
  statut: string;

  exp_nom?: string;
  exp_postnom?: string;
  exp_phone?: string;

  dest_nom?: string;
  dest_postnom?: string;
  dest_phone?: string;

  created_at: string;
};

/* =========================================
   🔹 CLOTURE CAISSE TYPES
========================================= */

export type ClotureCaisseValidation = {
  id: string;
  code_reference: string;

  code_caisse?: string;
  caisse_devise?: string;
  agence_libelle?: string;

  solde_systeme: number;
  solde_physique: number;
  ecart: number;
  devise: string;

  motif_ecart?: string;
  observation?: string;

  statut: string;
  date_operation: string;
  created_at: string;
};

type ClotureCaisseValidationApi = {
  id: string;
  code_reference: string;

  code_caisse?: string;
  caisse_devise?: string;
  agence_libelle?: string;

  solde_systeme: string | number;
  solde_physique: string | number;
  ecart: string | number;
  devise: string;

  motif_ecart?: string;
  observation?: string;

  statut: string;
  date_operation: string;
  created_at: string;
};

/* =========================================
   🔹 RETRAIT VALIDATION TYPES
========================================= */

export type RetraitValidation = {
  id: string;
  code_reference: string;
  numero_piece: string;
  montant: number;
  devise: string;
  statut: string;
  date_operation: string;
  created_at: string;

  expediteur?: {
    nom?: string;
    postnom?: string;
    prenom?: string;
    phone?: string;
  };

  destinataire?: {
    nom?: string;
    postnom?: string;
    prenom?: string;
    phone?: string;
  };
};

type RetraitValidationApi = {
  id: string;
  code_reference: string;
  numero_piece: string;
  montant: string | number;
  devise: string;
  statut: string;
  date_operation: string;
  created_at: string;

  expediteur?: {
    nom?: string;
    postnom?: string;
    prenom?: string;
    phone?: string;
  };

  destinataire?: {
    nom?: string;
    postnom?: string;
    prenom?: string;
    phone?: string;
  };
};

/* =========================================
   🔹 PAGINATED RESPONSE
========================================= */

export type PaginatedResponse<T> = {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

/* =========================================
   🔹 GET TRANSFERTS TO VALIDATE
========================================= */

export const getTransfertsToValidate = async (
  page = 1,
  limit = 10
): Promise<PaginatedResponse<TransfertClient>> => {
  const res = await api.get(
    "/transfert-client/validation",
    {
      params: {
        page,
        limit,
      },
    }
  );

  return {
    data: res.data.data.map(
      (t: TransfertClientApi) => ({
        ...t,
        montant: Number(t.montant),

        exp_nom: t.exp_nom ?? "",
        exp_postnom: t.exp_postnom ?? "",
        exp_phone: t.exp_phone ?? "",

        dest_nom: t.dest_nom ?? "",
        dest_postnom: t.dest_postnom ?? "",
        dest_phone: t.dest_phone ?? "",
      })
    ),

    meta: res.data.meta,
  };
};

/* =========================================
   🔹 GET CLOTURES TO VALIDATE
========================================= */

export const getCloturesToValidate = async (
  page = 1,
  limit = 10
): Promise<
  PaginatedResponse<ClotureCaisseValidation>
> => {
  const res = await api.get(
    "/clotures/validation",
    {
      params: {
        page,
        limit,
      },
    }
  );

  console.log(
    "🔥 CLOTURES:",
    res.data
  );

  return {
    data: res.data.data.map(
      (
        c: ClotureCaisseValidationApi
      ) => ({
        ...c,

        solde_systeme: Number(
          c.solde_systeme
        ),

        solde_physique: Number(
          c.solde_physique
        ),

        ecart: Number(
          c.ecart
        ),

        code_caisse:
          c.code_caisse ?? "-",

        caisse_devise:
          c.caisse_devise ??
          c.devise ??
          "-",
      })
    ),

    meta: res.data.meta,
  };
};

/* =========================================
   🔹 GET RETRAITS TO VALIDATE
========================================= */

export const getRetraitsToValidate = async (
  page = 1,
  limit = 10
): Promise<
  PaginatedResponse<RetraitValidation>
> => {
  const res = await api.get(
    "/retraits/validation",
    {
      params: {
        page,
        limit,
      },
    }
  );

  console.log(
    "🔥 RETRAITS VALIDATION:",
    res.data
  );

  return {
    data: res.data.data.map(
      (
        r: RetraitValidationApi
      ) => ({
        id: r.id,
        code_reference:
          r.code_reference,

        numero_piece:
          r.numero_piece,

        montant: Number(
          r.montant
        ),

        devise: r.devise,
        statut: r.statut,

        date_operation:
          r.date_operation,

        created_at:
          r.created_at,

        expediteur: r.expediteur
          ? {
              nom:
                r.expediteur
                  .nom ?? "",
              postnom:
                r.expediteur
                  .postnom ?? "",
              prenom:
                r.expediteur
                  .prenom ?? "",
              phone:
                r.expediteur
                  .phone ?? "",
            }
          : undefined,

        destinataire:
          r.destinataire
            ? {
                nom:
                  r.destinataire
                    .nom ?? "",
                postnom:
                  r.destinataire
                    .postnom ?? "",
                prenom:
                  r.destinataire
                    .prenom ?? "",
                phone:
                  r.destinataire
                    .phone ?? "",
              }
            : undefined,
      })
    ),

    meta: res.data.meta,
  };
};

/* =========================================
   🔹 VALIDATE GENERIC OPERATION
========================================= */

export const validateOperation = async (
  data: {
    operation_type: string;
    reference_id: string;
    decision:
      | "APPROUVE"
      | "REJETE";
    niveau: string;
    commentaire?: string;
  }
) => {
  const res = await api.post(
    "/validations",
    data
  );

  return res.data;
};

/* =========================================
   🔹 VALIDATE CLOTURE CAISSE
========================================= */

export const validateClotureCaisse = async (
  data: {
    cloture_id: string;
    decision:
      | "APPROUVE"
      | "REJETE";
  }
) => {
  const res = await api.post(
    "/clotures/validate",
    data
  );

  return res.data;
};