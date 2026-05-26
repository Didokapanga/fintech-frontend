// ============================================================
// 📄 src/modules/receipt/pages/RetraitReceiptPage.tsx
// ============================================================

import { useParams } from "react-router-dom";

import RetraitReceiptTemplate
from "../components/RetraitReceiptTemplate";

import {
  useRetraitReceipt,
} from "../hooks/useRetraitReceipt";

export default function RetraitReceiptPage() {

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
  } =
    useRetraitReceipt(
      String(id)
    );

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
          print:bg-white
        "
      >

        <div
          className="
            text-[12px]
            font-mono
            text-slate-500
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
          print:bg-white
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
            les informations du reçu.
          </p>

        </div>

      </div>
    );
  }

  /**
   * ============================================================
   * 🔥 THERMAL RECEIPT
   * ============================================================
   */
  return (

    <>
      {/* ====================================================== */}
      {/* PRINT STYLE */}
      {/* ====================================================== */}

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
              padding: 8px;
              background: white;
            }

            .print-hidden {
              display: none !important;
            }
          }
        `}
      </style>

      {/* ====================================================== */}
      {/* PAGE */}
      {/* ====================================================== */}

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
            text-black
            font-mono
            text-[12px]
            leading-tight
            border
            border-slate-200
            shadow-sm
            print:border-none
            print:shadow-none
          "
        >

          <RetraitReceiptTemplate
            receipt={data.data}
          />

        </div>

      </div>
    </>
  );
}

// // ============================================================
// // 📄 src/modules/receipt/pages/RetraitReceiptPage.tsx
// // ============================================================

// import { useParams } from "react-router-dom";

// import RetraitReceiptTemplate
// from "../components/RetraitReceiptTemplate";

// import {
//   useRetraitReceipt,
// } from "../hooks/useRetraitReceipt";

// export default function RetraitReceiptPage() {

//   /**
//    * ============================================================
//    * 🔥 PARAMS
//    * ============================================================
//    */
//   const { id } =
//     useParams();

//   /**
//    * ============================================================
//    * 🔥 QUERY
//    * ============================================================
//    */
//   const {
//     data,
//     isLoading,
//     isError,
//   } =
//     useRetraitReceipt(
//       String(id)
//     );

//   /**
//    * ============================================================
//    * 🔥 LOADING
//    * ============================================================
//    */
//   if (isLoading) {

//     return (

//       <div
//         className="
//           min-h-screen
//           flex
//           items-center
//           justify-center
//           bg-slate-50
//         "
//       >

//         <div
//           className="
//             rounded-2xl
//             bg-white
//             px-6
//             py-4
//             shadow-sm
//             text-sm
//             text-slate-600
//           "
//         >
//           Chargement du reçu...
//         </div>

//       </div>
//     );
//   }

//   /**
//    * ============================================================
//    * 🔥 ERROR
//    * ============================================================
//    */
//   if (
//     isError ||
//     !data?.data
//   ) {

//     return (

//       <div
//         className="
//           min-h-screen
//           flex
//           items-center
//           justify-center
//           bg-slate-50
//           p-6
//         "
//       >

//         <div
//           className="
//             w-full
//             max-w-md
//             rounded-3xl
//             border
//             border-red-100
//             bg-white
//             p-8
//             text-center
//             shadow-sm
//           "
//         >

//           <div
//             className="
//               mx-auto
//               flex
//               h-16
//               w-16
//               items-center
//               justify-center
//               rounded-full
//               bg-red-100
//               text-2xl
//             "
//           >
//             ❌
//           </div>

//           <h1
//             className="
//               mt-5
//               text-xl
//               font-bold
//               text-slate-800
//             "
//           >
//             Reçu introuvable
//           </h1>

//           <p
//             className="
//               mt-2
//               text-sm
//               text-slate-500
//               leading-relaxed
//             "
//           >
//             Impossible de récupérer
//             les informations du reçu
//             de retrait.
//           </p>

//         </div>

//       </div>
//     );
//   }

//   /**
//    * ============================================================
//    * 🔥 TEMPLATE
//    * ============================================================
//    */
//   return (

//     <div
//       className="
//         min-h-screen
//         bg-slate-100
//         py-10
//         px-4
//       "
//     >

//       <RetraitReceiptTemplate
//         receipt={data.data}
//       />

//     </div>
//   );
// }