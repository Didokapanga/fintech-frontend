// src/components/layout/Header.tsx

import { useAuthStore } from "../../app/store";

export default function Header() {
  const logout = useAuthStore((s) => s.logout);
  const user = useAuthStore((s) => s.user);

  const userName = user?.user_name || "Utilisateur";
  const role = user?.role_name || "USER";
  const agence = user?.agence_name || "—";
  const agenceCode = user?.code_agence || "—";

  const getRoleStyle = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "bg-purple-100 text-purple-700";
      case "CAISSIER":
        return "bg-blue-100 text-blue-700";
      case "N+1":
      case "N+2":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-6">

      {/* LEFT */}
      <div className="text-lg font-semibold text-gray-800">
       <span className="text-gray-400">
          • {agence} - {agenceCode}
        </span>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-6">

        {/* USER */}
        <div className="flex items-center gap-3">

          {/* Avatar */}
          <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold">
            {userName.charAt(0).toUpperCase()}
          </div>

          {/* Infos */}
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-medium text-gray-800">
              {userName}
            </span>

            <div className="flex items-center gap-2 text-xs">
              <span
                className={`px-2 py-0.5 rounded ${getRoleStyle(role)}`}
              >
                {role}
              </span>

              {/* <span className="text-gray-400">
                • {agence}
              </span> */}
            </div>
          </div>
        </div>

        {/* LOGOUT */}
        <button
          onClick={logout}
          className="text-sm text-red-500 hover:text-red-600 hover:underline transition"
        >
          Déconnexion
        </button>
      </div>
    </header>
  );
}