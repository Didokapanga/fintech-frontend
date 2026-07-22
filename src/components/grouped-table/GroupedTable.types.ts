// src/shared/components/grouped-table/GroupedTable.types.ts

import type { ReactNode } from "react";

export type Column<T> = {
  header: string;
  accessor: keyof T;
  render?: (
    value: T[keyof T],
    row: T
  ) => ReactNode;
};

export type Group<T> = {
  key: string;
  title: ReactNode;
  rows: T[];
};

export type GroupedTableProps<
  T extends {
    id: string;
  },
> = {
  data: T[];

  columns: Column<T>[];

  loading?: boolean;

  emptyTitle?: string;

  emptyDescription?: string;

  rowClassName?: (
    row: T
  ) => string;

  /**
   * Champ servant au regroupement
   *
   * Exemple :
   * code_agence
   * support
   * ville
   */
  groupBy:
    | keyof T
    | ((row: T) => string);

  /**
   * Titre affiché du groupe
   */
  groupTitle: (
    row: T
  ) => ReactNode;

  /**
   * Les groupes sont ouverts
   * par défaut ?
   */
  defaultExpanded?: boolean;
};