import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUsersByAgence, login, registerUser } from "../services/auth.service";
import { api } from "../../../services/api";

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
 
export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await api.get("/auth");
      return res.data.data;
    },
  });
};  

export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registerUser,

    onSuccess: () => {
      // 🔥 REFRESH TABLE USERS
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};  