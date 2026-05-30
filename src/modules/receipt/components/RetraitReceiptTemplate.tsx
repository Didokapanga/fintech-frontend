// ============================================================
// 📄 src/modules/receipt/components/RetraitReceiptTemplate.tsx
// ============================================================

import { useNavigate } from "react-router-dom";
import type {
  RetraitReceiptResponse,
} from "../services/retraitReceipt.service";

type Props = {
  receipt:
    RetraitReceiptResponse["data"];
};

export default function RetraitReceiptTemplate({
  receipt,
}: Props) {

  const navigate = useNavigate();

  const qrData =
    encodeURIComponent(
      JSON.stringify({
        reference:
          receipt.reference,

        montant:
          receipt.montant,

        devise:
          receipt.devise,

        statut:
          receipt.statut,

        date:
          receipt.date_operation,
      })
    );

  const qrUrl =
    `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${qrData}`;

  return (

    <div
      className="
        w-full
        max-w-[380px]
        mx-auto
        bg-white
        rounded-2xl
        border
        p-5
        shadow-sm
      "
    >

      {/* HEADER */}

      <div className="text-center">

        <img
          src="/logo.png"
          alt="Logo"
          className="
            w-16
            h-16
            object-contain
            mx-auto
            mb-3
          "
        />

        <h1 className="text-xl font-bold">
          GLOBAL FINTECH
        </h1>

        <p className="text-xs text-gray-500">
          Financial System
        </p>

      </div>

      {/* STATUS */}

      <div className="flex justify-center mt-4">

        <span
          className="
            px-3
            py-1
            rounded-full
            bg-green-100
            text-green-700
            text-xs
            font-semibold
          "
        >
          {receipt.statut}
        </span>

      </div>

      {/* INFOS */}

      <div className="mt-6 space-y-2">

        <Row
          label="Référence"
          value={receipt.reference}
        />

        <Row
          label="Date"
          value={new Date(
            receipt.date_operation
          ).toLocaleString("fr-FR")}
        />

        <Row
          label="Agence"
          value={receipt.agence}
        />

        <Row
          label="Ville"
          value={receipt.ville}
        />

        <Row
          label="Caisse"
          value={receipt.caisse}
        />

        <Row
          label="Agent"
          value={receipt.agent}
        />

      </div>

      {/* BENEFICIAIRE */}

      <SectionTitle
        title="Bénéficiaire"
      />

      <div className="space-y-2">

        <Row
          label="Nom"
          value={
            receipt
              .beneficiaire
              .nom_complet
          }
        />

        <Row
          label="Téléphone"
          value={
            receipt
              .beneficiaire
              .telephone
          }
        />

        <Row
          label="Pièce"
          value={
            receipt
              .beneficiaire
              .piece
          }
        />

        <Row
          label="N° Pièce"
          value={
            receipt
              .beneficiaire
              .numero_piece
          }
        />

      </div>

      {/* MONTANT */}

      <SectionTitle
        title="Montant"
      />

      <div className="space-y-2">

        <Row
          label="Montant retrait"
          value={`${Number(
            receipt.montant
          ).toLocaleString()} ${
            receipt.devise
          }`}
          strong
        />

      </div>

      {/* QR */}

      <SectionTitle
        title="Vérification"
      />

      <div
        className="
          flex
          flex-col
          items-center
          gap-3
          py-4
        "
      >

        <img
          src={qrUrl}
          alt="QR Code"
          className="
            w-[160px]
            h-[160px]
            border
            rounded-xl
            p-2
            bg-white
          "
        />

        <p
          className="
            text-center
            text-[11px]
            text-gray-500
          "
        >
          Scanner pour vérifier
          l’authenticité du reçu
        </p>

      </div>

      {/* SIGNATURE */}

      <SectionTitle
        title="Signature"
      />

      <div
        className="
          mt-5
          h-20
          rounded-xl
          border
          border-dashed
        "
      />

      {/* FOOTER */}

      <div
        className="
          mt-8
          text-center
          text-xs
          text-gray-500
        "
      >
        Merci pour votre confiance
      </div>

      {/* ACTIONS */}

      <div
        className="
          mt-6
          flex
          gap-3
          print:hidden
        "
      >

        <button
          onClick={() =>
            navigate(-1)
          }
          className="
            flex-1
            rounded-2xl
            border
            border-slate-300
            bg-white
            py-3
            font-semibold
            text-slate-700
            transition-all
            hover:bg-slate-100
          "
        >
          ← Retour
        </button>

        <button
          onClick={() =>
            window.print()
          }
          className="
            flex-1
            rounded-2xl
            bg-red-600
            py-3
            text-white
            font-semibold
            transition-all
            hover:bg-red-700
          "
        >
          Imprimer
        </button>

      </div>

    </div>
  );
}

/* ============================================================ */
/* ROW */
/* ============================================================ */

function Row({
  label,
  value,
  strong = false,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {

  return (

    <div
      className="
        flex
        justify-between
        gap-3
      "
    >

      <span className="text-gray-500">
        {label}
      </span>

      <span
        className={
          strong
            ? "font-bold text-green-600"
            : "font-medium text-right"
        }
      >
        {value}
      </span>

    </div>
  );
}

/* ============================================================ */
/* SECTION */
/* ============================================================ */

function SectionTitle({
  title,
}: {
  title: string;
}) {

  return (

    <div
      className="
        mt-6
        mb-3
        border-b
        border-dashed
        pb-2
        text-xs
        font-bold
        uppercase
        tracking-wide
        text-gray-500
      "
    >
      {title}
    </div>
  );
}  