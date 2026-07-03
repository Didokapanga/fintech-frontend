// src/constants/permissions.ts

export const PERMISSIONS = {
  // CAISSE
  CAISSE_READ: "caisse.read",
  CAISSE_READ_AGENCE: "caisse.readByagence",
  CAISSE_READ_USER: "caisse.readByuser",
  CAISSE_CREATE: "caisse.create",
  CAISSE_UPDATE: "caisse.update.ModDev",
  CAISSE_DELETE: "caisse.delete",

  CAISSE_OPEN: "caisse.open",
  CAISSE_OPEN_AGENCE: "caisse.openByAgence",
  CAISSE_OPEN_USER: "caisse.openByuser",

  CAISSE_CLOSE: "caisse.close",
  CAISSE_CLOSE_AGENCE: "caisse.closeByAgence",
  CAISSE_CLOSE_USER: "caisse.closeByuser",

  // MOUVEMENT DE CAISSE
  MOUVEMENT_CREATE: "mouvement.create",
  MOUVEMENT_CREATE_AGENCE: "mouvement.createByAgence",
  MOUVEMENT_READ: "mouvement.read",
  MOUVEMENT_READ_AGENCE:
    "mouvement.readByAgence",

  // TRANSFERT CAISSE
  TRANSFERT_CAISSE_READ: "transfert_caisse.read",
  TRANSFERT_CAISSE_ME: "transfert_caisse.me",
  TRANSFERT_CAISSE_CREATE: "transfert_caisse.create",
  TRANSFERT_CAISSE_CREATE_AGENCE: "transfert_caisse.createByAgence",

  // TRANSFERT CLIENT
  TRANSFERT_CLIENT_READ: "transfert_client.read",
  TRANSFERT_CLIENT_READ_AGENCE: "transfert_client.readByAgence",
  TRANSFERT_CLIENT_READ_ME: "transfert_client.readByUser",
  TRANSFERT_CLIENT_CREATE: "transfert_client.create",
  TRANSFERT_CLIENT_CREATE_AGENCE: "transfert_client.createByAgence",
  TRANSFERT_CLIENT_VALIDATE: "transfert_client.validate",

  // RETRAIT
  RETRAIT_CREATE: "retrait.create",
  RETRAIT_READ: "retrait.read",
  RETRAIT_READ_MINE: "retrait.read.mine",
  RETRAIT_READ_AGENCY: "retrait.read.agency",
  
} as const;