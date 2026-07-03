import {
  useQuery,
} from "@tanstack/react-query";

import {
  getChanges,
} from "../services/changeDevise.service";

export const useChanges = (
  page = 1,
  limit = 20
) =>
  useQuery({
    queryKey: [
      "changes",
      page,
      limit,
    ],

    queryFn: () =>
      getChanges(
        page,
        limit
      ),
  });