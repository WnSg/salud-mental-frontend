import LoginForm from "@/app/components/LoginForm";
import Link from "next/link";
 
export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="container relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32 text-gray-900">
        <LoginForm/> 
        <h4>¿No tienes cuenta?</h4>
        <li className="nav-item">
               <Link href="/users/register">Registrate</Link>
          </li>
      </div>
    </main>
  );
}