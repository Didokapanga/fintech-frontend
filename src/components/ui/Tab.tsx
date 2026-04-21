import { useState, type ReactNode } from "react";

type TabItem = {
  label: string;
  value: string;
  content: ReactNode;
};

type Props = {
  tabs: TabItem[];
  defaultValue?: string;
};

export default function Tabs({ tabs, defaultValue }: Props) {
  const [active, setActive] = useState(
    defaultValue || tabs[0]?.value
  );

  return (
    <div className="space-y-4">
      {/* HEADER */}
      <div className="flex gap-2 border-b">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActive(tab.value)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition ${
              active === tab.value
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div>
        {tabs.find((t) => t.value === active)?.content}
      </div>
    </div>
  );
}