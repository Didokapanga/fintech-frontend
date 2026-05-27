// src/components/layout/CaissierLayout.tsx

import {
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  LogOut,
  ArrowLeft,
} from "lucide-react";

import {
  useAuthStore,
} from "../../app/store";

/* ============================================================ */
/* COMPONENT */
/* ============================================================ */

export default function CaissierLayout() {

  const location =
    useLocation();

  const navigate =
    useNavigate();

  const logout =
    useAuthStore(
      (s) => s.logout
    );

  const user =
    useAuthStore(
      (s) => s.user
    );

  /**
   * ============================================================
   * 🔥 DASHBOARD
   * ============================================================
   */
  const isDashboard =
    location.pathname ===
    "/caissier";

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
        min-h-screen
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
          min-h-screen
          flex-col
        "
      >

        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        {!isReceiptPage && (

          <header
            className="
              sticky
              top-0
              z-50
              border-b
              border-slate-200
              bg-white/95
              backdrop-blur
            "
          >

            <div
              className="
                mx-auto
                flex
                max-w-7xl
                items-center
                justify-between
                px-6
                py-4
              "
            >

              {/* =========================================== */}
              {/* LEFT */}
              {/* =========================================== */}

              <div
                className="
                  flex
                  items-center
                  gap-4
                "
              >

                <div
                  className="
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-3xl
                    bg-gradient-to-br
                    from-indigo-600
                    to-blue-500
                    shadow-lg
                    shadow-indigo-200
                  "
                >

                  <img
                    src="/logo.png"
                    alt="Logo"
                    className="
                      h-10
                      w-10
                      object-contain
                    "
                  />

                </div>

                <div>

                  <p
                    className="
                      text-xs
                      font-semibold
                      uppercase
                      tracking-[0.18em]
                      text-indigo-600
                    "
                  >
                    Global Fintech
                  </p>

                  <h1
                    className="
                      mt-1
                      text-xl
                      font-bold
                      tracking-[-0.04em]
                      text-slate-900
                    "
                  >
                    Interface Caissier
                  </h1>

                </div>

              </div>

              {/* =========================================== */}
              {/* RIGHT */}
              {/* =========================================== */}

              <div
                className="
                  flex
                  items-center
                  gap-3
                "
              >

                {/* ======================================= */}
                {/* USER */}
                {/* ======================================= */}

                <div
                  className="
                    hidden
                    items-center
                    gap-3
                    rounded-2xl
                    border
                    border-slate-200
                    bg-slate-50
                    px-4
                    py-2
                    md:flex
                  "
                >

                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-2xl
                      bg-indigo-100
                      text-sm
                      font-bold
                      text-indigo-600
                    "
                  >

                    {user?.user_name
                      ?.slice(0, 2)
                      ?.toUpperCase() || "US"}

                  </div>

                  <div>

                    <p
                      className="
                        text-sm
                        font-semibold
                        text-slate-800
                      "
                    >
                      {user?.user_name}
                    </p>

                    <p
                      className="
                        text-xs
                        text-slate-500
                      "
                    >
                      {user?.role_name}
                    </p>

                  </div>

                </div>

                {/* ======================================= */}
                {/* BACK */}
                {/* ======================================= */}

                {!isDashboard && (

                  <button
                    onClick={() =>
                      navigate("/caissier")
                    }
                    className="
                      inline-flex
                      items-center
                      gap-2
                      rounded-2xl
                      border
                      border-slate-200
                      bg-white
                      px-4
                      py-2.5
                      text-sm
                      font-medium
                      text-slate-700
                      transition-all
                      hover:bg-slate-50
                    "
                  >

                    <ArrowLeft
                      size={16}
                    />

                    Dashboard

                  </button>

                )}

                {/* ======================================= */}
                {/* LOGOUT */}
                {/* ======================================= */}

                <button
                  onClick={logout}
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-2xl
                    bg-red-50
                    px-4
                    py-2.5
                    text-sm
                    font-medium
                    text-red-600
                    transition-all
                    hover:bg-red-100
                  "
                >

                  <LogOut
                    size={16}
                  />

                  Déconnexion

                </button>

              </div>

            </div>

          </header>

        )}

        {/* ================================================= */}
        {/* MAIN */}
        {/* ================================================= */}

        <main
          className={
            isReceiptPage
              ? `
                  flex-1
                  overflow-auto
                  bg-white
                `
              : `
                  flex-1
                  overflow-auto
                  p-6
                `
          }
        >

          <Outlet />

        </main>

      </div>

    </div>
  );
}