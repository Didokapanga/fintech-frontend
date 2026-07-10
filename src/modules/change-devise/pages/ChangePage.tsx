import {
  ArrowLeftRight,
} from "lucide-react";

import ChangeForm
from "../components/ChangeForm";

import ChangeHistoryTable
from "../components/ChangeHistoryTable";

export default function ChangePage() {

  return (

    <div
      className="
        space-y-6
      "
    >

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div
        className="
          flex
          items-center
          gap-3
        "
      >

        <div
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
            bg-blue-100
            text-blue-700
          "
        >

          <ArrowLeftRight
            size={24}
          />

        </div>

        <div>

          <h1
            className="
              text-2xl
              font-bold
              text-slate-900
            "
          >
            Bureau de change
          </h1>

        </div>

      </div>

      {/* ================================================= */}
      {/* CONTENT */}
      {/* ================================================= */}

      <div
        className="
          grid
          gap-6
          xl:grid-cols-[1fr_420px]
        "
      >

        {/* HISTORIQUE */}

        <div
          className="
            min-w-0
          "
        >

          <ChangeHistoryTable />

        </div>

        {/* FORMULAIRE */}

        <div
          className="
            xl:sticky
            xl:top-6
            h-fit
          "
        >

          <ChangeForm />

        </div>

      </div>

    </div>

  );
}