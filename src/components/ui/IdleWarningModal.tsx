// src/components/ui/IdleWarningModal.tsx

type Props = {
  open: boolean;
  onStayConnected: () => void;
};

export default function IdleWarningModal({
  open,
  onStayConnected,
}: Props) {

  if (!open)
    return null;

  return (

    <div
      className="
        fixed inset-0 z-[9999]
        flex items-center justify-center
        bg-black/40
      "
    >

      <div
        className="
          w-full max-w-md
          rounded-3xl
          bg-white
          p-6
          shadow-xl
        "
      >

        <h2
          className="
            text-xl
            font-bold
            text-slate-900
          "
        >
          Inactivité détectée
        </h2>

        <p
          className="
            mt-3
            text-sm
            text-slate-600
            leading-relaxed
          "
        >
          Vous êtes inactif depuis
          plusieurs minutes.

          <br />
          <br />

          Vous serez automatiquement
          déconnecté dans 5 minutes si 
          aucune activité n'est détectée
          pour des raisons de sécurité.

          <br />
          <br />

          Cliquez sur Continuer ma session pour rester connecté.

        </p>

        <button
          onClick={
            onStayConnected
          }
          className="
            mt-6
            w-full
            rounded-2xl
            bg-red-600
            py-3
            font-semibold
            text-white
            hover:bg-red-700
          "
        >
          Continuer ma session
        </button>

      </div>

    </div>
  );
}