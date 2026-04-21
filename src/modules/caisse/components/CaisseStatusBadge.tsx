import type { CaisseState } from "../types";

export default function CaisseStatusBadge({ state }: { state: CaisseState }) {
  const styles = {
    OUVERTE: "bg-green-100 text-green-700",
    FERMEE: "bg-yellow-100 text-yellow-700",
    CLOTUREE: "bg-red-100 text-red-700",
  };

  return (
    <span className={`px-2 py-1 text-xs rounded ${styles[state]}`}>
      {state}
    </span>
  );
}