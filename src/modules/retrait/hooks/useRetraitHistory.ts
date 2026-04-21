import { useQuery } from "@tanstack/react-query";
import { getMyRetraits } from "../services/retrait.service";

export const useRetraitHistory = (page: number, limit: number) =>
  useQuery({
    queryKey: ["retraits-history", page, limit],
    queryFn: () => getMyRetraits(page, limit),
  });