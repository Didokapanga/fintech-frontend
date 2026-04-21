// modules/transfert-client/types.ts

export interface CreateTransfertDto {
  caisse_id: string;
  agence_exp: string;
  agence_dest: string;
  client_exp: string;
  client_dest: string;
  montant: number;
  devise: string;
  type_piece: string;
  numero_piece: string;
}