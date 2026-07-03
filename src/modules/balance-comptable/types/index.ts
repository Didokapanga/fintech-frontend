export type BalanceItem = {
  id: string;

  numero: string;

  libelle: string;

  type_compte: string;

  devise: string;

  total_debit: string;

  total_credit: string;

  solde: string;
};

export type BalanceSummary = {
  devise: string;

  total_debit: string;

  total_credit: string;
};

export type BalanceControl = {
  total_debit: number;

  total_credit: number;

  is_balanced: boolean;
};

export type BalanceFilters = {
  agence_id?: string;

  caisse_id?: string;

  devise?: string;

  type_compte?: string;

  date_from?: string;

  date_to?: string;
};

/************* */

// export type BalanceFilters = {
//   agence_id?: string;
//   caisse_id?: string;
//   devise?: string;
//   type_compte?: string;
//   date_from?: string;
//   date_to?: string;
// };

// export type BalanceItem = {
//   id: string;

//   numero: string;

//   libelle: string;

//   type_compte: string;

//   devise: string;

//   total_debit: number;

//   total_credit: number;

//   solde: number;
// };

// export type BalanceSummary = {
//   devise: string;

//   total_debit: number;

//   total_credit: number;
// };

// export type BalanceControl = {
//   total_debit: number;

//   total_credit: number;

//   is_balanced: boolean;
// };