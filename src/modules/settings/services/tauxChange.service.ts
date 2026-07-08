import { api } from "../../../services/api";

import type {
  CreateTauxChangeDto,
  UpdateTauxChangeDto,
  TauxChange,
} from "../types";

// LISTE

export const getTauxChanges =
  async (): Promise<TauxChange[]> => {

    const res =
      await api.get(
        "/taux-echange"
      );

    return res.data.data;
  };

// DETAIL

export const getTauxChangeById =
  async (
    id: string
  ): Promise<TauxChange> => {

    const res =
      await api.get(
        `/taux-echange/${id}`
      );

    return res.data.data;
  };

// CREATE

export const createTauxChange =
  async (
    data: CreateTauxChangeDto
  ) => {

    const res =
      await api.post(
        "/taux-echange",
        data
      );

    return res.data.data;
  };

// UPDATE

export const updateTauxChange =
  async (
    id: string,
    data: UpdateTauxChangeDto
  ) => {

    const res =
      await api.put(
        `/taux-echange/${id}`,
        data
      );

    return res.data.data;
  };

// DESACTIVER

export const deactivateTauxChange =
  async (
    id: string
  ) => {

    const res =
      await api.patch(
        `/taux-echange/${id}/deactivate`
      );

    return res.data.data;
  };