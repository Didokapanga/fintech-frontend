// src/components/layout/Layout.tsx

import {
  Outlet,
  useLocation,
} from "react-router-dom";

import Sidebar from "./Sidebar";
import Header from "./Header";

/* ============================================================ */
/* COMPONENT */
/* ============================================================ */

export default function Layout() {

  const location =
    useLocation();

  /**
   * ============================================================
   * 🔥 RECEIPT PAGE
   * ============================================================
   */
  const isReceiptPage =
    location.pathname.includes(
      "/receipt/"
    );

  return (

    <div
      className={`
        flex
        h-screen
        relative
        ${
          isReceiptPage
            ? "bg-white"
            : `
              bg-[url('/src/assets/bg-pattern.svg')]
              bg-cover
              bg-center
            `
        }
      `}
    >

      {/* ===================================================== */}
      {/* OVERLAY */}
      {/* ===================================================== */}

      {!isReceiptPage && (

        <div
          className="
            absolute
            inset-0
            bg-white/40
          "
        />

      )}

      <div
        className="
          relative
          flex
          w-full
        "
      >

        {/* ===================================================== */}
        {/* SIDEBAR */}
        {/* ===================================================== */}

        {!isReceiptPage && (
          <Sidebar />
        )}

        {/* ===================================================== */}
        {/* CONTENT */}
        {/* ===================================================== */}

        <div
          className="
            flex-1
            flex
            flex-col
          "
        >

          {/* ================================================= */}
          {/* HEADER */}
          {/* ================================================= */}

          {!isReceiptPage && (
            <Header />
          )}

          {/* ================================================= */}
          {/* MAIN */}
          {/* ================================================= */}

          <main
            className={
              isReceiptPage
                ? `
                    h-full
                    overflow-auto
                    bg-white
                  `
                : `
                    p-6
                    overflow-auto
                    space-y-4
                  `
            }
          >

            {/* ============================================= */}
            {/* ROUTES */}
            {/* ============================================= */}

            <Outlet />

          </main>

        </div>

      </div>

    </div>
  );
}