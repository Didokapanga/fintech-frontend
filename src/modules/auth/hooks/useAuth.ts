import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllUsers, getUsersByAgence, login } from "../services/auth.service";

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
  });
};

export const useUsersByAgence = (agenceId?: string) =>
  useQuery({
    queryKey: ["users", agenceId],
    queryFn: () => getUsersByAgence(agenceId!),
    enabled: !!agenceId,
  });
 
export const useUsers = () =>
  useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
    initialData: [],
  });  