// ============================================================
// 📄 src/modules/receipt/hooks/useRetraitReceipt.ts
// ============================================================

import { useQuery } from "@tanstack/react-query";

import {
  getRetraitReceipt,
} from "../services/retraitReceipt.service";

export const useRetraitReceipt = (
  retraitId?: string
) =>
  useQuery({
    queryKey: [
      "retrait-receipt",
      retraitId,
    ],

    queryFn: () =>
      getRetraitReceipt(
        retraitId as string
      ),

    enabled: !!retraitId,
  });