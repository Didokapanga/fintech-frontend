// src/modules/retrait/pages/RetraitPage.tsx
import RetraitPendingTab from "../components/RetraitPendingTab";
import RetraitHistoryTab from "../components/RetraitHistoryTab";
import Tabs from "../../../components/ui/Tab";

export default function RetraitPage() {
  return (
    <div className="p-6">
      <Tabs
        defaultValue="pending"
        tabs={[
          {
            label: "Retraits en attente",
            value: "pending", // ✅ OBLIGATOIRE
            content: <RetraitPendingTab />,
          },
          {
            label: "Historique",
            value: "history", // ✅ OBLIGATOIRE
            content: <RetraitHistoryTab />,
          },
        ]}
      />
    </div>
  );
}