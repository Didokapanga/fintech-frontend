// ============================================================
// 📄 src/modules/receipt/components/ReceiptTemplate.tsx
// ============================================================

import { useNavigate } from "react-router-dom";
import type {
  ReceiptResponse,
} from "../services/receipt.service";

type Props = {
  receipt:
    ReceiptResponse["data"];
};

export default function ReceiptTemplate({
  receipt,
}: Props) {

  const navigate = useNavigate();

  /**
   * ============================================================
   * 🔥 QR DATA
   * ============================================================
   */
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

        agence:
          receipt.agence,
      })
    );

  /**
   * ============================================================
   * 🔥 QR URL
   * ============================================================
   */
  const qrCodeUrl =
    `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${qrData}`;

  /**
   * ============================================================
   * 🔥 PRINT
   * ============================================================
   */
  const handlePrint =
    () => {

      window.print();
    };

  return (

    <div
      className="
        w-[80mm]
        bg-white
        px-3
        py-4
        text-black
        font-mono
        text-[12px]
        leading-tight
      "
    >

      {/* ===================================================== */}
      {/* HEADER */}
      {/* ===================================================== */}

      <div className="text-center">

        <img
          src="/logo.png"
          alt="Logo"
          className="
            mx-auto
            h-12
            w-12
            object-contain
          "
        />

        <h1
          className="
            mt-2
            text-[20px]
            font-bold
            uppercase
            tracking-wide
          "
        >
          GLOBAL FINTECH
        </h1>

        <p
          className="
            text-[10px]
            text-slate-500
          "
        >
          Financial System
        </p>

        <div
          className={`
            mt-3
            inline-flex
            rounded-full
            px-3
            py-1
            text-[10px]
            font-bold
            tracking-wide
            ${
              receipt.statut ===
              "EXECUTE"
                ? "bg-emerald-100 text-emerald-700"
                : "bg-slate-100 text-slate-700"
            }
          `}
        >
          {receipt.statut}
        </div>

      </div>

      {/* ===================================================== */}
      {/* INFOS */}
      {/* ===================================================== */}

      <div className="mt-5 space-y-2">

        <Row
          label="Référence"
          value={receipt.reference}
        />

        <Row
          label="Date"
          value={new Date(
            receipt.date_operation
          ).toLocaleString(
            "fr-FR"
          )}
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

      {/* ===================================================== */}
      {/* EXPEDITEUR */}
      {/* ===================================================== */}

      <SectionTitle
        title="Expéditeur"
      />

      <div className="space-y-2">

        <Row
          label="Nom"
          value={
            receipt
              .expediteur
              .nom_complet
          }
        />

        <Row
          label="Téléphone"
          value={
            receipt
              .expediteur
              .telephone
          }
        />

        <Row
          label="Pièce"
          value={
            receipt
              .expediteur
              .piece
          }
        />

      </div>

      {/* ===================================================== */}
      {/* DESTINATAIRE */}
      {/* ===================================================== */}

      <SectionTitle
        title="Destinataire"
      />

      <div className="space-y-2">

        <Row
          label="Nom"
          value={
            receipt
              .destinataire
              .nom_complet
          }
        />

        <Row
          label="Téléphone"
          value={
            receipt
              .destinataire
              .telephone
          }
        />

        <Row
          label="Pièce"
          value={
            receipt
              .destinataire
              .piece
          }
        />

      </div>

      {/* ===================================================== */}
      {/* MONTANTS */}
      {/* ===================================================== */}

      <SectionTitle
        title="Montants"
      />

      <div className="space-y-2">

        <Row
          label="Montant"
          value={`${Number(
            receipt.montant
          ).toLocaleString()} ${
            receipt.devise
          }`}
        />

        <Row
          label="Frais"
          value={`${Number(
            receipt.frais
          ).toLocaleString()} ${
            receipt.devise
          }`}
        />

        <Row
          label="Total"
          value={`${Number(
            receipt.total
          ).toLocaleString()} ${
            receipt.devise
          }`}
          strong
        />

      </div>

      {/* ===================================================== */}
      {/* QR CODE */}
      {/* ===================================================== */}

      <SectionTitle
        title="Vérification"
      />

      <div
        className="
          flex
          flex-col
          items-center
          justify-center
          py-4
        "
      >

        <img
          src={qrCodeUrl}
          alt="QR Code"
          className="
            h-[130px]
            w-[130px]
          "
        />

        <p
          className="
            mt-2
            text-center
            text-[10px]
            leading-relaxed
            text-slate-500
          "
        >
          Scanner pour vérifier
          l’authenticité du reçu
        </p>

      </div>

      {/* ===================================================== */}
      {/* SIGNATURE */}
      {/* ===================================================== */}

      <SectionTitle
        title="Signature"
      />

      <div
        className="
          mt-3
          h-16
          rounded-lg
          border
          border-dashed
          border-slate-300
        "
      />

      {/* ===================================================== */}
      {/* FOOTER */}
      {/* ===================================================== */}

      <div
        className="
          mt-5
          border-t
          border-dashed
          pt-3
          text-center
        "
      >

        <p
          className="
            text-[11px]
            text-slate-500
          "
        >
          Merci pour votre confiance
        </p>

        <p
          className="
            mt-1
            text-[10px]
            text-slate-400
          "
        >
          GLOBAL FINTECH
        </p>

      </div>

      {/* ===================================================== */}
      {/* ACTION */}
      {/* ===================================================== */}

      <div
        className="
          mt-5
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
            rounded-xl
            border
            border-slate-300
            bg-white
            py-3
            text-[12px]
            font-semibold
            text-slate-700
            transition-all
            hover:bg-slate-100
          "
        >
          ← Retour
        </button>

        <button
          onClick={handlePrint}
          className="
            flex-1
            rounded-xl
            bg-red-600
            py-3
            text-[12px]
            font-semibold
            text-white
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
        items-start
        justify-between
        gap-3
      "
    >

      <span
        className="
          text-[11px]
          text-slate-500
        "
      >
        {label}
      </span>

      <span
        className={`
          text-right
          text-[11px]
          ${
            strong
              ? "font-bold text-emerald-600"
              : "font-semibold text-slate-800"
          }
        `}
      >
        {value}
      </span>

    </div>
  );
}

/* ============================================================ */
/* SECTION TITLE */
/* ============================================================ */

function SectionTitle({
  title,
}: {
  title: string;
}) {

  return (

    <div
      className="
        mt-5
        mb-3
        border-b
        border-dashed
        border-slate-300
        pb-2
        text-[11px]
        font-bold
        uppercase
        tracking-[0.15em]
        text-slate-600
      "
    >
      {title}
    </div>
  );
}