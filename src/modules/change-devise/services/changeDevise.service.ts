// src/modules/change-devise/services/changeDevise.service.ts

import { api } from "../../../services/api";

import type {
  ChangeDevise,
  ChangeDeviseResponse,
  CreateChangeDeviseDto,
} from "../types";

/* ===================================================== */
/* CREATE */
/* ===================================================== */

export const createChangeDevise =
  async (
    data: CreateChangeDeviseDto
  ): Promise<ChangeDevise> => {

    const response =
      await api.post(
        "/change-devise",
        data
      );

    return response.data.data;
  };

/* ===================================================== */
/* LIST */
/* ===================================================== */

export const getChanges =
  async (
    page = 1,
    limit = 20
  ): Promise<ChangeDeviseResponse> => {

    const response =
      await api.get(
        "/change-devise",
        {
          params: {
            page,
            limit,
          },
        }
      );

    return response.data;
  };

/* ===================================================== */
/* DETAIL */
/* ===================================================== */

export const getChangeById =
  async (
    id: string
  ): Promise<ChangeDevise> => {

    const response =
      await api.get(
        `/change-devise/${id}`
      );

    return response.data.data;
  };

/* ===================================================== */
/* MES OPERATIONS */
/* ===================================================== */

export const getMyChanges =
  async (
    page = 1,
    limit = 20
  ): Promise<ChangeDeviseResponse> => {

    const response =
      await api.get(
        "/change-devise/agent/me",
        {
          params: {
            page,
            limit,
          },
        }
      );

    return response.data;
  };

/* ===================================================== */
/* MON AGENCE */
/* ===================================================== */

export const getAgencyChanges =
  async (
    page = 1,
    limit = 20
  ): Promise<ChangeDeviseResponse> => {

    const response =
      await api.get(
        "/change-devise/agence/me",
        {
          params: {
            page,
            limit,
          },
        }
      );

    return response.data;
  };