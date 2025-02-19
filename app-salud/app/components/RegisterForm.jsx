"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const { register, handleSubmit, reset } = useForm();
  const [responseMessage, setResponseMessage] = useState("");
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        "https://capstone-salud-mental-backend.onrender.com/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setResponseMessage("✅ ¡Registro exitoso!");
        reset();

        setTimeout(() => {
          router.push("/users/login");
        }, 1500);
      } else {
        setResponseMessage("❌ " + (result.message || "Ocurrió un error."));
      }
    } catch (error) {
      setResponseMessage("❌ Error en el registro. Intenta de nuevo.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Nombre</label>
        <input 
          {...register("first_name", { required: true })} 
          className="w-full px-3 py-2 border rounded-lg text-gray-900 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Ingrese su nombre"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Apellido</label>
        <input 
          {...register("last_name", { required: true })} 
          className="w-full px-3 py-2 border rounded-lg text-gray-900 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Ingrese su apellido"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
        <input 
          type="email" 
          {...register("email", { required: true })} 
          className="w-full px-3 py-2 border rounded-lg text-gray-900 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Ingrese su correo"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Contraseña</label>
        <input 
          type="password" 
          {...register("password", { required: true })} 
          className="w-full px-3 py-2 border rounded-lg text-gray-900 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Ingrese su contraseña"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Edad</label>
        <input 
          type="number" 
          {...register("age", { required: true, min: 1 })} 
          className="w-full px-3 py-2 border rounded-lg text-gray-900 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Ingrese su edad"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Género</label>
        <select 
          {...register("gender", { required: true })}
          className="w-full px-3 py-2 border rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="Mujer">Mujer</option>
          <option value="Hombre">Hombre</option>
          <option value="Otro">Otro</option>
          <option value="Prefiero no decirlo">Prefiero no decirlo</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Nacionalidad</label>
        <input 
          {...register("nationality", { required: true })} 
          className="w-full px-3 py-2 border rounded-lg text-gray-900 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Ingrese su nacionalidad"
        />
      </div>

      <button 
        type="submit" 
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Registrarse
      </button>

      {responseMessage && (
        <p className={`text-center mt-2 ${responseMessage.startsWith("✅") ? "text-green-600" : "text-red-600"}`}>
          {responseMessage}
        </p>
      )}
    </form>
  );
}
