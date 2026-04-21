export interface Client {
  id: string;
  name: string;
  first_name?: string;
  second_name?: string;
  phone: string;
  address?: string;
  commune?: string;
  quartier?: string;
  ville?: string;
}

export interface CreateClientDto {
  name: string;
  first_name?: string;
  second_name?: string;
  phone: string;
  address?: string;
  commune?: string;
  quartier?: string;
  ville?: string;
}