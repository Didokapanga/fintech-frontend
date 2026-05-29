// src/hooks/useIdleLogout.ts

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  useAuthStore,
} from "../app/store";

/* ======================================================== */
/* CONFIG */
/* ======================================================== */

const WARNING_TIME =
  3 * 60 * 1000; // 3 min

const LOGOUT_TIME =
  5 * 60 * 1000; // 5 min

// const WARNING_TIME =
//   15 * 60 * 1000; // 15 min

// const LOGOUT_TIME =
//   20 * 60 * 1000; // 20 min

// const WARNING_TIME =
//   25 * 60 * 1000; // 25 min

// const LOGOUT_TIME =
//   30 * 60 * 1000; // 30 min

/* ======================================================== */
/* HOOK */
/* ======================================================== */

export function useIdleLogout() {

  const logout =
    useAuthStore(
      (s) => s.logout
    );

  const [
    showWarning,
    setShowWarning,
  ] = useState(false);

  const warningTimeout =
    useRef<number | null>(
      null
    );

  const logoutTimeout =
    useRef<number | null>(
      null
    );

  /* ====================================================== */
  /* RESET TIMERS */
  /* ====================================================== */

  const resetTimers =
    useCallback(() => {

      setShowWarning(
        false
      );

      if (
        warningTimeout.current
      ) {

        window.clearTimeout(
          warningTimeout.current
        );
      }

      if (
        logoutTimeout.current
      ) {

        window.clearTimeout(
          logoutTimeout.current
        );
      }

      warningTimeout.current =
        window.setTimeout(
          () => {

            setShowWarning(
              true
            );

          },
          WARNING_TIME
        );

      logoutTimeout.current =
        window.setTimeout(
          () => {

            logout();

            window.location.href =
              "/login";

          },
          LOGOUT_TIME
        );

    }, [logout]);

  /* ====================================================== */
  /* INIT */
  /* ====================================================== */

  useEffect(() => {

    const events = [
      "mousemove",
      "mousedown",
      "keydown",
      "scroll",
      "touchstart",
      "click",
    ];

    const handleActivity =
      () => {

        resetTimers();
      };

    events.forEach(
      (event) =>
        window.addEventListener(
          event,
          handleActivity
        )
    );

    const init =
      window.setTimeout(
        () => {

          resetTimers();

        },
        0
      );

    return () => {

      window.clearTimeout(
        init
      );

      events.forEach(
        (event) =>
          window.removeEventListener(
            event,
            handleActivity
          )
      );

      if (
        warningTimeout.current
      ) {

        window.clearTimeout(
          warningTimeout.current
        );
      }

      if (
        logoutTimeout.current
      ) {

        window.clearTimeout(
          logoutTimeout.current
        );
      }
    };

  }, [resetTimers]);

  /* ====================================================== */
  /* RETURN */
  /* ====================================================== */

  return {

    showWarning,

    stayConnected:
      resetTimers,
  };
}