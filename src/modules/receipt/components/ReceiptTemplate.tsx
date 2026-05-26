// ============================================================
// 📄 src/modules/receipt/components/ReceiptTemplate.tsx
// ============================================================

import QRCode from "react-qr-code";

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

  const handlePrint =
    () => {

      window.print();
    };

  /**
   * ============================================================
   * 🔥 QR DATA
   * ============================================================
   */
  const qrData = JSON.stringify({
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
  });

  return (

    <div
      className="
        w-full
        max-w-[380px]
        mx-auto
        bg-white
        border
        border-gray-200
        rounded-2xl
        p-5
        text-sm
        shadow-sm
        print:shadow-none
        print:border-none
      "
    >

      {/* ===================================================== */}
      {/* HEADER */}
      {/* ===================================================== */}

      <div className="text-center">

        <div
          className="
            flex
            justify-center
            mb-3
          "
        >

          <img
            src="/logo.png"
            alt="Logo"
            className="
              w-16
              h-16
              object-contain
            "
          />

        </div>

        <h1 className="text-xl font-bold tracking-wide">
          GLOBAL FINTECH
        </h1>

        <p className="text-xs text-gray-500">
          Financial System
        </p>

        <div
          className="
            inline-flex
            mt-3
            rounded-full
            bg-green-100
            px-3
            py-1
            text-xs
            font-semibold
            text-green-700
          "
        >
          {receipt.statut}
        </div>

      </div>

      {/* ===================================================== */}
      {/* INFOS */}
      {/* ===================================================== */}

      <div className="mt-6 space-y-2">

        <Row
          label="Référence"
          value={
            receipt.reference
          }
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
          value={
            receipt.agence
          }
        />

        <Row
          label="Ville"
          value={
            receipt.ville
          }
        />

        <Row
          label="Caisse"
          value={
            receipt.caisse
          }
        />

        <Row
          label="Agent"
          value={
            receipt.agent
          }
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
          gap-3
          py-3
        "
      >

        <div
          className="
            rounded-2xl
            border
            bg-white
            p-3
          "
        >

          <QRCode
            value={qrData}
            size={130}
          />

        </div>

        <p
          className="
            text-center
            text-[11px]
            text-gray-500
            leading-relaxed
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
        title="Visa & Signature"
      />

      <div
        className="
          mt-4
          grid
          grid-cols-2
          gap-6
        "
      >

        {/* CLIENT */}

        <div className="space-y-3">

          <p
            className="
              text-xs
              font-semibold
              text-gray-600
            "
          >
            Signature client
          </p>

          <div
            className="
              h-20
              rounded-xl
              border
              border-dashed
              border-gray-300
            "
          />

        </div>

        {/* AGENT */}

        <div className="space-y-3">

          <p
            className="
              text-xs
              font-semibold
              text-gray-600
            "
          >
            Signature agent
          </p>

          <div
            className="
              h-20
              rounded-xl
              border
              border-dashed
              border-gray-300
            "
          />

        </div>

      </div>

      {/* ===================================================== */}
      {/* FOOTER */}
      {/* ===================================================== */}

      <div
        className="
          mt-8
          text-center
          text-xs
          text-gray-500
          leading-relaxed
        "
      >
        Merci pour votre confiance
        <br />
        GLOBAL FINTECH
      </div>

      {/* ===================================================== */}
      {/* ACTION */}
      {/* ===================================================== */}

      <button
        onClick={
          handlePrint
        }
        className="
          mt-6
          w-full
          rounded-2xl
          bg-indigo-600
          py-3
          text-sm
          font-semibold
          text-white
          transition-all
          hover:bg-indigo-700
          print:hidden
        "
      >
        Imprimer
      </button>

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