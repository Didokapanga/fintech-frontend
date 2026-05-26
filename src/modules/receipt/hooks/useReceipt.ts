// ============================================================
// 📄 src/modules/receipt/hooks/useReceipt.ts
// ============================================================

import { useMutation }
from "@tanstack/react-query";

import {
  getReceipt,
} from "../services/receipt.service";

export function useReceipt() {

  return useMutation({
    mutationFn:
      getReceipt,
  });
}
