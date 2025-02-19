"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function LoginForm() {
  const { register, handleSubmit } = useForm();
  const [responseMessage, setResponseMessage] = useState("");
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        const { token, user } = result; // Extraer datos de la respuesta
  
        if (token && user?.id) {
          localStorage.setItem("authToken", token); // Guardar token en localStorage
          localStorage.setItem("userId", user.id); // Guardar ID del usuario
          Swal.fire({
            icon: "success",
            title: "Inicio de sesión exitoso",
            text: "Redirigiendo...",
            timer: 2000,
            showConfirmButton: false
          });
  
          setTimeout(() => {
            window.location.href = "/"; // Redirigir al home
          }, 2000);
        } else {
          throw new Error("Respuesta inválida del servidor");
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: result.message || "Credenciales incorrectas",
          confirmButtonText: "Intentar de nuevo"
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error de conexión",
        text: "No se pudo conectar con el servidor. Intenta nuevamente.",
        confirmButtonText: "Cerrar"
      });
    }
  };
  

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full mt-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="ejemplo@correo.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Contraseña</label>
          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full mt-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="********"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}
