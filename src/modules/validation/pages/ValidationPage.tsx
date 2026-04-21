import Tabs from "../../../components/ui/Tab";
import ValidationCaisseTab from "../../transfert-client/components/ValidationCaisseTab";
import ValidationClientTab from "../../transfert-client/components/ValidationClientTab";


export default function ValidationPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">
        Validation des opérations
      </h1>

      <Tabs
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
        ]}
      />
    </div>
  );
}