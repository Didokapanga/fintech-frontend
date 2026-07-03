// src/modules/ledger/hooks/useLedger.ts

import { useQuery } from "@tanstack/react-query";

import {
  getLedger,
} from "../services/ledger.service";

import type {
  LedgerFilters,
} from "../types";

export const useLedger = (
  page = 1,
  limit = 10,
  filters?: LedgerFilters
) =>
  useQuery({

    queryKey: [
      "ledger",
      page,
      limit,
      filters,
    ],

    queryFn: async () => {

      const result =
        await getLedger(
          page,
          limit,
          filters
        );

      // console.log(
      //   "LEDGER RESULT",
      //   result
      // );

      return result;
    },
  });
  
// export const useLedger = (
//   page = 1,
//   limit = 10,
//   filters?: LedgerFilters
// ) =>
//   useQuery({

//     queryKey: [
//       "ledger",
//       page,
//       limit,
//       filters,
//     ],

//     queryFn: () =>
//       getLedger(
//         page,
//         limit,
//         filters
//       ),
//   });