// src/modules/validation/pages/ValidationPage.tsx
import Tabs from "../../../components/ui/Tab";
import ValidationCaisseTab from "../components/ValidationCaisseTab";
import ValidationClientTab from "../components/ValidationClientTab";
import ValidationClotureCaisseTab from "../components/ValidationClotureCaisseTab";
import ValidationRetraitTab from "../components/ValidationRetraitTab";

export default function ValidationPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">
        Validation des opérations
      </h1>

      <Tabs
        storageKey="validation_tabs"
        defaultValue="client"
        tabs={[
          {
            label: "Transfert client",
            value: "client",
            content: <ValidationClientTab />,
          },
          {
            label: "Transfert caisse",
            value: "caisse",
            content: <ValidationCaisseTab />,
          },
          {
            label: "Clôture caisse",
            value: "cloture",
            content: <ValidationClotureCaisseTab />,
          },
          {
            label: "Retrait",
            value: "retrait",
            content: <ValidationRetraitTab />,
          },
        ]}
      />
    </div>
  );
}