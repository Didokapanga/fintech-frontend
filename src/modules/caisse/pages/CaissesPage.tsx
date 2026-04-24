// src/modules/caisse/pages/CaissesPage.tsx

import Tabs from "../../../components/ui/Tab";
import CaisseTab from "../components/CaisseTab";
import MouvementCaisseTab from "../components/MouvementCaisseTab";
import { useAuthStore } from "../../../app/store";

export default function CaissesPage() {
  const user = useAuthStore((s) => s.user);

  const isCaissier =
    user?.role_name?.toUpperCase() === "CAISSIER";

  // 🔥 si CAISSIER → uniquement caisse
  if (isCaissier) {
    return (
      <div className="space-y-4">
        <CaisseTab />
      </div>
    );
  }

  // 🔥 autres rôles → tabs complets
  return (
    <div className="space-y-4">
      <Tabs
        storageKey="caisses_tabs"
        defaultValue="caisses"
        tabs={[
          {
            label: "Caisses",
            value: "caisses",
            content: <CaisseTab />,
          },
          {
            label: "Mouvements de caisse",
            value: "mouvements",
            content: <MouvementCaisseTab />,
          },
        ]}
      />
    </div>
  );
}