import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* LEFT SIDE */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-indigo-600 to-blue-500 text-white items-center justify-center p-10">
        <div>
          <h1 className="text-4xl font-bold mb-4">Global Fintech</h1>
          <p className="text-lg opacity-80">
            Plateforme sécurisée de messagerie financière
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-2">Connexion</h2>
          <p className="text-sm text-gray-500 mb-6">
            Entrez vos identifiants pour continuer
          </p>

          <LoginForm />
        </div>
      </div>
    </div>
  );
}