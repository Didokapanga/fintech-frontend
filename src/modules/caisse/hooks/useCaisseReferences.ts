import { useQuery } from "@tanstack/react-query";
import { getCaisseReferences } from "../services/caisse.service";

export function useCaisseReferences() {
  return useQuery({
    queryKey: ["caisse-references"],
    queryFn: getCaisseReferences,
    staleTime: Infinity,
  });
}