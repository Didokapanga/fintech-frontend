// src/app/store.ts

import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  id: string;
  user_name: string;
  role_name: string;

  // ✅ AJOUT
  agence_id?: string;
  agence_name?: string; // (optionnel mais recommandé)
};

type AuthState = {
  token: string | null;
  user: User | null;

  setAuth: (data: { token: string; user: User }) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,

      setAuth: ({ token, user }) => {
        set({ token, user });
      },

      logout: () => {
        set({ token: null, user: null });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);