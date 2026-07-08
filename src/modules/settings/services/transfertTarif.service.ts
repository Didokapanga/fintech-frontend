import { api } from "../../../services/api";
import type { CreateTransfertTarifDto, TransfertTarif, UpdateTransfertTarifDto } from "../types";

/* ====================================== */
/* GET ALL                                */
/* ====================================== */

export const getTransfertTarifs =
  async (
    devise?: string
  ): Promise<TransfertTarif[]> => {

    const res =
      await api.get(
        "/transfert-tarifs",
        {
          params: {
            devise:
              devise ||
              undefined,
          },
        }
      );

    return (
      res.data.data || []
    );
  };

/* ====================================== */
/* GET BY ID                              */
/* ====================================== */

export const getTransfertTarifById =
  async (
    id: string
  ): Promise<TransfertTarif> => {

    const res =
      await api.get(
        `/transfert-tarifs/${id}`
      );

    return res.data.data;
  };

/* ====================================== */
/* CREATE                                 */
/* ====================================== */

export const createTransfertTarif =
  async (
    data: CreateTransfertTarifDto
  ) => {

    const res =
      await api.post(
        "/transfert-tarifs",
        data
      );

    return res.data.data;
  };

/* ====================================== */
/* UPDATE                                 */
/* ====================================== */

export const updateTransfertTarif =
  async (
    id: string,
    data: UpdateTransfertTarifDto
  ) => {

    const res =
      await api.put(
        `/transfert-tarifs/${id}`,
        data
      );

    return res.data.data;
  };

/* ====================================== */
/* DESACTIVATE                            */
/* ====================================== */

export const deactivateTransfertTarif =
  async (
    id: string
  ) => {

    const res =
      await api.patch(
        `/transfert-tarifs/${id}/deactivate`
      );

    return res.data.data;
  };