import RegisterForm from "@/app/components/RegisterForm";

export default function RegisterPage() {
    return (
      <main className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Registro de Usuario</h2>
          <RegisterForm />
        </div>
      </main>
    );
}
