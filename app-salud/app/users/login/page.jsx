import LoginForm from "@/app/components/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <LoginForm />

        {/* Enlace para registro */}
        <p className="text-center text-gray-600 mt-4">
          ¿No tienes cuenta? 
          <Link href="/users/register" className="text-blue-500 hover:underline ml-1">
            Regístrate
          </Link>
        </p>
      </div>
    </main>
  );
}
