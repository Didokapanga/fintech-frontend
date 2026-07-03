// src/module/clients/types.ts
export interface Client {
  id: string;

  nom: string;
  postnom?: string;
  prenom?: string;

  telephone: string;

  sexe?: string;

  adresse?: string;
  commune?: string;
  quartier?: string;
  ville?: string;

  profession?: string;
  nationalite?: string;

  type_piece?: string;
  numero_piece?: string;

  date_expiration_piece?: string;

  is_activated?: boolean;
}

export interface CreateClientDto {
  nom: string;

  postnom?: string;
  prenom?: string;

  telephone: string;

  sexe?: string;

  adresse?: string;
  commune?: string;
  quartier?: string;
  ville?: string;

  profession?: string;
  nationalite?: string;

  type_piece?: string;
  numero_piece?: string;

  date_expiration_piece?: string;
}

export const getClientLabel = (
  client: Client
) =>
  [
    client.nom,
    client.postnom,
    client.prenom,
  ]
    .filter(Boolean)
    .join(" ") +
  (
    client.telephone
      ? ` - ${client.telephone}`
      : ""
  );