import {
  ChevronDown,
  ChevronRight,
} from "lucide-react";

import type {
  ReactNode,
} from "react";

type Props = {
  title: ReactNode;

  count: number;

  expanded: boolean;

  onToggle: () => void;
};

export default function GroupHeader({
  title,
  count,
  expanded,
  onToggle,
}: Props) {

  return (

    <button
      type="button"
      onClick={onToggle}
      className="
        flex
        w-full
        items-center
        justify-between
        border-b
        border-slate-200
        bg-slate-50
        px-6
        py-4
        transition-colors
        hover:bg-slate-100
      "
    >

      <div
        className="
          flex
          items-center
          gap-3
        "
      >

        {expanded ? (

          <ChevronDown
            size={18}
            className="text-slate-500"
          />

        ) : (

          <ChevronRight
            size={18}
            className="text-slate-500"
          />

        )}

        <div
          className="
            text-left
          "
        >
          {title}
        </div>

      </div>

      <span
        className="
          rounded-full
          bg-slate-200
          px-3
          py-1
          text-xs
          font-semibold
          text-slate-600
        "
      >
        {count}
      </span>

    </button>

  );

}