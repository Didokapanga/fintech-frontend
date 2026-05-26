// ============================================================
// 📄 src/modules/receipt/pages/TransfertReceiptPage.tsx
// ============================================================

import { useParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import ReceiptTemplate
from "../components/ReceiptTemplate";

import {
  getReceipt,
} from "../services/receipt.service";

export default function TransfertReceiptPage() {

  /**
   * ============================================================
   * 🔥 PARAMS
   * ============================================================
   */
  const { id } =
    useParams();

  /**
   * ============================================================
   * 🔥 QUERY
   * ============================================================
   */
  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [
      "transfert-receipt",
      id,
    ],

    queryFn: () =>
      getReceipt(
        String(id)
      ),

    enabled: !!id,
  });

  /**
   * ============================================================
   * 🔥 LOADING
   * ============================================================
   */
  if (isLoading) {

    return (

      <div
        className="
          min-h-screen
          flex
          items-center
          justify-center
          bg-white
        "
      >

        <div
          className="
            text-sm
            text-slate-500
            font-mono
          "
        >
          Chargement du reçu...
        </div>

      </div>
    );
  }

  /**
   * ============================================================
   * 🔥 ERROR
   * ============================================================
   */
  if (
    isError ||
    !data?.data
  ) {

    return (

      <div
        className="
          min-h-screen
          flex
          items-center
          justify-center
          bg-white
          px-4
        "
      >

        <div
          className="
            w-[80mm]
            border
            border-dashed
            border-red-300
            p-5
            text-center
            font-mono
          "
        >

          <div className="text-3xl">
            ❌
          </div>

          <h1
            className="
              mt-3
              text-sm
              font-bold
              uppercase
              tracking-wide
              text-slate-800
            "
          >
            Reçu introuvable
          </h1>

          <p
            className="
              mt-2
              text-[11px]
              leading-relaxed
              text-slate-500
            "
          >
            Impossible de récupérer
            les informations du reçu
            de transfert.
          </p>

        </div>

      </div>
    );
  }

  /**
   * ============================================================
   * 🔥 PAGE
   * ============================================================
   */
  return (

    <>
      <style>
        {`
          @page {
            size: 80mm auto;
            margin: 0;
          }

          html,
          body {
            margin: 0;
            padding: 0;
            background: white;
          }

          @media print {

            body * {
              visibility: hidden;
            }

            #thermal-receipt,
            #thermal-receipt * {
              visibility: visible;
            }

            #thermal-receipt {
              position: absolute;
              left: 0;
              top: 0;
              width: 80mm;
              margin: 0;
              padding: 0;
              background: white;
            }

            .print-hidden {
              display: none !important;
            }
          }
        `}
      </style>

      <div
        className="
          min-h-screen
          bg-slate-100
          flex
          items-start
          justify-center
          py-6
          px-2
          print:bg-white
          print:p-0
        "
      >

        <div
          id="thermal-receipt"
          className="
            w-[80mm]
            bg-white
          "
        >

          <ReceiptTemplate
            receipt={data.data}
          />

        </div>

      </div>
    </>
  );
}