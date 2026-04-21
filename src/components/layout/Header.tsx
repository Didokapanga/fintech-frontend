import { useAuthStore } from "../../app/store";

export default function Header() {
  const logout = useAuthStore((s) => s.logout);

  return (
    <header className="h-16 border-b flex items-center justify-between px-6">
      <h1 className="text-lg font-semibold">Dashboard</h1>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-500">Admin</span>

        <button
          onClick={logout}
          className="text-sm text-red-500 hover:underline"
        >
          Déconnexion
        </button>
      </div>
    </header>
  );
}